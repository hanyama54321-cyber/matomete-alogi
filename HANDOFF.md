# 引き継ぎ書 — A-LOGI版(2026-10-14時点)

新しいセッションで作業を再開する際は、まずこのファイルと [README.md](README.md)・[TECH_DEBT.md](TECH_DEBT.md) を読んでください。

## このリポジトリについて

- **リポジトリ**: `hanyama54321-cyber/matomete-alogi`(**public**)。協力会社 A-LOGI 専用の「安全配送まとめてアプリ」。
- **派生元**: HI-LINE版 `hanyama54321-cyber/matomete-app` のタグ `v0.4.5`(`34f32c5`)。**履歴は引き継いでいない**(最初のコミットに出どころを記録)。v0.4.5 までの開発経緯・設計判断の詳細は matomete-app 側の `HANDOFF.md` / `TECH_DEBT.md` を参照。
- **構成**: 単一ファイルSPA([index.html](index.html))+ Firebase(Firestore / Auth / Storage / Cloud Functions / FCM)。機能は v0.4.5 と同一。
- **公開URL(予定)**: `https://hanyama54321-cyber.github.io/matomete-alogi/`(GitHub Pages、`main` のルート)
- **ブランチ運用**: `main`=公開、`develop`=開発。`develop`→`main` は `--no-ff`。**force push しない**(手順は [README.md](README.md))。
- **版番号**: `A-x.y.z`(HI-LINE版の `v0.x.y` とは別系統)。現在 `A-0.1.0`(**未公開**)。
- **目的**: A-LOGI での期間限定の試行。新機能の追加や UI の作り直しはしない。

### HI-LINE版との違い(これ以外は同じ)

| 項目 | HI-LINE版 | A-LOGI版 |
|---|---|---|
| 配信パス | `/matomete-app/` | `/matomete-alogi/` |
| Firebase | `anzen-matomete-app` | A-LOGI 専用の新規プロジェクト(**未接続。下記**) |
| ブラウザ保存領域のキー | `fbFcmTokenId` / `fbMyAnonReportIds` | `alogi_` を先頭に付けたもの |
| 班 | 9班(`team_a`〜`team_i`) | 昼班・夜班の2班(`team_a`・`team_b`)(**未着手**) |
| チャットのチャンネル | 11 | 全体連絡・昼班・夜班・安全報告の4つ(**未着手**) |
| 配色・アイコン | 青基調・H | 赤基調・A(**未着手**) |
| タグライン「未来を、共に。」 | あり | 使わない(**未着手**) |
| メール通知 | 将来構想あり | 組み込まない |
| 乗務員コード | 10000番台 | 40000番台(29名+研修用 `40000`) |

ログイン方式(乗務員コード5桁+パスワード、`AUTH_EMAIL_DOMAIN`=`@matomete.local`、`AUTH_PW_SUFFIX`=`_mtm`)、
管理者コード(`AAAAA`/`BBBBB`/`CCCCC`)は HI-LINE版と同じ。

## ⚠️ いまの接続先は HI-LINE 本番のままです

`index.html` と `firebase-messaging-sw.js` の `firebaseConfig`、`FCM_VAPID_KEY`、`.firebaserc`、
`test/rules/helpers.js` の `PROJECT_ID` は、**A-LOGI の Firebase につなぐ作業(ステップ6)まで HI-LINE版の値のまま**です。

- **このままの `index.html` をブラウザで開いてログインしないこと。** HI-LINE 本番に利用記録(`sessions`、削除不可)が書き込まれます。
- 画面確認は Firebase エミュレーター(PC内で動く模擬Firebase)につないで行う。**エミュレーターにつなぐための変更はコミットしない。**
- **接続を差し替えるまで GitHub Pages を有効にしない。**

## 進み具合(作成指示書のステップ)

| ステップ | 内容 | 状態 |
|---|---|---|
| 1 | v0.4.5 のコピーで新リポジトリを作る | 済(`51ecdb8`) |
| 2 | 調査と報告 | 済 |
| 3 | 名称・パス・保存キーの差し替え | 済(下記) |
| 4 | デザインの差し替え(赤基調・アイコン・タグライン削除) | 未 |
| 5 | 班とチャンネルを A-LOGI の構成にする | 未 |
| 6 | A-LOGI の Firebase につなぐ・デプロイ手順 | 未 |
| 7 | 初期データ投入の手順書 | 未 |
| 8 | 公開 | 未(南野さんの指示が出てから) |

**各ステップの終わりで止まって報告し、南野さんの確認を待つ**取り決めです。

### ステップ3で変えたもの

- 配信パス・Service Worker のスコープ・`manifest.json` の `start_url` / `scope` を `/matomete-alogi/` に
- `localStorage` のキーを `alogi_fbFcmTokenId` / `alogi_fbMyAnonReportIds` に
- 名称: `<title>` と manifest の `name` は「安全配送まとめてアプリ A-LOGI」、manifest の `short_name` と
  `apple-mobile-web-app-title` は「まとめてA-LOGI」。ログイン画面・「このアプリについて」・ユーザーメニューの
  サブタイトルに「A-LOGI」を追記。**ヘッダーのロゴ横は幅が狭いため現状のまま**
