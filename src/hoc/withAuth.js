import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  PATHNAME_HAS_PERMITTED_BY_ADMIN,
  PATHNAME_HAS_PERMITTED_BY_USER,
  ROLES,
} from "../shared/constant/roles";

const WithAuth = (WrappedComponent) => {
  const Component = (props) => {
    const history = useHistory();
    const isLogin = !!localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const pathCurrentPage = history.location.pathname;

    if (typeof window !== "undefined") {
      if (!isLogin) {
        history.replace("/login");
        return null;
      }
    }

    if (
      role === ROLES.ADMIN &&
      !PATHNAME_HAS_PERMITTED_BY_ADMIN.includes(pathCurrentPage)
    ) {
      console.log("admin");
      return null;
    }

    if (
      role === ROLES.USER &&
      !PATHNAME_HAS_PERMITTED_BY_USER.includes(pathCurrentPage)
    ) {
      console.log("user");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default WithAuth;
