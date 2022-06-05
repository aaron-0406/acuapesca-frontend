/**
 * Paths configuration for routing
 */

export default {
  root: "/",
  error: "/error",
  general: {
    home: "/home",
    about: "/about",
    validate: "/validate-token",
    notFound: "/not-found",
    tableScanner: "/table/:uuid",
  },
  guest: {
    login: "/login",
    loginCallback: "/login/callback",
    loginConfirmation: "/login/confirm-email",
    loginError: "/login/invalid-token",
  },
  account: {
    root: "/account",
    settings: "/account/settings",
    profile: "/account/profile",
    support: "/account/help-support",
    roadmap: "/account/roadmap-changelog",
    community: "/account/join-slack-community",
  },
  documentary: {
    root: "/documentaria",
    procedimientos: "/documentaria/procedimientos",
    users: "/documentaria/usuarios",
    roles: "/documentaria/roles",
  },
};
