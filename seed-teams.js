// seed-teams.js
// teamsマスター(A-LOGI版: 昼班・夜班の2班)投入スクリプト。
// 冪等: ドキュメントIDが固定(team_a・team_b)のため、何度実行しても同じ内容に上書きされるだけで壊れない。
// 実行には管理者(admin)としての認証が必須(firestore.rules: teams書き込みはisAdmin()のみ許可)。
// seed.html から <script src="seed-teams.js"></script> で読み込んで使う。
//
// A-LOGI版の班は班長名を持たない(leaderName は常に null)。呼称を変えるときは label を書き換えて
// 再実行するか、アプリの「班編成管理」から変更する。表示名(displayName)は呼称そのままにする
// (「A班（昼班）」のような表示にしない)。index.html の saveTeamEdit() と同じ形であること。
// teamId(team_a・team_b)自体は恒久キーなので変更しないこと。firestore.rules の許可リストとも一致させる。

const TEAMS_MASTER = [
  { id: 'team_a', code: 'A', leaderName: null, label: '昼班' },
  { id: 'team_b', code: 'B', leaderName: null, label: '夜班' },
];

// db: firebase.firestore() のインスタンス。log: ログ出力用コールバック(引数1つ、文字列)
async function seedTeams(db, log) {
  log(`=== teamsマスター投入 開始(${TEAMS_MASTER.length}件・冪等) ===`);
  let order = 0;
  for (const t of TEAMS_MASTER) {
    order += 1;
    const displayName = t.label;
    await db.collection('teams').doc(t.id).set({
      code: t.code,
      leaderName: t.leaderName,
      label: t.label,
      displayName,
      order,
      active: true,
    });
    log(`✓ teams/${t.id} → ${displayName}`);
  }
  log(`=== 完了(${TEAMS_MASTER.length}件)。再実行しても同じ内容に上書きされるだけです ===`);
}
