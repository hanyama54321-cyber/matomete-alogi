# 引き継ぎ書 — A-LOGI版(2026-10-14時点)

新しいセッションで作業を再開する際は、まずこのファイルと [README.md](README.md)・[TECH_DEBT.md](TECH_DEBT.md) を読んでください。

## このリポジトリについて

- **リポジトリ**: `hanyama54321-cyber/matomete-alogi`(**public**)。協力会社 A-LOGI 専用の「安全配送まとめてアプリ」。
- **派生元**: HI-LINE版 `hanyama54321-cyber/matomete-app` のタグ `v0.4.5`(`34f32c5`)。**履歴は引き継いでいない**(最初のコミットに出どころを記録)。v0.4.5 までの開発経緯・設計判断の詳細は matomete-app 側の `HANDOFF.md` / `TECH_DEBT.md` を参照。
- **構成**: 単一ファイルSPA([index.html](index.html))+ Firebase(Firestore / Auth / Storage / Cloud Functions / FCM)。機能は v0.4.5 と同一。
- **公開URL**: `https://hanyama54321-cyber.github.io/matomete-alogi/`(GitHub Pages、`main` のルート)
- **ブランチ運用**: `main`=公開、`develop`=開発。`develop`→`main` は `--no-ff`。**force push しない**(手順は [README.md](README.md))。
- **版番号**: `A-x.y.z`(HI-LINE版の `v0.x.y` とは別系統)。現在 `A-0.1.6`(2026-10-29 公開。`A-0.1.5` は 2026-10-27、`A-0.1.4` は 2026-10-16、`A-0.1.1`〜`A-0.1.3` は 2026-10-15、`A-0.1.0` は 2026-10-14 公開)。
- **目的**: A-LOGI での期間限定の試行。新機能の追加や UI の作り直しはしない。

### HI-LINE版との違い(これ以外は同じ)

