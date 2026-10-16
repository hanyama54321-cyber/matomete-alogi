'use strict';
const test = require('node:test');
const { assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const { createTestEnv, authedContext } = require('./helpers');

// パスワードを初期値に戻した記録(passwordResets)。書くのは Cloud Functions(Admin SDK)だけで、
// 読めるのは保守用の管理者(AAAAA/BBBBB/CCCCC)だけ。role が admin の乗務員でも読めない
let testEnv;

test.before(async () => {
  testEnv = await createTestEnv('password-resets-test');
});

test.after(async () => {
  await testEnv.cleanup();
});

async function seed() {
  await testEnv.clearFirestore();
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await db.collection('users').doc('AAAAA').set({ name: '管理者A', team: null, role: 'admin', passwordChanged: true });
    await db.collection('users').doc('BBBBB').set({ name: '管理者B', team: null, role: 'admin', passwordChanged: true });
    await db.collection('users').doc('ADM1').set({ name: '班長', team: 'team_a', role: 'admin', passwordChanged: true });
    await db.collection('users').doc('D12').set({ name: '佐藤', team: 'team_a', role: 'driver', passwordChanged: true });
    await db.collection('passwordResets').doc('r1').set({ targetCode: 'D12', byCode: 'AAAAA', at: new Date() });
  });
}

test('保守用の管理者はpasswordResetsを一覧・個別取得できる', async () => {
  await seed();
  const db = authedContext(testEnv, 'AAAAA').firestore();
  await assertSucceeds(db.collection('passwordResets').get());
  await assertSucceeds(db.collection('passwordResets').doc('r1').get());
  const db2 = authedContext(testEnv, 'BBBBB').firestore();
  await assertSucceeds(db2.collection('passwordResets').get());
});

test('roleがadminの乗務員(保守用以外)はpasswordResetsを読めない', async () => {
  await seed();
  const db = authedContext(testEnv, 'ADM1').firestore();
  await assertFails(db.collection('passwordResets').get());
  await assertFails(db.collection('passwordResets').doc('r1').get());
});

test('一般の乗務員はpasswordResetsを読めない', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertFails(db.collection('passwordResets').get());
  await assertFails(db.collection('passwordResets').doc('r1').get());
});

test('未認証ユーザーはpasswordResetsを読めない', async () => {
  await seed();
  const db = testEnv.unauthenticatedContext().firestore();
  await assertFails(db.collection('passwordResets').get());
});

test('保守用の管理者もpasswordResetsを書き込み・変更・削除できない(Cloud Functionsだけが書く)', async () => {
  await seed();
  const db = authedContext(testEnv, 'AAAAA').firestore();
  await assertFails(db.collection('passwordResets').add({ targetCode: 'D12', byCode: 'AAAAA', at: new Date() }));
  await assertFails(db.collection('passwordResets').doc('r1').update({ byCode: 'BBBBB' }));
  await assertFails(db.collection('passwordResets').doc('r1').delete());
});

test('roleがadminの乗務員・一般の乗務員もpasswordResetsに書き込めない', async () => {
  await seed();
  await assertFails(authedContext(testEnv, 'ADM1').firestore().collection('passwordResets').add({ targetCode: 'D12', byCode: 'ADM1', at: new Date() }));
  await assertFails(authedContext(testEnv, 'D12').firestore().collection('passwordResets').add({ targetCode: 'D12', byCode: 'D12', at: new Date() }));
});
