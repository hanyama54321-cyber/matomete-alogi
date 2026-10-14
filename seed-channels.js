// seed-channels.js
// channels 4件(全体連絡 / 昼班 / 夜班 / 安全報告)を投入する(A-LOGI版)。
// 冪等: ドキュメントIDが固定のため再実行しても壊れない。
// 既存ドキュメントがある場合は teamId/name のみ更新し、lastMessage/createdAt は保持する
// (Phase 3でメッセージ送信時にlastMessageが実データで更新されるため、上書きしない設計)。
//
// 実行タイミング: seed-teams.js(班マスター)の後に行う。
// 班チャンネルの id / teamId は teams の id(team_a・team_b)と一致させること
// (投稿可否のルール channelVisible() が channels.teamId と users.team を突き合わせるため)。
// name は表示名どおり「昼班」「夜班」とする(「A班（昼班）」のようにしない)。

const CHANNELS_MASTER = [
  { id: 'general', teamId: 'all',    name: '全体連絡' },
  { id: 'team_a',  teamId: 'team_a', name: '昼班' },
  { id: 'team_b',  teamId: 'team_b', name: '夜班' },
  { id: 'safety',  teamId: 'all',    name: '安全報告' },
];

async function seedChannels(db, log) {
  log(`=== channels ${CHANNELS_MASTER.length}件 投入 開始 ===`);
  for (const c of CHANNELS_MASTER) {
    const ref = db.collection('channels').doc(c.id);
    const existing = await ref.get();
    if (existing.exists) {
      await ref.set({ teamId: c.teamId, name: c.name }, { merge: true });
      log(`✓ channels/${c.id} 更新(既存のlastMessage/createdAtは保持) teamId=${c.teamId}`);
    } else {
      await ref.set({
        teamId: c.teamId,
        name: c.name,
        lastMessage: null,
        createdAt: new Date().toISOString(),
      });
      log(`✓ channels/${c.id} 新規作成 teamId=${c.teamId}`);
    }
  }
  log(`=== 完了(${CHANNELS_MASTER.length}件) ===`);
}
