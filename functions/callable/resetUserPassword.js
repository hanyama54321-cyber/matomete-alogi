const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { getAuth } = require('firebase-admin/auth');
const { REGION, MAX_INSTANCES_CALLABLE, MAINTENANCE_CODES, AUTH_EMAIL_DOMAIN, AUTH_PW_SUFFIX } = require('../lib/constants');
const { db, FieldValue } = require('../lib/admin');
const { codeFromAuth } = require('../lib/auth');

// 保守用の管理者(AAAAA/BBBBB/CCCCC)だけが、ほかの利用者のパスワードを初期値(乗務員コードと同じ)に戻せる。
// 権限は role ではなく「呼び出した人のコード」で判定する(admin にした乗務員には許可しない)。
// Firestore rules は callable 関数には効かず、Admin SDK は rules を迂回するため、判定は必ずここで行う。
// 誰が・いつ・誰を戻したかを passwordResets に記録する(読めるのは保守用の管理者だけ。firestore.rules)。
// ※ 外部メンテナンス用アカウントの扱いを見直す際は、この権限も見直すこと(HANDOFF.md)
exports.resetUserPassword = onCall(
  { region: REGION, maxInstances: MAX_INSTANCES_CALLABLE },
  async (request) => {
    const byCode = codeFromAuth(request.auth);
    if (!MAINTENANCE_CODES.includes(byCode)) {
      throw new HttpsError('permission-denied', '保守用の管理者のみ実行できます');
    }

    const targetCode = String((request.data || {}).code || '').trim().toUpperCase();
    if (!/^[A-Z0-9]{5}$/.test(targetCode)) {
      throw new HttpsError('invalid-argument', '乗務員コードが正しくありません');
    }
    if (targetCode === byCode) {
      throw new HttpsError('failed-precondition', 'ご自身のパスワードはプロフィールから変更してください');
    }

    const userRef = db.collection('users').doc(targetCode);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      throw new HttpsError('not-found', '利用者が見つかりません');
    }

    let authUser;
    try {
      authUser = await getAuth().getUserByEmail(targetCode.toLowerCase() + AUTH_EMAIL_DOMAIN);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        throw new HttpsError('not-found', 'ログイン用のアカウントがありません');
      }
      throw e;
    }

    // 初期パスワード = 乗務員コード(アプリは入力値に AUTH_PW_SUFFIX を付けて Firebase Auth に渡す)
    await getAuth().updateUser(authUser.uid, { password: targetCode + AUTH_PW_SUFFIX });
    await userRef.update({ passwordChanged: false });
    await db.collection('passwordResets').add({
      targetCode,
      byCode,
      at: FieldValue.serverTimestamp(),
    });

    console.log('パスワードを初期値に戻しました(件数: 1)');
    return { ok: true };
  }
);
