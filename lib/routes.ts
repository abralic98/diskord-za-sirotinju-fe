
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
  voice: `${settings}/voice`
};

export default routes;
