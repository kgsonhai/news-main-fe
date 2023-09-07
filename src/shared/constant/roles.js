import RouterConfig from "../../config/router.config";

export const ROLES = {
  ADMIN: "ROLE_ADMIN",
  USER: "ROLE_USER",
};

export const PATHNAME_HAS_PERMITTED_BY_ADMIN = [
  RouterConfig.category,
  RouterConfig.article,
  RouterConfig.home,
  RouterConfig.profile,
  RouterConfig.dashboard,
];

export const PATHNAME_HAS_PERMITTED_BY_USER = [
  RouterConfig.category,
  RouterConfig.article,
  RouterConfig.home,
  RouterConfig.profile,
];
