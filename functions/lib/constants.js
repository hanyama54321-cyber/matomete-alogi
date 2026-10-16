const REGION = 'asia-northeast1';

// 想定利用者数(数十名規模)に対して十分な余裕を持たせつつ、暴走時の被害を有限にする上限
const MAX_INSTANCES_TRIGGER = 10;
const MAX_INSTANCES_CALLABLE = 5;
const MAX_INSTANCES_SCHEDULED = 1;

// users/{code}.notifyPrefs のキー。firestore.rules の validNotifyPrefs() と一致させること
const NOTIFY_PREF_KEYS = {
  MUST_READ_ANNOUNCEMENT: 'mustReadAnnouncement',
  UNREAD_REMINDER: 'unreadReminder',
  MANUAL_ADDED: 'manualAdded',
  REPORT_REPLY: 'reportReply',
  NEW_REPORT_ADMIN: 'newReportAdmin',
};

// 長期未使用トークンの掃除しきい値(日数)
const STALE_TOKEN_DAYS = 180;

// 保守用の管理者コード(外部メンテナンス用)。パスワードを初期値に戻す権限はこのコードだけに与える。
// index.html の MASTER_EXCLUDED_CODES、firestore.rules の isMaintenance() と一致させること
const MAINTENANCE_CODES = ['AAAAA', 'BBBBB', 'CCCCC'];

// ログインの疑似メールのドメインと、パスワードに付ける文字。index.html の AUTH_EMAIL_DOMAIN / AUTH_PW_SUFFIX と一致させること
const AUTH_EMAIL_DOMAIN = '@matomete.local';
const AUTH_PW_SUFFIX = '_mtm';

module.exports = {
  REGION,
  MAX_INSTANCES_TRIGGER,
  MAX_INSTANCES_CALLABLE,
  MAX_INSTANCES_SCHEDULED,
  NOTIFY_PREF_KEYS,
  STALE_TOKEN_DAYS,
  MAINTENANCE_CODES,
  AUTH_EMAIL_DOMAIN,
  AUTH_PW_SUFFIX,
};
