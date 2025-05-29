
const auth = "/auth"
const settings = "/settings"
const routes = {
  home: "/",
  login: `${auth}/login`,
  register: `${auth}/register`,
  dashboard: "/dashboard",
  profile: "/profile",
  settings: settings,
  notifications: `${settings}/notifications`,
  account: `${settings}/account`,
  voice: `${settings}/voice`,
  discover: `/discover`,
  serverSettings: `${settings}/server`,
  dm: `/dm`
};

export default routes;
