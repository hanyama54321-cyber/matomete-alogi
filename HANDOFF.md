# 引き継ぎ書 — A-LOGI版(2026-10-14時点)

新しいセッションで作業を再開する際は、まずこのファイルと [README.md](README.md)・[TECH_DEBT.md](TECH_DEBT.md) を読んでください。

## このリポジトリについて

- **リポジトリ**: `hanyama54321-cyber/matomete-alogi`(**public**)。協力会社 A-LOGI 専用の「安全配送まとめてアプリ」。
- **派生元**: HI-LINE版 `hanyama54321-cyber/matomete-app` のタグ `v0.4.5`(`34f32c5`)。**履歴は引き継いでいない**(最初のコミットに出どころを記録)。v0.4.5 までの開発経緯・設計判断の詳細は matomete-app 側の `HANDOFF.md` / `TECH_DEBT.md` を参照。
- **構成**: 単一ファイルSPA([index.html](index.html))+ Firebase(Firestore / Auth / Storage / Cloud Functions / FCM)。機能は v0.4.5 と同一。
- **公開URL**: `https://hanyama54321-cyber.github.io/matomete-alogi/`(GitHub Pages、`main` のルート)
- **ブランチ運用**: `main`=公開、`develop`=開発。`develop`→`main` は `--no-ff`。**force push しない**(手順は [README.md](README.md))。
- **版番号**: `A-x.y.z`(HI-LINE版の `v0.x.y` とは別系統)。現在 `A-0.1.1`(2026-10-15 公開。`A-0.1.0` は 2026-10-14 公開、タグ `A-0.1.0` → `1bfd52b`)。
- **目的**: A-LOGI での期間限定の試行。新機能の追加や UI の作り直しはしない。

### HI-LINE版との違い(これ以外は同じ)

| 項目 | HI-LINE版 | A-LOGI版 |
|---|---|---|
| 配信パス | `/matomete-app/` | `/matomete-alogi/` |
| Firebase | `anzen-matomete-app` | A-LOGI 専用の新規プロジェクト(**未接続。下記**) |
| ブラウザ保存領域のキー | `fbFcmTokenId` / `fbMyAnonReportIds` | `alogi_` を先頭に付けたもの |
| 班 | 9班(`team_a`〜`team_i`) | 昼班・夜班の2班(`team_a`・`team_b`)。班長名は持たない |
| チャットのチャンネル | 11 | 全体連絡・昼班・夜班・安全報告の4つ |
| 配色・アイコン | 青基調・H | 赤基調・A |
| タグライン「未来を、共に。」 | あり | 使わない(削除済み) |
| 新着マーク(ベル・タブ) | 赤 `#FF3B30`・白リング | 黄 `#FFD54F`・濃色リング `#3A0A12` |
| 周知の未読ドット | `--primary`(青) | `--navy`(ダークワイン `#3A0A12`) |
| カテゴリ「業務」・KYT難易度「中」の色 | `--primary` | `--amber`(琥珀色。A-LOGI版で追加した変数) |
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