| 項目 | HI-LINE版 | A-LOGI版 |
|---|---|---|
| 配信パス | `/matomete-app/` | `/matomete-alogi/` |
| Firebase | `anzen-matomete-app` | A-LOGI 専用の新規プロジェクト(**未接続。下記**) |
| ブラウザ保存領域のキー | `fbFcmTokenId` / `fbMyAnonReportIds` | `alogi_` を先頭に付けたもの |
| 班 | 9班(`team_a`〜`team_i`) | 昼班・夜班の2班(`team_a`・`team_b`)。班長名は持たない |
| チャットのチャンネル | 11 | 全体連絡・昼班・夜班・管理者の4つ(#管理者 は管理者専用。A-0.1.3 で #安全報告 から置き換え) |
| 配色・アイコン | 青基調・H | 赤基調・A |
| タグライン「未来を、共に。」 | あり | 使わない(削除済み) |
| 新着マーク(ベル・タブ) | 赤 `#FF3B30`・白リング | 黄 `#FFD54F`・濃色リング `#3A0A12` |
| 周知の未読ドット | `--primary`(青) | `--navy`(ダークワイン `#3A0A12`) |
| 周知のタグ「業務」(A-0.1.4 まではカテゴリ)・KYT難易度「中」の色 | `--primary` | `--amber`(琥珀色。A-LOGI版で追加した変数) |
| 班名の編集(班編成管理) | 班長名を入力 → 「A班（○○班）」 | 呼称を直接入力 → 表示名は呼称そのまま |
| 班が未設定の人のプロフィール | 選択欄に先頭の班が表示され、そのまま保存できる | 「選択してください」。乗務員は選ぶまで保存できない |
| メール通知 | 将来構想あり | 組み込まない |
| 乗務員コード | 10000番台 | 40000番台(29名+研修用 `40000`) |

ログイン方式(乗務員コード5桁+パスワード、`AUTH_EMAIL_DOMAIN`=`@matomete.local`、`AUTH_PW_SUFFIX`=`_mtm`)、
管理者コード(`AAAAA`/`BBBBB`/`CCCCC`)は HI-LINE版と同じ。

## 接続先は A-LOGI の Firebase プロジェクト `matomete-alogi`(ステップ6で差し替え済み)

`index.html` と `firebase-messaging-sw.js` の `firebaseConfig`、`FCM_VAPID_KEY`、`.firebaserc`、`test/rules/helpers.js` の `PROJECT_ID` は、
2026-10-14 に A-LOGI の値へ差し替えた(`7c1e0f4`)。HI-LINE版 `anzen-matomete-app` の値はコードに残っていない。

- **ローカルで `index.html` を開いてログインすると、A-LOGI の本番 Firebase に書き込まれる**(利用記録 `sessions` は削除できない)。
  画面確認は引き続き Firebase エミュレーターで行う(下の「画面の撮影方法」)。エミュレーターにつなぐための変更はコミットしない
- **GitHub Pages の有効化は南野さんの指示が出てから**(ステップ8)

## 進み具合(作成指示書のステップ)

| ステップ | 内容 | 状態 |
|---|---|---|
| 1 | v0.4.5 のコピーで新リポジトリを作る | 済(`51ecdb8`) |
| 2 | 調査と報告 | 済 |
| 3 | 名称・パス・保存キーの差し替え | 済(下記) |
| 4 | デザインの差し替え(赤基調・アイコン・タグライン削除) | 済 |
| 5 | 班とチャンネルを A-LOGI の構成にする | 済 |
| 6 | A-LOGI の Firebase につなぐ・デプロイ手順 | 済(下の「ステップ6の実行記録」) |
| 7 | 初期データ投入の手順書・投入 | 済(投入も完了。下の「初期データ投入」) |
| 8 | 公開 | **済**(2026-10-14 公開、2026-10-15 実機確認完了。下の「ステップ8: 公開」) |

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

### ステップ4で変えたもの

- **配色**: `:root` の変数と直書きの色を、作成指示書の対応表どおりに置き換えた(16進は `:root` を除き26か所、`rgba` は42か所)。
  `<meta name="theme-color">` と manifest の `theme_color` は `#8E0E1E`。配色の面積は増やしていない
- **新着マーク**: `--badge-color` を黄色 `#FFD54F` にし、リング色の変数 `--badge-ring-color`(`#3A0A12`)を追加して
  `.bell-dot` / `.nav-badge` だけ濃色リングにした。周知タブの未読ドット(`.ann-unread-dot`)は `--primary`・白リングのまま
- **アイコン**: `icon.svg`・`icon-180/192/512.png`・ヘッダーのロゴを A-LOGI 版(A の字)に。ファビコン(`index.html` に埋め込み)は簡略版。
  背景の透かしは「A.」。PNG は `icon.svg` から書き出したもの(角丸の外側は透過)
- **タグライン「未来を、共に。」** を3か所とも削除
- CSS のルール数は派生元 v0.4.5 と同じ **335**、並びも一致(値だけを変え、構造は変えていない)

### ステップ4のあとで決まり、適用したもの

- **`--danger`(`#D93A3F`)は値を変えない。** `--primary` とほぼ同じ赤になる問題は、色分けで `--primary` を使っていた側を
  変えて解消した: 色分け用の変数 `--amber` を追加し、カテゴリ「業務」と KYT 難易度「中」に使う。
  塗りつぶしの「削除する」ボタンは現状のまま
  - `mkTag()` は色を16進で渡すと薄い背景と枠線が付き、`var(--xxx)` で渡すと文字色だけになる(派生元からの挙動)。
    ほかのカテゴリと見た目をそろえるため、琥珀色も変数で渡している
- **周知タブの未読ドット**は `--navy`(必読ピルの赤と色で区別するため)
- **灰色2か所**: 無効時のログインボタン `#C7B1B4`、オフのスイッチ `#D8CACC`。診断画面の色は現状維持

### ステップ5で変えたもの

- **班**: `team_a`=昼班 / `team_b`=夜班(ID は HI-LINE版のものを流用)。`index.html` の初期値、`seed-teams.js`
- **チャンネル**: 全体連絡(`general`)・昼班(`team_a`)・夜班(`team_b`)・安全報告(`safety`)。`seed-channels.js`、`BADGE_CHANNEL_IDS`
- **表示名は呼称そのまま**(「昼班」「夜班」)。組み立てている3か所(`index.html` の初期値・`seed-teams.js`・`saveTeamEdit()`)を同じ形にしてある。
  変えるときは3か所そろえること
- **班名の編集(班編成管理)は挙動を変えた**: どの班も「呼称」を直接編集し、`leaderName=null` / `label`=入力値 / `displayName`=入力値 で保存する。
  カード見出しは「現在: 昼班」、完了のトーストは「昼班の表示を更新しました」
- **`firestore.rules`**: 乗務員本人が `users.team` を変更できる値を `['team_a','team_b']` に絞った
- **ルールテスト**: `users.test.js` の `team_i` を `team_b` に直し、「`team_c` には変更できない」を1件追加(189 → **190件**、全件 pass)
- エミュレーターで確認済み: `seed-teams.js` / `seed-channels.js` をそのまま実行して投入できること、班名の保存と元への戻し、
  プロフィールの班の選択肢(昼班・夜班)、本人による `team_b` への変更は許可・`team_c` は拒否

### ステップ5のあとで決まり、適用したもの

- **`--amber` は `#9A5F00`**。当初の `#B36F00` は白いカードの上の文字(12px・太字)でコントラスト比 4.05 しかなく、4.5 に届かなかった。
  `#9A5F00` は 5.24。同じ並びの `--safe`(緑 3.49)・`--danger`(4.54)は派生元のまま
- **便利リンクの「天気情報」も `--amber`**(「道路・交通情報」の `--danger` と同じ系統の赤になっていたため)
- 派生元からある `#B36F00` の直書き(報告の「対応中」、ゲームタブの「公開準備中」)は変えていない

- **班が未設定の人のプロフィール**(`openProfileEdit()` / `saveProfile()`): 所属班の選択欄の初期表示を「選択してください」にした。
  - 班が未設定の**乗務員**は、昼班・夜班のどちらかを選ぶまで何も保存できない(「⚠️ 所属班を選択してください」と表示)
  - **管理者**は班を持たない運用のため、選ばないままでも保存でき、その場合は班を変更しない
  - 班が設定済みの人の表示と保存、`firestore.rules`(`team: null` への自己変更は不可)は変えていない
  - エミュレーターで「未設定の乗務員」「設定済みの乗務員」「管理者」の3通りを確認済み

### 画面の撮影方法(エミュレーター)

HI-LINE 本番につながずに画面を確認するため、**リポジトリのファイルは書き換えず**、次の方法で撮影した。

1. `npx firebase-tools emulators:start --only auth,firestore,storage --project demo-alogi`
   (`demo-` で始まるプロジェクトIDは、実在のプロジェクトに一切接続しない)
2. 一時的なローカルサーバーが、`index.html` を配信する瞬間にだけ `firebaseConfig` を `demo-alogi` に差し替え、
   `useEmulator()` の呼び出しを差し込む(`fbAuth.useEmulator(url, { disableWarnings: true })` で警告帯を消す)
3. エミュレーターに仮データ(管理者1名・昼班/夜班の乗務員・周知・チャット・報告)を入れ、ブラウザ自動操作で撮影。
   SDK 本体とフォント以外の外部通信はブラウザ側で遮断し、遮断件数0・コンソールエラー0を確認

撮影用のスクリプトはリポジトリに入れていない(作業PCの一時フォルダ)。

### 決まっていること(これから手順書に入れるもの・そのまま残すもの)

- **班の割り当て**: 乗務員本人がプロフィールで選ぶ(CSV 投入直後は全員「未設定」。未設定のままだと班チャンネルに投稿できない)。
  未設定の人がプロフィールを開くと選択欄は「選択してください」になり、選ぶまで保存できない。
  ステップ7の案内には「初回ログイン後にプロフィールで自分の班を選ぶ」と入れる
- **一般の乗務員へのプッシュ通知設定の公開**: Firestore の `config/notifications` に `openToAllUsers: true` が必要。
  新しいプロジェクトには無いので、コンソールで手作業で作る(ステップ7の手順書に入れる)
- **KYT のサンプル7件**: コンビニ納品の内容のまま使う(A-LOGI も同じセンター・同じ店舗向けのため)
- **周知のサンプル(`seed-announcements.js`)は投入しない**
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
- 周知の投稿項目(`submitAnnPayload()`)・`announcements` のルール・`onAnnouncementNotify`・お知らせを文字として表示する作り(`escHtml()`)を変えたときは、一括投稿ツール(`matomete-broadcast`)も合わせて確かめること

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
  **ログインすると A-LOGI の本番 Firebase に書き込まれる(上の「接続先」の注意を参照)**

## テスト

```bash
export PATH="/c/Program Files/Eclipse Adoptium/jre-21.0.11.10-hotspot/bin:$PATH"
npm run test:rules
```

`test/rules/` に12ファイル・**190件**(2026-10-14 に全件 pass)。

**ステップ6(2026-10-14)以降は、プロジェクトIDを明示して次のように実行する**(エミュレーターのみ。本番には接続しない)。

```bash
export PATH="/c/Program Files/Eclipse Adoptium/jre-21.0.11.10-hotspot/bin:$PATH"
npx firebase-tools emulators:exec --only firestore,storage --project matomete-alogi "node --test test/rules/*.test.js"
```

(ステップ6より前は `.firebaserc` と `PROJECT_ID` が HI-LINE版の値だったため、一時コピーで `demo-` のIDに差し替えて実行していた。)

**既定のポート(8080・9199 など)を別のプロジェクトのエミュレーターが使っている場合**は、ポートだけ変えた設定ファイル
`firebase.altports.json`(コミットしない。このPCでは `.git/info/exclude` で除外)を作り、`--config firebase.altports.json` を付けて実行する。
テスト補助(`test/rules/helpers.js`)は `FIRESTORE_EMULATOR_HOST`・`FIREBASE_STORAGE_EMULATOR_HOST` を読むので、別のポートでもそのまま流れる
(A-0.1.6 で HI-LINE v0.5 から移植)。A-0.1.6 の作業時(2026-10-29)は、`matomete-meiho` のエミュレーターが既定のポートを使っていたためこの方法で実行した。

テスト用の仮データ(各テストの `seed()`)には `team: 'team_e'` が残っている。ルールは班の値を検証しないため結果に影響しないが、
A-LOGI版には無い班IDである(見た目の問題。直す場合は `badges.test.js` の `chat.team_e` も含め全ファイルで置き換える)。

## ステップ6の実行記録(Firebase プロジェクトの作成〜デプロイ)

会社PCでの手作業はせず、このPCから `firebase-tools` で行う取り決め(2026-10-14)。

**絶対の条件**

- HI-LINE 本番 `anzen-matomete-app` に対するコマンドは、参照も含めて一切実行しない(`projects:list` もプロジェクト一覧に含まれるため使わない)
- `firebase` コマンドは毎回 `--project matomete-alogi` を明示する(`firebase use` の既定値に頼らない)
- デプロイの直前には、宛先のプロジェクトIDを表示して確認してから実行する
- サービスアカウントの鍵ファイルは作らない・保存しない
- 接続情報を差し替えるまでは `.firebaserc` の既定値が HI-LINE版のままなので、**リポジトリの外の空のフォルダ**でコマンドを実行する(差し替え後は不要)
- **IAM の扱い(2026-10-14 に南野さんが決定)**: Google が API の利用開始時に自動で付ける「サービス専用のロール」
  (`roles/○○.serviceAgent` を、各サービスの `service-252853368767@gcp-sa-○○` アカウントに付けるもの)は、報告だけでよく止まらなくてよい。
  **それ以外の IAM の追加・変更があったら止まって報告する。** IAM や API の設定を、失敗の解消のために自分で追加・変更しない(必要なら案を報告)

**A-LOGI の Firebase プロジェクト**

| 項目 | 値 |
|---|---|
| プロジェクトID | `matomete-alogi` |
| プロジェクト番号 | `252853368767` |
| ウェブアプリ | 「安全配送まとめてアプリ A-LOGI」 App ID `1:252853368767:web:435764e7010e643dfed30a` |
| Storage バケット | `matomete-alogi.firebasestorage.app` |
| 認証ドメイン | `matomete-alogi.firebaseapp.com` |
| 所有アカウント | `hanyama54321@gmail.com`(このPCの firebase-tools にログイン済みだったもの) |

Analytics は有効にしていないため、`firebaseConfig` に `measurementId` は無い(アプリは Analytics を使っていない)。

**実行したコマンドと結果**(`firebase` = `node <リポジトリ>/node_modules/firebase-tools/lib/bin/firebase.js`、v15.23.0)

| # | コマンド | 結果 |
|---|---|---|
| 1 | `firebase login:list` | `Logged in as hanyama54321@gmail.com`(ログイン済みのため、ブラウザでの承認は不要だった) |
| 2 | `firebase projects:create matomete-alogi --display-name "matomete-alogi" --non-interactive` | 成功。プロジェクトID `matomete-alogi` が取れた |
| 3 | `firebase apps:create WEB "安全配送まとめてアプリ A-LOGI" --project matomete-alogi --non-interactive` | 成功 |
| 4 | `firebase apps:sdkconfig WEB 1:252853368767:web:435764e7010e643dfed30a --project matomete-alogi` | 成功。`firebaseConfig` を取得 |
| 5 | `firebase firestore:databases:create "(default)" --location asia-northeast1 --project matomete-alogi --non-interactive` | **失敗(HTTP 403)**。新しいプロジェクトでは Cloud Firestore API がまだ有効になっていないため。データベースは作られていない。**ここで止めて南野さんに報告** |

| 6 | `firebase firestore:databases:get "(default)" --project matomete-alogi`、`firebase firestore:databases:list --project matomete-alogi`(南野さんからコンソール作業の完了連絡を受けたあとの確認。数分おいて計4回) | **すべて HTTP 403**(Cloud Firestore API が未有効)。#5 と同じ状態のまま |
| 7 | 公開エンドポイントでの確認(ウェブ用の公開 API キーを使った読み取りのみ): Firestore の REST / Auth の `getProjectConfig` / Storage バケットの一覧 | Firestore=`SERVICE_DISABLED`、Auth=`CONFIGURATION_NOT_FOUND`、Storage バケット `matomete-alogi.firebasestorage.app`=404。**3つとも、プロジェクトID `matomete-alogi` には設定が入っていない** |

| 8 | (南野さんがコンソールで Blaze・予算アラート $5・Firestore・Storage・メール/パスワード認証・承認済みドメイン・VAPID 鍵を設定。最初の2回の完了連絡は作業前の下書きだったため、#6・#7 は未設定の状態を見ていた) | — |
| 9 | `firebase firestore:databases:get "(default)" --project matomete-alogi` | 成功。`FIRESTORE_NATIVE` / `STANDARD` / `asia-northeast1` |
| 10 | 公開エンドポイントでの確認(読み取りのみ): Auth の `getProjectConfig` / Storage バケットの一覧 | Auth: プロジェクト番号 `252853368767`、承認済みドメインに `hanyama54321-cyber.github.io` あり。Storage: 403(バケットは存在し、ルールで拒否) |
| 11 | 接続情報の差し替えを1コミットで(`7c1e0f4`): `firebaseConfig`(`index.html`・SW)、`FCM_VAPID_KEY`、`.firebaserc`、`test/rules/helpers.js` の `PROJECT_ID` | コード内に `anzen-matomete-app` の値が残っていないことを全文検索で確認 |
| 12 | `firebase emulators:exec --only firestore,storage --project matomete-alogi "node --test test/rules/*.test.js"` | 190件すべて pass(エミュレーターのみ) |
| 13 | `firebase deploy --only firestore:rules,firestore:indexes,storage --project matomete-alogi --dry-run` | 成功(ルール2つとも構文エラーなし) |
| 14 | 宛先 `matomete-alogi` を表示して確認 → `firebase deploy --only firestore:rules,firestore:indexes,storage --project matomete-alogi --non-interactive` | **成功**(2026-10-14 14:35)。Firestore ルール・インデックス・Storage ルールを公開 |

| 15 | Storage のクロスサービス参照の権限を付与(南野さんの許可: 対象は matomete-alogi のみ・この権限1つだけ)。firebase-tools が対話モードで使う関数 `resourceManager.addServiceAccountToRoles("252853368767", "service-252853368767@gcp-sa-firebasestorage.iam.gserviceaccount.com", ["roles/firebaserules.firestoreServiceAgent"], true)` を、ログイン済みのアカウントで実行(= Cloud Resource Manager `setIamPolicy`、`updateMask=bindings`) | **成功**。付与前後の IAM ポリシーを読み取りで比較し、追加1件・削除0件(この1件だけ)を確認 |
| 16 | Functions のランタイムを `nodejs22` に(`63afda9`)。`(cd functions && npm ci)` → `firebase emulators:exec --only functions,firestore --project matomete-alogi "node -e 0"` | 8関数の定義を読み込めた(`cleanupStaleTokens` は Pub/Sub エミュレーターが無いためエミュレーター上では対象外) |
| 17 | 宛先 `matomete-alogi` を表示 → `firebase deploy --only functions --project matomete-alogi --dry-run --non-interactive` | 成功。**ただし dry-run でも API の有効化は実行された**(cloudfunctions / cloudbuild / artifactregistry / firebaseextensions / cloudscheduler / run / eventarc。pubsub・storage は有効済み)。あわせて pubsub・eventarc のサービスID が作られた。次回の本番デプロイで付与されるロール3件が表示された(下記) |
| 18 | IAM ポリシーの読み取り(#17 のあと) | バインディングが #15 直後の10件から **18件に増えていた**。API の有効化に伴って Google が自動で付けたもの(下記) |

**#17 の dry-run で、IAM の設定が自動で増えた(2026-10-14)**

API を有効にすると、Google がその API のサービスエージェントにロールを自動で付ける。#17 のあと、次の8件が増えていた(こちらから付与したものではない)。

- `roles/cloudbuild.builds.builder` ← `252853368767@cloudbuild.gserviceaccount.com`
- `roles/cloudbuild.serviceAgent` ← `service-252853368767@gcp-sa-cloudbuild`
- `roles/cloudfunctions.standardServiceAgent` ← `service-252853368767@gcf-admin-robot`
- `roles/cloudscheduler.serviceAgent` ← `service-252853368767@gcp-sa-cloudscheduler`
- `roles/containerregistry.ServiceAgent` ← `service-252853368767@containerregistry`
- `roles/editor` ← 既定の Compute のサービスアカウント・`cloudservices`・`matomete-alogi@appspot`
- `roles/firebasemods.serviceAgent` ← `service-252853368767@gcp-sa-firebasemods`(Extensions の API)
- `roles/run.serviceAgent` ← `service-252853368767@serverless-robot-prod`

**本番の Functions デプロイでは、firebase-tools がさらに次の3件を自動で付ける**(Firestore トリガーと定期実行の関数に必要。確認の質問は出ない)。

- `roles/iam.serviceAccountTokenCreator` ← `service-252853368767@gcp-sa-pubsub.iam.gserviceaccount.com`
- `roles/run.invoker` ← `252853368767-compute@developer.gserviceaccount.com`
- `roles/eventarc.eventReceiver` ← `252853368767-compute@developer.gserviceaccount.com`

南野さんが上の3件を了承(2026-10-14)。

| # | コマンド・作業 | 結果 |
|---|---|---|
| 19 | IAM ポリシーを読み取って保存(ロールと付与先の組で20件) | — |
| 20 | 宛先 `matomete-alogi` を表示 → `firebase deploy --only functions --project matomete-alogi --force --non-interactive`(14:47) | **一部失敗**。作成できたのは `sendUnreadReminder` だけ。Firestore トリガーの4関数は「Eventarc のサービスエージェントの権限がまだ反映されていない(初めて第2世代の関数を使うときは数分かかる。数分後に再実行)」で失敗。`subscribeToReport`・`estimateNotifyAudience`・`cleanupStaleTokens` は Cloud Build が「予期しないエラー」で失敗。コンテナのクリーンアップポリシー(1日)は設定された |
| 21 | IAM ポリシーを読み取って #19 と比較 | 追加5件・削除0件。了承済みの3件に加えて、Google が自動で付けた2件(`roles/artifactregistry.serviceAgent` ← `service-252853368767@gcp-sa-artifactregistry`、`roles/eventarc.serviceAgent` ← `service-252853368767@gcp-sa-eventarc`)があった |
| 22 | `firebase functions:list --project matomete-alogi` | 4件表示(`sendUnreadReminder` は正常。ほか3件はビルド失敗のためメモリ欄が空)。Firestore トリガーの4関数は無い |

南野さんの条件(「付いた IAM が了承の3件だけでなければ止まって報告」)に当たったため、いったん止めて報告。
南野さんが想定外の2件をそのままとし、再デプロイを了承(2回まで。IAM・API の設定は自分で変えない)。

| # | コマンド・作業 | 結果 |
|---|---|---|
| 23 | IAM ポリシーを読み取って保存(25件)→ 5分待機 | — |
| 24 | 宛先 `matomete-alogi` を表示 → `firebase deploy --only functions --project matomete-alogi --force --non-interactive`(再デプロイ1回目、14:57) | **成功**。残り7関数を作成・更新(`sendUnreadReminder` は変更なしでスキップ) |
| 25 | IAM ポリシーを読み取って #23 と比較 | **追加1件・削除0件**: `roles/pubsub.serviceAgent` ← `service-252853368767@gcp-sa-pubsub`(Pub/Sub のサービスID作成に伴って Google が自動で付けたもの)。報告済みの5件以外のため、南野さんの条件どおり止めて報告 |
| 26 | `firebase functions:list --project matomete-alogi` | **8関数すべて `asia-northeast1`・`nodejs22`・v2**。Firestore トリガー4つ(written / created / created / updated)、呼び出し型3つ、定期実行1つ |

**関数のデプロイ前(#19、20件)からの IAM の増加は計6件**: 了承の3件、了承済みの想定外2件、#25 の1件(`roles/pubsub.serviceAgent`)。削除は0件。

南野さんが #25 の1件もそのままとした(2026-10-14)。ステップ6は完了。

**残っている確認事項**

- **Storage ルールの「クロスサービス参照」の権限**(解決済み): #15 で付与した
- **Cloud Functions のランタイム**(解決済み): Node.js 20 は 2026-10-30 に廃止のため、初回デプロイの前に `nodejs22` へ上げた(`63afda9`、#16)

## デプロイ手順(A-LOGI版)

- コマンドは必ず `--project matomete-alogi` を付ける(`firebase use` の既定値に頼らない)。実行前に宛先のプロジェクトIDを表示して確認する
- ルール・インデックス・Storage ルール:
  ```
  npx firebase-tools deploy --only firestore:rules,firestore:indexes,storage --project matomete-alogi
  ```
- Cloud Functions(2026-10-14 にデプロイ済み。8関数、`asia-northeast1`、`nodejs22`。メール送信の処理は含まれていない):
  ```
  (cd functions && npm ci)
  npx firebase-tools deploy --only functions --project matomete-alogi
  ```

## 初期データ投入(ステップ7の手順書)

投入には `seed.html`(管理者専用の投入ツール)を使う。`.gitignore` で除外しているので、リポジトリ(GitHub)には入っていない。
**A-LOGI 用のコピーは、このPCの作業フォルダ(`matomete-alogi`)に作成済み**(2026-10-14。HI-LINE版の作業フォルダ `matomete-app-git` の
`seed.html` を読み取ってコピーし、書き換えた。元のファイルは変更していない)。

### 0. 事前の確認(Firebase コンソール、`matomete-alogi` を開いていること)

- [ ] Authentication →「設定」→「ユーザーアクション」で **「作成(サインアップ)を有効にする」がオン**になっている
      (`seed.html` は画面からアカウントを作るため、投入中はオンが必要。**投入が終わったら 7. でオフに戻す**)
- [ ] Authentication →「Sign-in method」で「メール/パスワード」が有効
- [ ] 承認済みドメインに `localhost` がある(初期状態で入っている。2026-10-14 に確認済み)

### 1. A-LOGI 用の `seed.html`(作成済み)

HI-LINE版からの変更点(南野さんの指示による):

| 箇所 | 変更 |
|---|---|
| `firebaseConfig` | A-LOGI の値に(`measurementId` は削除)。HI-LINE の値(`anzen-matomete-app`・`AIzaSyBDEk`・`163103621501`・`G-FQKRCR30BY`)が残っていないことを確認済み |
| ① デモユーザー | 管理者3件だけに(乗務員 `10168` を削除)。管理者の `team` は `'本部'` ではなく `null` |
| ① の動き | ルールがデプロイ済みのため、`users/{コード}` は管理者としてログインしている間しか作れない。未ログインで押しても Auth の作成は続け、`users` の作成失敗をログに出す。**終わったらボタンを押せる状態に戻す**(未ログインで押す → 管理者でログインしてもう一度押す、という使い方のため。HI-LINE版はエラー時しか戻していなかった) |
| ② 旧テストデータの削除 | カードと処理を削除(乗務員の登録後に押すと全乗務員が消えるため) |
| ④ users.team マイグレーション | カードと処理、`migrate-users-team.js` の読み込みを削除 |
| ⑤ channels | 管理者でログインしたら押せるようにした(HI-LINE版は④の本実行のあとでしか押せなかった) |
| ⑨ 周知サンプル | カードと処理、`seed-announcements.js` の読み込みを削除 |
| 説明文 | 9班・11件 → 2班・4件。⑧に A-LOGI の名簿の形(見出し `乗務員コード,氏名,区分`)と、管理者の除外はコードで判定することを追記 |
| 画面の上部 | 接続先のプロジェクトIDを表示(`matomete-alogi` 以外なら警告を出す) |

カードの番号は HI-LINE版のまま(①③⑤⑥⑦⑧)。

**エミュレーター(`demo-alogi`)で通しで確認済み(2026-10-14)**: 未ログインで① → Auth 3件作成・`users` は3件とも拒否 →
最初の管理者 `users/AAAAA` をルールの外で作成 → `AAAAA` でログイン(③⑤⑥⑦⑧が押せる)→ ①をもう一度 → `users` 3件(`role: admin`、`team: null`)→
③ 班2件 → ⑤ チャンネル4件 → ⑦ KYT 7件 → ⑥ 手順書5件 → ⑧ 架空の名簿(管理者3行+乗務員3行)でドライラン(新規3・除外3)→ 本実行 →
乗務員が初期パスワードでサインインできる。ページのエラー・外部への通信は無し。

### 2. `seed.html` を開く

`file://` で直接開くと `<script src>` の読み込みに失敗するため、ローカルサーバー経由で開く。

```bash
python -m http.server 8000
```
(このリポジトリのフォルダで実行)→ ブラウザで `http://localhost:8000/seed.html` を開く。
開いたら、ブラウザの開発者ツールのコンソールで `firebase.app().options.projectId` が **`matomete-alogi`** になっていることを確かめてから、投入を始める。

### 3. 投入(この順番で)

| 順 | 内容 | 使うもの | 件数 | 備考 |
|---|---|---|---|---|
| 1 | 管理者アカウント `AAAAA`・`BBBBB`・`CCCCC` | ① + 最初の1件だけ別の方法(下) | 3 | `role: 'admin'`、`team: null`。管理者は班を持たない(プロフィールで「選択してください」のまま保存できる) |
| 2 | 班 | `seed-teams.js`(`seedTeams`) | 2 | `team_a`=昼班、`team_b`=夜班。エミュレーターで投入できることを確認済み |
| 3 | チャンネル | `seed-channels.js`(`seedChannels`) | 4 | 全体連絡・昼班・夜班・安全報告。同上 |
| 4 | 乗務員 | `seed-drivers-csv.js`(ドライラン → 本実行) | CSV の行数 − 管理者3 | 下の「名簿CSV」を先に確認する。**必ずドライランの結果を見てから本実行する** |
| 5 | KYT のサンプル | `seed-kyt.js`(`seedKyt`) | 7 | コンビニ納品の場面。A-LOGI も同じセンター・同じ店舗向けのため、そのまま使う |
| 6 | 手順書のサンプル(任意) | `seed-manuals.js`(`seedManuals`) | 5 | 見た目確認用(実ファイルなし)。不要なら投入しない。投入後に管理画面から個別に消せる |
| — | **周知のサンプルは投入しない** | `seed-announcements.js` | — | 季節もの(暑熱対策など)で、試行の最初の掲示にふさわしくないため。`seed.html` に周知のカードがあっても押さない |

- 2〜6 はいずれも管理者としてログインした状態で実行する(ルール上、管理者しか書き込めない)

**1. 管理者3件の作り方(最初の1件だけはルールの外で作る必要がある)**

`users` の作成はルール上「管理者だけ」なので、管理者が1人もいない最初の状態では `seed.html` から `users` を作れない。

1. 未ログインのまま ① を押す → Auth の `AAAAA`・`BBBBB`・`CCCCC` が作られる(`users` の作成は3件とも拒否される。正常)
2. **最初の1件 `users/AAAAA` だけ**を、ルールの外で作る(**どちらの方法にするかは南野さんの判断待ち**)
   - 案A: Claude Code が、このPCの firebase-tools のログイン(プロジェクトの所有者)で Firestore に1件だけ書き込む
   - 案B: 南野さんが Firestore コンソールで作る: コレクション `users` → ドキュメントID `AAAAA` → フィールド
     `name`(string)`管理者A`、`role`(string)`admin`、`team`(null)、`passwordChanged`(boolean)`false`
3. `seed.html` で `AAAAA` / パスワード `AAAAA` でログイン → ① をもう一度押す → `users/BBBBB`・`users/CCCCC` が作られる(`AAAAA` は同じ内容で上書き)
- 2・3・5・6 は固定のドキュメントIDで上書きするだけなので、2回押しても壊れない

### 4. 名簿CSV(`A-LOGI_乗務員コード一覧.csv`)について

**名簿はリポジトリに入れない**(このリポジトリは公開されている)。`seed-drivers-csv.js` の読み取り処理(`parseDriversCsv()`)を、
名簿と同じ形の**架空のデータ**で実行して確かめた結果(2026-10-14):

- **見出し行 `乗務員コード,氏名,区分` はそのまま読める。** 見出しから「乗務員コード」「氏名」の列位置を読み取り、「区分」の列は使わない。
  先頭の BOM、改行コード(CRLF/LF)、前後の空白、空行は問題ない
- **管理者を除外する基準は「区分」ではなく乗務員コード**(`AAAAA`/`BBBBB`/`CCCCC` の3つだけ)。
  - [ ] 名簿で区分が「管理者」の3行のコードが `AAAAA`/`BBBBB`/`CCCCC` であることを確かめる。
        **違うコード(例: 40000番台)だと、乗務員として登録されてしまう**(ドライランの「新規」に出る)
- [ ] コードはすべて**半角英数字5桁**であること(4桁などはドライランで「コード形式不正」として除外される)。研修用の `40000` も CSV に入れる
- [ ] **引用符(`"`)で囲まれていないこと。** Excel で引用符付きで保存すると、全行が「コード形式不正」になる
- [ ] **氏名にカンマ(`,`)が入っていないこと。** カンマがあると、氏名がそこで切れて登録される(エラーにならないので気づきにくい)
- [ ] **文字コードは UTF-8 で保存する**(Excel なら「CSV UTF-8(コンマ区切り)」)。`seed.html` はファイルを UTF-8 として読む
      (`file.text()`)ため、Shift_JIS のままだと氏名が文字化けする。ドライランの表で**氏名が正しく読めていること**を確かめてから本実行する
- 新規の乗務員は、Auth アカウント(初期パスワード=乗務員コード)と `users/{コード}`(`role: 'driver'`、`team: null`、`passwordChanged: false`)が作られる
- CSV に無い既存のコードには一切触らない(削除・無効化はしない)。すでに登録済みのコードは氏名だけ更新される

### 5. 通知設定を乗務員にも表示する(手作業)

`config/notifications` が無いと、ユーザーメニューの「通知設定」は管理者にしか表示されない(新しいプロジェクトには無い)。

- [ ] Firestore Database →「コレクションを開始」→ コレクションID `config` → ドキュメントID `notifications` →
      フィールド `openToAllUsers`、型 **boolean**、値 **true** で保存する

### 6. 投入後の確認

- [ ] `AAAAA` でログインできる。ヘッダーの版表記が `Ver.A-0.1.0`
- [ ] 乗務員マスタの人数が「CSV の行数 − 管理者3」と一致し、管理者3件が一覧に出ていない
- [ ] 班編成管理に「昼班」「夜班」の2つ。チャットのチャンネルが4つ(全体連絡・昼班・夜班・安全報告)
- [ ] KYT が7件(手順書のサンプルを入れた場合は手順書が5件)。周知は0件
- [ ] 管理者で手順書に PDF などを1つアップロードできる(Storage の権限の確認。済んだら消してよい)
- [ ] 乗務員コード(例: `40000`)と初期パスワード(=コード)でログインでき、ユーザーメニューに「通知設定」が出る

### 7. 終わったら

- [ ] **Authentication の「作成(サインアップ)を有効にする」をオフに戻す**(現行 README の事前確認と同じ)
- 管理者3件のパスワードは**初期値のまま運用する**(南野さんの判断、2026-10-14)。下の「管理者のパスワード」
- [ ] コピーした `seed.html` は、次に使うまでこのフォルダに置いたままでよい(コミットされない)。不要なら消す
- [ ] 乗務員への案内を配る(下)

### 管理者のパスワード

**初期値(乗務員コードと同じ)のまま運用する判断をした(南野さん、2026-10-14)。** 公開前の変更は必須手順にしない。

参考(変更する場合の手順): アプリに `AAAAA` でログイン → ユーザーメニュー →「プロフィール」→「パスワード変更」に新しいパスワードを2回入力 →「保存する」
(所属班は「選択してください」のままでよい)。`BBBBB`・`CCCCC` も同じ。変更後は `seed.html` の管理者ログインにも新しいパスワードを使う。

### 投入の実行記録(本番 `matomete-alogi`)

名簿の氏名はここには書かない(件数のみ)。名簿CSVはリポジトリに入れていない。

| # | 日時 | 作業 | 結果 |
|---|---|---|---|
| 1 | 2026-10-14 | 名簿CSVの確認(`seed-drivers-csv.js` の `parseDriversCsv()` で読み、件数だけを出力) | UTF-8(BOM付き)、データ33行: **新規30件**(研修用 `40000` を含む、`40000`〜`40094`)・**除外3件**(`AAAAA`/`BBBBB`/`CCCCC`)・**不正行0件**。文字化け・カンマ・引用符なし |
| 2 | 2026-10-14 | Authentication の設定を読み取り(Identity Toolkit 管理 API、所有者の権限) | サインアップは**有効**(新しいプロジェクトの初期値)、メール/パスワード有効、メールリンク無効 |
| 3 | 2026-10-14 | `users/AAAAA` を1件作成(所有者の権限で Firestore に書き込み。既にあれば失敗する方式) | `name: 管理者A`、`role: admin`、`team: null`、`passwordChanged: false` |
| 4 | 2026-10-14 | `config/notifications` を作成(同上) | `openToAllUsers: true` |
| 5 | 2026-10-14 | `seed.html` を `localhost:8000` で開き、表示だけ確認(ログイン・ボタン操作なし) | 接続先 `matomete-alogi`、未ログイン、ページのエラーなし |
| 6 | 2026-10-14 | サインアップを**無効**に変更(Claude Code が止まる前に必ずオフに戻す取り決め) | 変更前: 有効 → 変更後: 無効(読み取りで確認) |

| 7 | 2026-10-14 | (南野さんが `seed.html` で投入。Claude Code が `localhost:8000` でサーバーを起動し、終了後に停止) | — |
| 8 | 2026-10-14 | 投入結果の読み取り(Firestore・Auth・Auth の設定) | Auth アカウント **33件**(管理者3・乗務員30、`40000`〜`40094`、無効化0)。Firestore `users` **31件**(admin 1件=`AAAAA`・driver 30件)、**`users/BBBBB`・`users/CCCCC` が無い**。`teams` 2件、`channels` 4件(全体連絡・昼班・夜班・安全報告)、`kyt` 7件、`manuals` 5件、`announcements` 0件、`config/notifications` は `openToAllUsers: true` |
| 9 | 2026-10-14 | Authentication のサインアップ | 南野さんはオフに戻したと連絡したが、読み取りでは**有効のまま**だった → Claude Code が**無効**に変更し、読み取りで確認 |

| 10 | 2026-10-14 | `users/BBBBB`・`users/CCCCC` を作成(南野さんの了承のうえ、`users/AAAAA` と同じ方法・同じ内容。既にあれば失敗する方式) | 作成。`users` **33件**(admin 3・driver 30)を読み取りで確認。サインアップは無効のまま |

**投入は完了**(2026-10-14)。

**ここから先(① 管理者の Auth 作成、管理者でのログイン、③⑤⑦⑥、⑧ 乗務員の作成、乗務員でのログイン確認)は南野さんが行う。**
Claude Code は、本番のログイン画面へのパスワード入力と、本番の Auth へのアカウント作成を代わりに行わないため。

#### 南野さんが行う手順(本番)

1. Firebase コンソール → Authentication →「設定」→「ユーザーアクション」→「作成(サインアップ)を有効にする」を**オン**
2. このフォルダで `python -m http.server 8000` → ブラウザで `http://localhost:8000/seed.html`。上部が「接続先: matomete-alogi(A-LOGI)」であることを確認
3. **ログインする前に ①** を押す → ログに「Auth作成」が3件(`users` の作成は `AAAAA` 以外が拒否されるが正常)
4. `AAAAA` / `AAAAA` でログイン →「管理者としてログイン中: AAAAA」を確認 → **① をもう一度**(`users` 3/3 件作成)
5. ③ 班 → ⑤ チャンネル → ⑦ KYT → ⑥ 手順書サンプル(それぞれログの「完了」を確認)
6. ⑧ で名簿CSVを選び「ドライラン」→ **新規30件・除外3件(AAAAA/BBBBB/CCCCC)・不正行0件・氏名の文字化けなし**なら「承認して本実行」。違っていたら本実行しない
7. Authentication のサインアップを**オフ**に戻す
8. 終わったら Claude Code に連絡 → 件数・班・チャンネル・設定の確認を読み取りで行う。乗務員1名でのログイン確認は南野さんが行う

### 乗務員への案内(A-LOGI の管理者から伝える内容)

- アプリの URL(公開後: `https://hanyama54321-cyber.github.io/matomete-alogi/`)。ホーム画面に追加して使う
  (iPhone は iOS 16.4 以上で、ホーム画面から開いたときにプッシュ通知が使える)
- ログインは乗務員コード(5桁)と、初期パスワード(乗務員コードと同じ)
- **初回ログイン後、ユーザーメニューの「プロフィール」で自分の班(昼班・夜班)を選んで保存する。**
  選ぶまで所属班は「選択してください」のままで、保存できない。班を選ぶまで班のチャンネルには投稿できない
- 同じ「プロフィール」でパスワードを変える(5文字以上)
- 「通知設定」でプッシュ通知を受け取るかを選ぶ

## ステップ8: 公開

### 公開前の確認(2026-10-14、README のリリース手順「1. 事前確認」に準じる)

| 項目 | 結果 |
|---|---|
| ルールテスト(`emulators:exec --project matomete-alogi`) | 190件すべて pass |
| `index.html` のインラインスクリプトの構文 / Service Worker の構文 | エラーなし |
| CSS のルール数と並び | 派生元 v0.4.5 と同じ 335(値の変更と変数の追加のみで、構造は変えていない。ステップ4で確認、以後は CSS 変数の値と追加だけ) |
| `APP_VERSION` / `CHANGELOG` | `A-0.1.0` / A-0.1.0 の1件 |
| `BADGE_EPOCH` | 派生元から変更なし |
| 公開中のルール | Firestore・Storage とも、リポジトリの内容と一致(読み取りで比較) |
| Cloud Functions | 8関数とも `asia-northeast1`・`nodejs22` で稼働 |
| 承認済みドメイン | `hanyama54321-cyber.github.io` あり |
| サインアップ | 無効 |
| 初期データ | 管理者3・乗務員30・班2・チャンネル4・KYT 7・手順書5・周知0・`config/notifications` |
| リポジトリに入れてはいけないもの | 名簿CSV・`seed.html`・鍵ファイルは追跡されていない。HI-LINE の接続情報はコードに無い。名簿の氏名は追跡ファイルに含まれていない(テスト用の仮データに派生元からある一般的な姓が1つ一致するだけ) |
| `develop` → `main` のマージ | `main`(`51ecdb8`)は `develop` の祖先。`git merge-tree` でコンフリクトなし、マージ後の内容は `develop` と一致 |
| タグ `A-0.1.0` | まだ無い |
| 公開URL | 現在 404(Pages は未有効) |

### 公開の手順(南野さんの指示が出てから)

1. `develop` → `main` を `--no-ff` でマージして push する(初回なのでロールバック用タグは作らない。README 参照)
   ```
   git checkout main
   git pull --ff-only origin main
   git merge --no-ff --no-commit develop
   git diff --name-only --diff-filter=U      # 空であること
   git commit -m "Release A-0.1.0: A-LOGI版 初版"
   git diff develop main --stat               # 空であること
   git push origin main
   git tag -a A-0.1.0 -m "A-0.1.0: A-LOGI版 初版(安全配送まとめてアプリ v0.4.5 をもとに作成)"
   git push origin A-0.1.0
   git checkout develop
   ```
2. GitHub Pages を有効にする(**南野さんがブラウザで行う**。このPCには GitHub CLI が無い):
   リポジトリ `matomete-alogi` → Settings → Pages → Build and deployment → Source「Deploy from a branch」→ Branch `main` / `/ (root)` → Save
3. 公開後の確認
   - `https://hanyama54321-cyber.github.io/matomete-alogi/` が開き、版表記が `A-0.1.0`(反映まで30〜90秒)
   - コンソールにエラーがない、`hasFirebase` が `true`(診断画面: 版表記を3回タップ)
   - **HI-LINE版(`https://hanyama54321-cyber.github.io/matomete-app/`)が今までどおり動いている**
   - iOS 実機での確認(ホーム画面に追加、ログイン、通知)は南野さん

### 公開の記録

| # | 日時 | 作業 | 結果 |
|---|---|---|---|
| 1 | 2026-10-14 | `develop` → `main` を `--no-ff` でマージ(`1bfd52b`「Release A-0.1.0: A-LOGI版 初版」)、タグ `A-0.1.0` を作成して push | コンフリクトなし、マージ後の `main` は `develop` と一致。初回のためロールバック用タグは作っていない |
| 2 | 2026-10-14 | 南野さんが GitHub Pages を有効化(`main` / root) | — |
| 3 | 2026-10-14 | 公開後の確認(Claude Code、ログインなし) | 公開URLが開き版表記 `A-0.1.0`、接続先 `matomete-alogi`、`hasFirebase` true、コンソールエラー・失敗した通信なし。`manifest.json`・SW・アイコンを配信、`seed.html` は 404。HI-LINE版 `/matomete-app/` は HTTP で取得して 200・`0.4.5` のまま(HI-LINE 側のスクリプトは実行していない) |
| 4 | 2026-10-15 | 南野さんの実機確認 | 管理者(PC)・乗務員・iPhone(ホーム画面追加、全画面表示、ログイン、プッシュ通知)すべてOK。**Android は未実施**。テスト用のお知らせ・報告・チャットは削除済み |

**ステップ8は完了(2026-10-15)。** これで作成指示書のステップ1〜8はすべて済んだ。

## 公開後の修正(A-0.1.1 として 2026-10-15 に公開済み)

### 2026-10-15 南野さんの依頼

**コードの変更**(`d232454`、エミュレーターで確認済み)

- **チャットのメンバー(管理者)**: 仮データ(乗務員A〜L)をやめ、Firestore の `users` から表示する。管理者がチャットタブを開いたときに1回だけ取得し、
  ログアウトでクリア(`fetchChatDirectory()`。`users` の一覧読み取りはルール上 admin 限定で、ルールは変えていない)。氏名はコードに持たない
  - 全体連絡・安全報告は全員、班チャンネルは `users.team` が一致する人。保守用の `AAAAA`/`BBBBB`/`CCCCC` は含めない
  - `role: admin` の乗務員は含め、一覧で「管理者」の印を付ける
  - 「発言あり」の判定は名前ではなく乗務員コード(`senderUid`)
- **「最終投稿」**(チャットの管理者用カード、ここ1か所だけ): 今年なら `10/15 14:32`、年が違えば `2025/12/31 14:32`(`fmtLastPostDateTime()`)。
  各メッセージの時刻・通知センターの相対表示・報告の日付は変えていない
- **乗務員向けの「● オンライン 5名」を削除**(固定の文字だった。オンライン状態を記録する仕組みは無い)
- **ゲームタブ(管理者)**: 仮データの公開通知の登録状況とモックの「全員に公開告知を送る」を削除し、
  「公開通知の登録状況は、ゲーム公開後に表示されます。」に置き換えた(公開通知の登録は保存の仕組みがまだ無い)
- 仮データの `users` 配列、それに依存した班人数の計算(画面には出ていなかった)・`getUser()`・`getTargetDrivers()` を削除

**本番データの変更**(所有者の権限で Firestore に書き込み。前後を読み取りで確認。出力はコードと件数のみ)

| # | 変更 | 前 | 後 |
|---|---|---|---|
| 1 | 乗務員30名(`40000`〜`40094`)の `team` を `team_a`(昼班)に | 30件とも `team: null` | 30件とも `team_a`(変更30件) |
| 2 | 7名(`40001`,`40002`,`40005`,`40019`,`40022`,`40037`,`40057`)の `role` を `admin` に | 7件とも `driver` | 7件とも `admin`(変更7件) |

変更後の `users`(33件): `driver/team_a` 23件、`admin/team_a` 8件(上の7名と `AAAAA`)、`admin/null` 2件(`BBBBB`,`CCCCC`)。

- **`AAAAA` の `team` は、今回の作業の前から `team_a` だった**(投入時は `null`。実機確認などでプロフィールから昼班が保存された可能性がある)。
  指示の範囲外なので変えていない
- 夜班の人は各自プロフィールで「夜班」に変える運用
- `AAAAA` の `team` は南野さんが実機確認のときにプロフィールから昼班を保存したもの(不具合ではない)。南野さんの指示で **`null` に戻した**(2026-10-15、所有者の権限、前後を読み取りで確認: `admin/null` が `AAAAA`,`BBBBB`,`CCCCC` の3件になった)
- **admin にした7名の影響(南野さんが了承済み)**: 管理者の画面だけになり、乗務員としての機能(必読の確認・KYT・報告の投稿)は使えない。
  匿名を含む全報告と管理者間のメモが見える。既読率・到達率・KYT 進捗の母数から外れる。必読のお知らせ・手順書追加・未読リマインダーの
  通知は届かず、新着報告の通知が届く。乗務員マスタには残る。ほかの人の権限を変えられる(自分の権限は変えられない)
- **パスワード**: この7名も初期値(乗務員コードと同じ)のままとする(**南野さんの判断、2026-10-15**)。初回ログイン時のパスワード変更は
  強制されない(`passwordChanged` は記録されるだけ)

### A-0.1.1 の公開の記録

| # | 日時 | 作業 | 結果 |
|---|---|---|---|
| 1 | 2026-10-15 | `users/AAAAA` の `team` を `null` に戻す(南野さんの指示) | 前後を読み取りで確認(上の「本番データの変更」) |
| 2 | 2026-10-15 | `APP_VERSION` と `CHANGELOG` を `A-0.1.1` に(`f8eccf3`) | — |
| 3 | 2026-10-15 | 事前確認 | ルールテスト190件 pass。`BADGE_EPOCH`・`<style>`・ルール・関数・設定ファイルは A-0.1.0 から変更なし。公開中のルールはリポジトリと一致。サインアップ無効、承認済みドメインあり |
| 4 | 2026-10-15 | ロールバック用タグ `A-0.1.0-pre-chat-members` をマージ前の `main` 先端(`1bfd52b`)に作成して push | — |
| 5 | 2026-10-15 | `develop` → `main` を `--no-ff` でマージ(`0020206`「Release A-0.1.1」)、タグ `A-0.1.1` を作成して push | コンフリクトなし、マージ後の `main` は `develop` と一致 |
| 6 | 2026-10-15 | 公開後の確認(Claude Code、ログインなし) | push から約1分で反映。版表記 `A-0.1.1`、接続先 `matomete-alogi`、コンソールエラー・失敗した通信なし。撤去した表示・仮データが配信内容に無いことを確認。`seed.html` は 404。HI-LINE版 `/matomete-app/` は HTTP で取得して 200(版表記 `0.4.6`。南野さんの側の更新) |
| 7 | 2026-10-15 | 南野さんの実機確認 | チェックリストすべてOK。チャットのメンバー数は全体連絡・安全報告・昼班とも30人、夜班0人 |

**A-0.1.1 の公開は完了(2026-10-15)。** 切り戻す場合はロールバック用タグ `A-0.1.0-pre-chat-members` を起点にする(README の手順7。force push はしない)。

## A-0.1.2 の変更(2026-10-15)

| コミット | 内容 |
|---|---|
| `72c2793` | 周知の一覧で、本文を2行まで表示(2行を超える分は「…」。本文中の改行は一覧では詰めて表示。詳細画面は変えていない) |
| `defae74` | お知らせのタイトル・本文・タグ・対象の班名・検索語を、HTML ではなく文字として表示(一覧・検索の強調表示・詳細・関連するお知らせ・編集画面の初期値・削除/配信の確認・到達率) |
| `4bd0497` | KYT の編集画面で、タイトル・説明・選択肢の初期値を文字として埋め込む(説明は `</textarea>` で入力欄を抜け出せた。`&amp;` などが編集時に変わる問題も解消) |
| `9ee6e82` | 手順書の既読状況の班名、手順書のカテゴリと KYT の難易度のタグ、氏名の先頭1文字のアイコンを文字として埋め込む |

いずれも見た目は変えていない。エミュレーターで、各入力に `<b>`・`<img src=x onerror=alert()>`・`<script>`・`</textarea>` を入れ、
文字のまま表示され、要素が作られず、ダイアログが出ないことを確認した。KYT は開いて保存しても文字列が変わらないことを確認した。

### A-0.1.2 の公開の記録

| # | 日時 | 作業 | 結果 |
|---|---|---|---|
| 1 | 2026-10-15 | `APP_VERSION` と `CHANGELOG` を `A-0.1.2` に(`a20a14e`) | — |
| 2 | 2026-10-15 | 事前確認 | ルールテスト190件 pass。`BADGE_EPOCH`・`<style>`・ルール・関数・設定ファイルは A-0.1.1 から変更なし。公開中のルールはリポジトリと一致。サインアップ無効 |
| 3 | 2026-10-15 | ロールバック用タグ `A-0.1.1-pre-escape` をマージ前の `main` 先端(`0020206`)に作成して push | — |
| 4 | 2026-10-15 | `develop` → `main` を `--no-ff` でマージ(`770dc87`「Release A-0.1.2」)、タグ `A-0.1.2` を作成して push | コンフリクトなし、マージ後の `main` は `develop` と一致 |
| 5 | 2026-10-15 | 公開後の確認(Claude Code、ログインなし) | push から約1分で反映。版表記 `A-0.1.2`、接続先 `matomete-alogi`、コンソールエラー・失敗した通信なし。配信中のページに今回の修正が入っていることを確認。`seed.html` は 404。HI-LINE版 `/matomete-app/` は HTTP で取得して 200・`0.4.6` |
| 6 | 2026-10-15 | 南野さんの実機確認 | チェックリストすべてOK(2行表示、詳細の全文表示、検索の強調表示、各画面の見た目、KYT を開いて保存しても内容が変わらない、記号を入れたお知らせが文字のまま表示される、版表記)。テスト用のお知らせは削除済み |

**A-0.1.2 の公開は完了(2026-10-15)。** 切り戻す場合はロールバック用タグ `A-0.1.1-pre-escape` を起点にする(README の手順7。force push はしない)。

**利用者の入力を画面に埋め込むときは、必ず `escHtml()` を通すこと**(チャット・報告・手順書・KYT・乗務員マスタ・お知らせは、
2026-10-15 時点ですべて通している。`confirm()`・`showToast()`・`textContent` は文字として扱われるので不要)。

## A-0.1.3 の変更(2026-10-15): #安全報告 を廃止し、管理者専用の #管理者 に

`4dff04a`。チャンネルは「全体連絡(`general`)・昼班(`team_a`)・夜班(`team_b`)・管理者(`admin`)」の4つ。

- **#管理者**(ID・`teamId` とも `admin`): 管理者(`role: admin`)専用。管理者だけにボタンが出て、読み・投稿できる。
  保守用の `AAAAA`/`BBBBB`/`CCCCC` も読み・投稿できるが、メンバー一覧には出さない(メンバーは role=admin の乗務員7名)
- **firestore.rules**: `teamId: 'admin'` のチャンネル文書の取得・一覧と、そのメッセージの読み取りを管理者だけにした
  (`channelReadable()`。文書の `lastMessage` に本文の一部が入るため文書自体も読ませない)。投稿は従来のルールのまま
  (`users.team` に `admin` は入らないため乗務員は不可)
- **乗務員のチャンネル一覧**は `where('teamId', '!=', 'admin')` の条件付きで購読する(条件なしで全件を取るとルールで拒否される)
- 新着の対象(`BADGE_CHANNEL_IDS`)は `general`・`team_a`・`team_b`・`admin`。廃止したチャンネルの文書が残っていても新着にしない。
  **一度も開いていないチャンネルは、利用開始の時点(`state/badges.since`)を基準に新着を判定する**
- ルールテスト 190 → **198件**(#管理者 の7件を追加、乗務員の一覧のテストを「条件付きなら取れる/条件なしは拒否」の2件に)

**本番データの変更**(所有者の権限。前後を読み取りで確認、本文は出力していない)

| 変更 | 前 | 後 |
|---|---|---|
| `channels/admin` を作成(`name: 管理者`、`teamId: admin`) | なし | あり(メッセージ0件) |
| `channels/safety` と、そのメッセージ1件(南野さんの実機確認のテスト投稿、2026-10-15 13:07)を削除 | あり(1件) | なし |

**反映の順番**: 本番データ → アプリの公開(A-0.1.3)→ Firestore のルールの公開。ルールを先に公開すると、A-0.1.2 の乗務員の
チャンネル一覧(条件なし)が拒否されるため。アプリ公開からルール公開までの数分は #管理者 がルールで守られないが、#管理者 は空のため影響なし。

### A-0.1.3 の公開の記録

| # | 日時 | 作業 | 結果 |
|---|---|---|---|
| 1 | 2026-10-15 23:39 | 本番データ: `channels/admin` を作成、`channels/safety` とテスト投稿1件を削除(所有者の権限) | 前後を読み取りで確認(上の表) |
| 2 | 2026-10-15 | `APP_VERSION` と `CHANGELOG` を `A-0.1.3` に(`d64d58a`)。事前確認 | ルールテスト198件 pass。`BADGE_EPOCH`・`<style>` は A-0.1.2 から変更なし。サインアップ無効 |
| 3 | 2026-10-15 | ロールバック用タグ `A-0.1.2-pre-admin-channel` をマージ前の `main` 先端(`770dc87`)に作成して push | — |
| 4 | 2026-10-15 23:40 | `develop` → `main` を `--no-ff` でマージ(`15f483f`「Release A-0.1.3」)、タグ `A-0.1.3` を作成して push | コンフリクトなし、マージ後の `main` は `develop` と一致。23:41:46 に Pages へ反映 |
| 5 | 2026-10-15 23:41 | 宛先 `matomete-alogi` を表示 → `firebase deploy --only firestore:rules --project matomete-alogi --dry-run` → 本番 | 公開。公開中の Firestore・Storage のルールがリポジトリと一致することを読み取りで確認 |
| 6 | 2026-10-15 | 公開後の確認(Claude Code、ログインなし) | 版表記 `A-0.1.3`、接続先 `matomete-alogi`、コンソールエラー・失敗した通信なし。#安全報告 のボタンなし。未ログインでの `channels/admin` の読み取りは拒否。`seed.html` は 404。HI-LINE版 `/matomete-app/` は HTTP で取得して 200・`0.4.7`(南野さんの側の更新) |
| 7 | 2026-10-16 | 南野さんの実機確認 | 乗務員(`40000`)・保守用(`AAAAA`)はチェックリストどおりOK。**admin にした乗務員での確認は未実施**(保守用 `AAAAA` での確認で代えた。南野さんの判断、2026-10-16)。テスト投稿は削除済み |

**A-0.1.3 の公開は完了。** 切り戻す場合はロールバック用タグ `A-0.1.2-pre-admin-channel` を起点にする。
ルールも切り戻す場合は、ロールバック用タグの `firestore.rules` を `--project matomete-alogi` でデプロイする
(アプリだけ戻してルールを戻さないと、A-0.1.2 の乗務員のチャンネル一覧がルールで拒否される)。

## パスワードを初期値に戻す機能(保守用の管理者のみ、A-0.1.4 として 2026-10-16 公開)

- **保守用の管理者(`AAAAA`/`BBBBB`/`CCCCC`)だけ**が、乗務員マスタの各行の「🔑 パスワードを初期値に戻す」から、ほかの利用者の
  パスワードを初期値(乗務員コードと同じ)に戻せる。保守用の管理者どうしも互いに戻せる(自分自身は不可。プロフィールから変更する)。
  `passwordChanged` は `false` に戻る。実行前に「○○(コード)のパスワードを初期値に戻します」の確認を出す
- **権限の判定は role ではなくコード**で、Cloud Functions の呼び出し型の関数 `resetUserPassword`(`functions/callable/resetUserPassword.js`)で行う。
  admin にした乗務員・一般の乗務員にはボタンを出さず、関数を直接呼んでも `permission-denied` になる
- **記録**: `passwordResets/{自動ID}` に `targetCode`・`byCode`・`at` を残す(書くのは関数だけ)。読めるのは保守用の管理者だけ(`firestore.rules` の
  `isMaintenance()`)。乗務員マスタの下に新しい順に30件を表示する
- 保守用のコードは3か所で一致させる: `index.html` の `MASTER_EXCLUDED_CODES`、`functions/lib/constants.js` の `MAINTENANCE_CODES`、`firestore.rules` の `isMaintenance()`
- **外部メンテナンス用アカウント(`AAAAA`/`BBBBB`/`CCCCC`)の扱いを見直す際には、この権限(パスワードを初期値に戻す権限)も見直す前提**(南野さんの指示、2026-10-16)

### AAAAA のアカウントの作り直し(2026-10-16)

`AAAAA` が初期パスワードでログインできなくなっていたため(パスワードは 2026/10/15 23:04:29 に変更されていた)、南野さんが Firebase コンソールで
Auth アカウントを削除して作り直した(コンソールではパスワードを直接書き換えられないため)。Claude Code は本番のパスワードを設定していない。
作り直し後のパスワード最終更新は **2026/10/16 15:14:41**。`users/AAAAA`(Firestore)はそのまま使われている
(アプリは Auth の UID ではなくメールの@より前=コードで利用者を判断するため)。

### A-0.1.4 の公開の記録

| # | 日時 | 作業 | 結果 |
|---|---|---|---|
| 1 | 2026-10-16 15:17 | 宛先 `matomete-alogi` を表示 → `firebase deploy --only functions:resetUserPassword --project matomete-alogi`(dry-run のあと本番) | 作成(`asia-northeast1`・`nodejs22`)。関数は計9つ。IAM の比較: 追加0件・削除0件 |
| 2 | 2026-10-16 15:19 | ルールテスト(204件 pass)→ 宛先を表示 → `firebase deploy --only firestore:rules --project matomete-alogi`(dry-run のあと本番) | 公開。公開中のルールがリポジトリと一致することを読み取りで確認 |
| 3 | 2026-10-16 | `APP_VERSION` と `CHANGELOG` を `A-0.1.4` に。ロールバック用タグ `A-0.1.3-pre-password-reset`(マージ前の `main` 先端 `15f483f`)→ `--no-ff` マージ(`595c2ac`)→ タグ `A-0.1.4` | 公開済み |
| 4 | 2026-10-27 | 南野さんの実機確認(A-0.1.5 の確認と同時) | 問題なし。保守用の管理者でログインして確認。**admin にした乗務員・一般の乗務員での確認は未実施** |

## A-0.1.5 の変更(2026-10-27 公開)

南野さんの依頼(2026-10-27)。決まったこと(南野さんの回答):

- **周知のカテゴリをやめ、タグのボタンにした。** 投稿・編集画面のカテゴリ欄と自由入力のタグ欄をなくし、
  「安全」「業務」「設備」「その他」「センター」の5つのボタン(この順。`index.html` の `ANN_TAGS`)を複数選べるようにした。
  選択中は `--primary` の塗りと ✓。新規投稿は「安全」を選んだ状態で開く
- 保存先は `announcements.tags`(例: `["安全","設備"]`。ボタンの順に並べる)。**新しい投稿・更新では `category` を書かない**(既存の値は消さない。データの移行はしない)
- **タグを1つも選ばずに投稿すると「安全」を付ける**(南野さんの判断)
- **表示するのは5語だけ。** 5語が1つもない投稿(`category` だけの旧投稿)はカテゴリ名を出す(`annDisplayTags()`)。
  A-0.1.4 までの自由入力のタグ(5語以外)は**表示しないがデータには残し、編集して保存しても消さない**(南野さんの判断。本番では15件中8件が持つ、2026-10-27 時点)
- 編集画面は保存済みの5語を選んだ状態で開く(既定の「安全」で上書きしない)。5語が1つもない旧投稿は、画面に出ているカテゴリと同じ語を選んだ状態で開く
  (安全→安全・業務→業務・設備→設備・その他→その他。`人事` に当たる語はないため何も選ばれず、そのまま保存すると「安全」が付く。本番に `人事` の投稿はない)
- 一覧・詳細はタグを小さなバッジで出す。**タップで同じタグのお知らせを表示する機能と、詳細の「関連するお知らせ」は5語のまま残した**(南野さんの判断)。
  検索・既読CSV(「カテゴリ」列 →「タグ」列)も表示と同じ値を使う
- Firestore のルールは周知のタグを制限していないため変更なし
- 一括投稿ツール(`matomete-broadcast`)はこのPCにないため未確認。`category` だけで投稿していても画面にはカテゴリ名が出るが、
  ツール側も `tags` に5語を入れる形に合わせること
- **チャット: 管理者(`role: admin`。保守用 `AAAAA`/`BBBBB`/`CCCCC` を含む)はログインのたびに「管理者」チャンネルから開き、チップも先頭に出す。**
  最後に開いたチャンネルを覚える仕組みはない(ログイン中にタブを切り替えた場合は直前のチャンネルのまま)。管理者以外は従来どおり「全体連絡」から。
  `#管理者` のルールは変更なし

**確認(エミュレーター `demo-alogi`)**: 新規投稿(安全+設備 → `["安全","設備"]`、`category` なし。0個 → `["安全"]`)、既存投稿の編集
(5語を持つ投稿は保存済みのまま開き、変更なく保存。自由タグ「シフト」+`work` の投稿 → 「業務」を選んだ状態で開き、センターを足すと
`["業務","センター","シフト"]`、`category` は残る)、カテゴリだけの旧投稿(一覧に「安全」「設備」「人事」などカテゴリ名を表示)、
記号入りの旧タグが動かないこと。チャット: `AAAAA`・admin にした乗務員は「管理者」から、乗務員は「全体連絡」から開き、乗務員は `#管理者` の文書・メッセージとも `permission-denied`。
ルールテスト 204件 pass(変更なし)。

### A-0.1.5 の公開の記録

| # | 日時 | 作業 | 結果 |
|---|---|---|---|
| 1 | 2026-10-27 | 事前確認 | ルールテスト204件 pass。`BADGE_EPOCH` は変更なし。ルール・関数の変更なし(デプロイなし)。名簿・`seed.html`・鍵ファイルは追跡されていない |
| 2 | 2026-10-27 | ロールバック用タグ `A-0.1.4-pre-ann-tags` をマージ前の `main` 先端(`595c2ac`)に作成して push | — |
| 3 | 2026-10-27 23:15 | `develop`(`fcebab5`)→ `main` を `--no-ff` でマージ(`2d22782`「Release A-0.1.5」)、タグ `A-0.1.5` を作成して push | コンフリクトなし、マージ後の `main` は `develop` と一致。23:17 に Pages へ反映 |
| 4 | 2026-10-27 23:17 | 公開後の確認(Claude Code、ログインなし) | 版表記 `Ver.A-0.1.5`、接続先 `matomete-alogi`、コンソールエラー・失敗した通信なし |
| 5 | 2026-10-27 | 南野さんの実機確認 | 問題なし。保守用の管理者でログインして確認。**admin にした乗務員・一般の乗務員での確認は未実施**(この2つの画面はエミュレーターでの確認のみ)。確認後の本番の周知は15件で確認前と同じ(`category` のない投稿=A-0.1.5 で作った投稿は0件。読み取りで件数のみ確認) |

**A-0.1.5 の公開は完了。** **切り戻す場合**はロールバック用タグ `A-0.1.4-pre-ann-tags` を起点にする(ルール・関数は変えていないため、アプリだけ戻せばよい)。
A-0.1.5 で保存した投稿は `category` を持たず `tags` だけになるが、A-0.1.4 はカテゴリがない投稿を「その他」と表示し、
`tags` は自由タグとして表示するため、表示が崩れることはない。**ただし A-0.1.4 で A-0.1.5 の投稿を編集するときは、カテゴリを1つ選んでから保存すること**
(A-0.1.4 は選ばれていないカテゴリを `undefined` のまま送るため、Firestore に拒否されて「保存に失敗しました」になる)。

## A-0.1.6 の変更(2026-10-29 公開): 周知への画像添付

南野さんの依頼(2026-10-29)。HI-LINE版 v0.5(`hanyama54321-cyber/matomete-app` タグ `v0.5` = `7480b3a`。`v0.4.9` からの差分)の
「周知への画像添付」を**手で移植**した(cherry-pick は使っていない)。設計の詳細は [TECH_DEBT.md](TECH_DEBT.md) 項目20。

- 1件につき最大3枚。選んだ時点で端末側で縮小(長辺1600px・JPEG品質0.8、EXIF の向きを反映)。読めない画像(HEIC のまま等)はその1枚だけ除く
- 詳細画面の本文のすぐ下(必読確認の上)に表示。タップで全画面表示(ピンチ・ダブルタップ・🔍で拡大、左右スワイプ・‹ ›、「1 / 3」、✕・Esc・戻る操作で閉じる)
- 一覧のタイトル横に 🖼
- 保存の順序: ID を先に確保 → 画像をすべてアップロード → Firestore に1回だけ書く(必読の通知を受けて開いたときに画像が無い状態を作らない)。
  必読の送信確認でキャンセル(✕・キャンセル)したら、先に上げた画像を消す。保存に失敗したら、その保存で上げた画像を消す
- 編集で取り除いた画像は、Firestore の更新が成功してから Storage から消す。**お知らせを削除すると添付画像も Storage から消す**(HI-LINE と同じ。
  Storage の削除に失敗しても Firestore の削除は続ける)
- Storage: `announcements/{お知らせID}/{ランダムなID}.jpg`(元のファイル名は使わない)。閲覧=ログイン済み全員、書き込み=admin のみ・5MB未満・`image/*`、削除=admin のみ
- Firestore: `announcements.images = [{ url, path, w, h }]`(任意・最大3件。**firestore.rules で配列かつ3件以下に制限**。持たない書き込みは従来どおり通る)
- **HI-LINE との違い**: 編集画面の画像の削除ボタンの色(HI-LINE の濃紺 → A-LOGI の `--navy` #3A0A12)と版の表記だけ。画像欄は本文の下・タグの上(HI-LINE と同じ位置)。
  A-0.1.5 のタグボタンはそのまま(画像の有無とタグは独立)
- 一括投稿ツール(`matomete-broadcast`)は `images` を送らなくてよい。将来画像に対応する場合は、パスと `images` の形式を合わせること

**移植しなかったもの**: HI-LINE v0.5.1 以降(確認済ボタン・周知まとめの印刷など)、`周知まとめ` の見本 HTML(v0.5.1 の準備)、HI-LINE の HANDOFF・TECH_DEBT の文章(要点だけ A-LOGI の文書に書いた)。
v0.4.6〜v0.4.9 の修正(モック人員の撤去・Node.js 22・管理者専用チャンネル・記号のエスケープ)は A-LOGI では A-0.1.1〜A-0.1.3 で別に対応済み。

**ルールテスト**: 204件 → **216件、全 pass**(Firestore の `images` 6件・Storage の `announcements/` 6件を追加)。

**エミュレーターでの確認**(`demo-alogi`、Auth・Firestore・Storage): 新規投稿に2枚(4000×3000 の PNG 10MB → 1600×1200・37KB、900×1600 はそのまま)、
タグ(安全+設備)と一緒に保存され `category` は書かれない、読めないファイルは除外、上限3枚、一覧の 🖼、詳細で本文の直後に表示、
全画面(1 / 2、›、右スワイプで前へ、🔍で2.5倍、✕で閉じた後もページ倍率1)、必読+画像の送信確認の時点では Firestore 未書き込み・
キャンセルで Storage の画像も消える、送信すると乗務員の画面で必読確認の上に画像、編集で1枚取り除き1枚足す → 取り除いた分が Storage から消える、
画像のない旧投稿(詳細に枠が出ない・編集して保存しても `images` が増えない)、記号入りの url が HTML として解釈されない、
削除で Storage の画像も消える、乗務員は画像を上げられない(`storage/unauthorized`)。

**公開の順番**: ルールのデプロイ(Storage・Firestore)→ `main` へのマージ(南野さんの指示、2026-10-29。Firestore のルールも含める)。
どちらのルールも、`images` を持たない A-0.1.5 の書き込みはそのまま通す。

### A-0.1.6 の公開の記録

| # | 日時 | 作業 | 結果 |
|---|---|---|---|
| 1 | 2026-10-29 | 事前確認 | ルールテスト216件 pass(`a227cd6`)。IAM のロールと付与先の組 26件を保存 |
| 2 | 2026-10-29 | ロールバック用タグ `A-0.1.5-pre-images` をマージ前の `main` 先端(`2d22782`)に作成して push | — |
| 3 | 2026-10-29 23:28 | 宛先 `matomete-alogi`・対象 `storage` を表示 → `firebase deploy --only storage --project matomete-alogi`(dry-run のあと本番) | 公開(`storage.rules` に `announcements/` を追加) |
| 4 | 2026-10-29 23:29 | 宛先 `matomete-alogi`・対象 `firestore:rules` を表示 → `firebase deploy --only firestore:rules --project matomete-alogi`(dry-run のあと本番) | 公開(`announcements.images` は配列・3件以下)。公開中の Firestore・Storage のルールがリポジトリと一致することを読み取りで確認。IAM の比較: 26件 → 26件(追加0・削除0) |
| 5 | 2026-10-29 23:29 | `develop`(`a227cd6`)→ `main` を `--no-ff` でマージ(`d851b87`「Release A-0.1.6」)、タグ `A-0.1.6` を作成して push | コンフリクトなし、マージ後の `main` は `develop` と一致。23:30 に Pages へ反映 |
| 6 | 2026-10-29 23:30 | 公開後の確認(Claude Code、ログインなし) | 版表記 `Ver.A-0.1.6`、接続先 `matomete-alogi`、コンソールエラー・失敗した通信なし |
| 7 | 2026-10-29 | 南野さんの実機確認 | 問題なし。画像付きの投稿・本文の下への表示・全画面表示と拡大・削除まで確認 |

**A-0.1.6 の公開は完了。** **切り戻す場合**はロールバック用タグ `A-0.1.5-pre-images` を起点にアプリ(`main`)だけを戻す。**ルールは戻さなくてよい**:
A-0.1.6 のルールは `images` を持たない書き込みを従来どおり通すため、A-0.1.5 はそのまま動く。A-0.1.6 で画像を付けた投稿は、A-0.1.5 では
画像が表示されないだけ(編集して保存しても `images` は残り、ルールの3件以下も満たす)。ただし A-0.1.5 でその投稿を削除すると、
画像は Storage に残る(A-0.1.5 は画像を消さないため。画面には出ず、容量だけの問題)。

## コミット時の運用ルール

- 作業開始時は必ず `git branch` で `develop` にいることを確認する
- コミットは作業のまとまりごとに分ける(例:「パス・名称の差し替え」と「配色の変更」を1つにしない)
- コミット前に `git status` で意図しない差分がないか確認する。`.claude/` と `seed.html` はコミットしない
- **`main` へのマージ・タグ付け・Pages の有効化は、南野さんの指示が出てから行う**
- リリースを確定と言われたら、実機確認の結果報告があるまで `develop` に変更を積まない(本番に入っているものを一意に保つため)

## 既知の技術的負債

[TECH_DEBT.md](TECH_DEBT.md) を参照(HI-LINE版 v0.4.5 時点の記録をそのまま引き継いでいる)。A-LOGI版でも当てはまる主なもの:

- **ゲームタブ**は「近日公開」のプレースホルダーのみ
- ~~モック`users`配列~~ → 2026-10-15 に撤去(下の「公開後の修正」)。チャットのメンバーは Firestore の `users` から表示する
- **乗務員マスタからの個別登録は Auth アカウントを作らない**(項目2b)。ログインできるアカウントの作成は `seed.html` の CSV 投入で行う
- **周知の予約配信は自動公開されない**(項目4。管理者の「今すぐ配信」のみ)
