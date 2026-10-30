window.INFINIA_CALENDAR_CONFIG = Object.freeze({
  // OAuth 2.0 Web application Client ID. Browser OAuth client IDs are public identifiers.
  googleOAuthClientId: '1086016321682-e4evlbejae1dnmje5dapvhhqlpscjntu.apps.googleusercontent.com',

  // Use "primary" when the authorized account owns the teaching calendar.
  // Otherwise paste the private calendar's Calendar ID from Google Calendar settings.
  calendarId: 'primary',

  // Only this Google account is accepted after OAuth authorization.
  allowedGoogleAccount: 'infinia.ac@gmail.com',

  // Website-only login. The password itself is NOT stored; only its SHA-256 digest is kept.
  websiteLoginEmail: 'infinia.ac@gmail.com',
  websiteLoginPasswordSha256: '1ed0fb62f51c1a3c26134d6b93d4881d00bf43a7505d0e467879ae0826815f72',

  timezone: 'Asia/Bangkok',
  defaultMonth: '2026-11',
  autoRefreshMinutes: 5
});