- `APP_VERSION = 'A-0.1.0'`。`CHANGELOG` は A-0.1.0 の1件のみ(HI-LINE版の履歴は載せない)
- 入力例の乗務員コードを「例: 40001」に
- 画面確認用の仮データ(モック`users`配列・静的HTMLの初期表示)を「乗務員A〜L」「管理者」に差し替え
- `docs/`(HI-LINE のメール送信試作の退避物と将来実装メモ)を削除

### 決まっていること(これから実装するもの)

- **班名の編集**: 2班とも班長名を持たないので「呼称を直接編集する」扱いにし、表示名は呼称そのまま(「昼班」「夜班」)。
  「A班(昼班)」のような表示にしない。カード見出しと保存完了のトーストも呼称で出す(ステップ5)
- **班の割り当て**: 乗務員本人がプロフィールで選ぶ(CSV 投入直後は全員「未設定」。未設定のままだと班チャンネルに投稿できない)
- **一般の乗務員へのプッシュ通知設定の公開**: Firestore の `config/notifications` に `openToAllUsers: true` が必要。
  新しいプロジェクトには無いので、コンソールで手作業で作る(ステップ7の手順書に入れる)
- **KYT のサンプル7件**: コンビニ納品の内容のまま使う(A-LOGI も同じセンター・同じ店舗向けのため)
- **周知のサンプル(`seed-announcements.js`)は投入しない**
- **`--danger` の色**: ステップ4では値を変えずに撮影し、見てから決める
- **「開発・運用: 名古屋共配センター」「著作権者: 南野」**: そのまま残す
- **通知の既定タイトル(Service Worker)**: 現状維持
- `test/rules/helpers.js` の `PROJECT_ID` は、ステップ6で `.firebaserc` と**同じコミットで**変える
  (Storage ルールのテストは `.firebaserc` と同じプロジェクトIDでないと失敗する)

## 守ること

- **`matomete-app`(HI-LINE版)は読むだけ。一切変更しない**(ブランチ・タグ・Issue も含む)。HI-LINE版の動作とデータに影響を与えない
- **機能の追加・削除・挙動の変更をしない**(v0.4.5 と同じ動きを保つ)
- **次の箇所には手を入れない**
  - `.chip-row` 本体(3か所で共有。折り返しが必要な箇所は派生クラス `.chip-row.wrap` を利用側に付ける)
  - `BADGE_EPOCH`(新しいインスタンスはデータが空なので現行の値のままで影響はない)
  - `AUTH_EMAIL_DOMAIN` / `AUTH_PW_SUFFIX`(`seed.html`・`seed-drivers-csv.js` と一致している必要がある)
  - `localStorage` のキーの `alogi_` 接頭辞(HI-LINE版と同じドメインで保存領域を共有するため、外すと互いに上書きする)
- **メール通知は実装しない**
- **想定と違うもの・判断に迷うものが出たら、自分で決めずに止めて報告する**

### 公開してはいけないもの

このリポジトリは **public** で、GitHub Pages は `main` のルートをそのまま配信します(`docs/` などの下位フォルダも URL で取得できます)。次のものはコミットしないこと。

- 乗務員名簿(CSV)、氏名の一覧
- パスワード、`serviceAccountKey.json` などの鍵ファイル
- 管理者マニュアル・ドライバー用ガイド・早見表などの配布物。管理者コードや「初回パスワードは乗務員コードと同じ」といった
  運用が書かれており、アプリの URL が公開・乗務員コードが5桁である以上、公開文書として並ぶと総当たりの手引きになるため
- `seed.html`(管理者専用の投入ツール。`.gitignore` で除外済みで、南野さんの会社PCにだけ存在する)

`firebaseConfig` と VAPID 公開鍵は公開してよい値です(アクセス制御は Firestore / Storage のルールで行う)。

## 設計上の原則(HI-LINE版から引き継ぎ。改修時に必ず守ること)

- **タブごとに、通知センターとタブの新着マークが同じ判定関数を見る。** 通知センター専用の既読フラグやクエリは作らない(別系統で組むと表示が必ずズレる)。
  通知センターは既読を書き込まず、行タップは遷移のみ。既読化は遷移先の既存処理に委ねる
- **ベルの点灯 = 通知センターに出る項目が1件以上。** チャットは通知センターに載せないため、チャットの新着ではベルは点灯しない(チャットタブのドットのみ)
- **onSnapshotミラー配列**: ログイン時に `attachXxxListener()` を開始し、ログアウト時(`showLoginScreen()`)に必ず unsubscribe
- **管理者の one-shot 集計は必ず `st.role === 'manager'` でガードする**(`users` の一覧取得はルール上 admin 限定。一般ユーザーから呼ぶと permission-denied)
- **閲覧と書き込みの権限を分ける場合は判定を別々に保つ**(チャットは「閲覧は全員・投稿は所属班のみ」。`channelVisible()` を緩めると投稿側にも波及する)
- **本人による単一フィールドの自己更新**は `affectedKeys().hasOnly([...])` で行い、その値を別のルールが信頼する場合は値の許可リストも必須
  (`users.team` の許可リストは班チャンネルへの投稿権限に直結する)
