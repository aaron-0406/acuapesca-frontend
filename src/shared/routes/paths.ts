/**
 * Paths configuration for routing
 */

// eslint-disable-next-line import/no-anonymous-default-export
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
    verProcedimientos: (id = ":id") => `/documentaria/procedimientos/${id}`,
    users: "/documentaria/usuarios",
    roles: "/documentaria/roles",
  },
};
