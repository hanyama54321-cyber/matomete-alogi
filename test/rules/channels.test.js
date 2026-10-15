'use strict';
const test = require('node:test');
const { assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const { createTestEnv, authedContext } = require('./helpers');

let testEnv;

test.before(async () => {
  testEnv = await createTestEnv('channels-test');
});

test.after(async () => {
  await testEnv.cleanup();
});

async function seed() {
  await testEnv.clearFirestore();
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await db.collection('users').doc('D12').set({
      name: '佐藤', team: 'team_a', role: 'driver', passwordChanged: true,
    });
    await db.collection('users').doc('D99').set({
      name: '鈴木', team: 'team_b', role: 'driver', passwordChanged: true,
    });
    await db.collection('users').doc('ADM1').set({
      name: '管理者一号', team: 'team_a', role: 'admin', passwordChanged: true,
    });
    // 保守用の管理者コード(班なし)
    await db.collection('users').doc('AAAAA').set({
      name: '管理者A', team: null, role: 'admin', passwordChanged: true,
    });

    await db.collection('channels').doc('general').set({
      teamId: 'all', name: '全体連絡', lastMessage: null, createdAt: new Date().toISOString(),
    });
    await db.collection('channels').doc('team_a').set({
      teamId: 'team_a', name: 'A班', lastMessage: null, createdAt: new Date().toISOString(),
    });
    await db.collection('channels').doc('team_b').set({
      teamId: 'team_b', name: 'B班', lastMessage: null, createdAt: new Date().toISOString(),
    });
    // 管理者専用チャンネル
    await db.collection('channels').doc('admin').set({
      teamId: 'admin', name: '管理者', lastMessage: { text: '管理者だけの話', senderName: '管理者一号', createdAt: new Date() },
      createdAt: new Date().toISOString(),
    });
    await db.collection('channels').doc('admin').collection('messages').doc('a1').set({
      senderUid: 'ADM1', senderName: '管理者一号', senderRole: 'admin', text: '管理者だけの話',
      createdAt: new Date(), deleted: false, deletedBy: null, deletedAt: null,
    });
    await db.collection('channels').doc('team_a').collection('messages').doc('m1').set({
      senderUid: 'D12', senderName: '佐藤', senderRole: 'driver', text: 'こんにちは',
      createdAt: new Date(), deleted: false, deletedBy: null, deletedAt: null,
    });
  });
}

function newMessage(overrides) {
  return Object.assign({
    senderUid: 'D12', senderName: '佐藤', senderRole: 'driver', text: 'テスト',
    createdAt: new Date(), deleted: false, deletedBy: null, deletedAt: null,
  }, overrides);
}

/* ===== channels本体: get/list(v0.2で全員に開放) ===== */

test('未認証ユーザーはchannelをgetできない', async () => {
  await seed();
  const db = testEnv.unauthenticatedContext().firestore();
  await assertFails(db.collection('channels').doc('team_a').get());
});

test('driverは自班のchannelをgetできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertSucceeds(db.collection('channels').doc('team_a').get());
});

test('driverは他班のchannelもgetできる(v0.2: 閲覧は全員に開放)', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertSucceeds(db.collection('channels').doc('team_b').get());
});

test('driverはchannels一覧を、管理者専用を除く条件付きでlistできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertSucceeds(db.collection('channels').where('teamId', '!=', 'admin').get());
});

test('driverは条件なしではchannels一覧をlistできない(管理者専用が含まれうるため)', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertFails(db.collection('channels').get());
});

/* ===== messages: read(v0.2で全員に開放) / create(所属班+adminのまま) ===== */

test('driverは自班のmessagesをreadできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertSucceeds(db.collection('channels').doc('team_a').collection('messages').get());
});

test('driverは他班のmessagesもreadできる(v0.2: 閲覧は全員に開放)', async () => {
  await seed();
  const db = authedContext(testEnv, 'D99').firestore();
  await assertSucceeds(db.collection('channels').doc('team_a').collection('messages').get());
});

test('driverは自班のmessagesをcreateできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertSucceeds(db.collection('channels').doc('team_a').collection('messages').add(newMessage({})));
});

test('driverはgeneralチャンネルにmessagesをcreateできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertSucceeds(db.collection('channels').doc('general').collection('messages').add(newMessage({})));
});

test('driverは他班のmessagesをcreateできない(書き込みは所属班のみ、v0.2でも変更なし)', async () => {
  await seed();
  const db = authedContext(testEnv, 'D99').firestore();
  await assertFails(db.collection('channels').doc('team_a').collection('messages').add(
    newMessage({ senderUid: 'D99', senderName: '鈴木' })
  ));
});

test('adminは全チャンネルでmessagesをreadできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'ADM1').firestore();
  await assertSucceeds(db.collection('channels').doc('team_a').collection('messages').get());
});

test('adminは全チャンネルにmessagesをcreateできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'ADM1').firestore();
  await assertSucceeds(db.collection('channels').doc('team_b').collection('messages').add(
    newMessage({ senderUid: 'ADM1', senderName: '管理者一号', senderRole: 'admin' })
  ));
});

test('未認証ユーザーはmessagesをreadできない', async () => {
  await seed();
  const db = testEnv.unauthenticatedContext().firestore();
  await assertFails(db.collection('channels').doc('team_a').collection('messages').get());
});

/* ===== 管理者専用チャンネル(#管理者、teamId: 'admin') ===== */

test('driverは#管理者のchannelをgetできない', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertFails(db.collection('channels').doc('admin').get());
});

test('driverは#管理者のmessagesをreadできない', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertFails(db.collection('channels').doc('admin').collection('messages').get());
  await assertFails(db.collection('channels').doc('admin').collection('messages').doc('a1').get());
});

test('driverは#管理者にmessagesをcreateできない', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertFails(db.collection('channels').doc('admin').collection('messages').add(newMessage({})));
});

test('driverは#管理者のlastMessageを更新できない', async () => {
  await seed();
  const db = authedContext(testEnv, 'D12').firestore();
  await assertFails(db.collection('channels').doc('admin').update({
    lastMessage: { text: 'x', senderName: '佐藤', createdAt: new Date() },
  }));
});

test('adminは#管理者のchannelをgetでき、条件なしでchannels一覧をlistできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'ADM1').firestore();
  await assertSucceeds(db.collection('channels').doc('admin').get());
  await assertSucceeds(db.collection('channels').get());
});

test('adminは#管理者のmessagesをread・createできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'ADM1').firestore();
  await assertSucceeds(db.collection('channels').doc('admin').collection('messages').get());
  await assertSucceeds(db.collection('channels').doc('admin').collection('messages').add(
    newMessage({ senderUid: 'ADM1', senderName: '管理者一号', senderRole: 'admin' })
  ));
});

test('保守用の管理者(AAAAA、班なし)も#管理者をread・createできる', async () => {
  await seed();
  const db = authedContext(testEnv, 'AAAAA').firestore();
  await assertSucceeds(db.collection('channels').doc('admin').collection('messages').get());
  await assertSucceeds(db.collection('channels').doc('admin').collection('messages').add(
    newMessage({ senderUid: 'AAAAA', senderName: '管理者A', senderRole: 'admin' })
  ));
});