- **冪等シードスクリプト**: 固定ドキュメントIDで `.set()`。`seedXxx(db, log)` の形

### 単一ファイル構成で実際に起きた事故(詳細は [TECH_DEBT.md](TECH_DEBT.md) 項目11・12・14)

- 新しいグローバル関数・定数を定義する前に、**必ず全文検索で同名の有無を確認する**(後勝ちで静かに上書きされる)
- 共有CSSクラスを変更する前に、**必ず全使用箇所を確認する**。利用側ごとに違う値は利用側でインライン上書きする
- クリックハンドラに文字列を埋め込まない(`bindDataClick()` を使う)
- CSS の構造を変えたら、ブラウザの CSSOM で**ルール総数と並び**を確認する(セレクタの欠落や `}` の過不足は構文チェックで検出できない)

## 開発環境(このPC固有)

- **作業フォルダ**: `C:\Users\hanya\マイドライブ\temp\安全配送まとめてアプリ\matomete-alogi`。
  同じ階層の `matomete-app-git` は HI-LINE版の既存フォルダ。**触らない**
- **git の名前・メール**: このPCには未設定だったため、このリポジトリ内だけ `南野 <hanyama54321@gmail.com>` を設定してある(HI-LINE版のコミットと同じ)
- **GitHub CLI(`gh`)は入っていない**。GitHub の操作は `git` コマンドのみ(Pages の有効化などは南野さんがブラウザで行う)
- **Node.js** v24 / **Python** 3.14 あり
- **Java**: エミュレーター用に Temurin 21 JRE が `C:\Program Files\Eclipse Adoptium\jre-21.0.11.10-hotspot` にある。Bash では毎回 PATH を通す:
  ```
  export PATH="/c/Program Files/Eclipse Adoptium/jre-21.0.11.10-hotspot/bin:$PATH"
  npm run test:rules
  ```
- **Firebase CLI**: `npx firebase-tools`(devDependency。初回は `npm install` が必要)
- **ローカルで開くとき**: 必ずローカルサーバー経由(`http://localhost:.../index.html`)。`file://` で直接開くと `<script src>` の読み込みに失敗する。
  **上の「接続先は HI-LINE 本番のまま」の注意を必ず守ること**

## テスト

```bash
export PATH="/c/Program Files/Eclipse Adoptium/jre-21.0.11.10-hotspot/bin:$PATH"
npm run test:rules
```

`test/rules/` に12ファイル・**189件**(派生元 v0.4.5 と同じ。A-LOGI版ではまだ実行していない)。
班の許可リストを2班に絞る際(ステップ5)に、`users.test.js` の `team_i` を `team_b` に直し、
「`team_c` は拒否される」テストを1件追加する予定(190件になる)。

## デプロイ手順

**ステップ6で追記する**(新しい Firebase プロジェクトの ID が決まってから)。その際の注意点:

- Storage のルールは `firestore.get()` で Firestore の `users/{code}.role` を参照している。新しいプロジェクトでは、
  Storage のサービスアカウント(`service-<プロジェクト番号>@gcp-sa-firebasestorage.iam.gserviceaccount.com`)に
  Firestore を読む権限(`roles/datastore.user`)が必要。**無いと手順書のアップロードが `storage/unauthorized` で失敗する**
  (HI-LINE版で実際に設定が必要だった。Storage ルールの初回デプロイ時に Firebase CLI が付与を尋ねてくる)
- `functions/` は HI-LINE版のまま(8関数、`asia-northeast1`)。メール送信の処理は含まれていない

## 初期データ投入

**ステップ7で追記する。**

## コミット時の運用ルール

- 作業開始時は必ず `git branch` で `develop` にいることを確認する
- コミットは作業のまとまりごとに分ける(例:「パス・名称の差し替え」と「配色の変更」を1つにしない)
- コミット前に `git status` で意図しない差分がないか確認する。`.claude/` と `seed.html` はコミットしない
- **`main` へのマージ・タグ付け・Pages の有効化は、南野さんの指示が出てから行う**
- リリースを確定と言われたら、実機確認の結果報告があるまで `develop` に変更を積まない(本番に入っているものを一意に保つため)

## 既知の技術的負債

[TECH_DEBT.md](TECH_DEBT.md) を参照(HI-LINE版 v0.4.5 時点の記録をそのまま引き継いでいる)。A-LOGI版でも当てはまる主なもの:

- **ゲームタブ**は「近日公開」のプレースホルダーのみ
- **モック`users`配列が残っている**(項目1)。管理者のチャット「メンバー一覧」とゲームタブの管理者表示は、実データではなく仮データ(乗務員A〜L)を表示する
- **乗務員マスタからの個別登録は Auth アカウントを作らない**(項目2b)。ログインできるアカウントの作成は `seed.html` の CSV 投入で行う
- **周知の予約配信は自動公開されない**(項目4。管理者の「今すぐ配信」のみ)
