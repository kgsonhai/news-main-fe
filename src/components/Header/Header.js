import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { CategoryBar } from "../../pages/Category/CategoryBar";
import "./Header.scss";

const SubMenu = Menu.SubMenu;
export const Header = () => {
  const history = useHistory();
  const { data: user } = useAuth();
  const isAdmin = !!user?.["roles"]?.includes("ROLE_ADMIN");
  const isLogin = !!localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    history.push("/");
  }

  return (
    <div className={"Header"}>
      <Link to={"/"}>
        <img className="image-logo" src="/logo-header.png" alt="header" />
      </Link>

      <CategoryBar />
      {!isLogin ? (
        <div className="form-auth">
          <Link to={"/login"}>Đăng nhập</Link>
          <Link to={"/register"}>Đăng ký</Link>
        </div>
      ) : (
        <Menu mode="vertical">
          <SubMenu
            title={user?.username}
            style={{ marginRight: "130px" }}
            icon={<UserOutlined />}
          >
            <>
              <Menu.Item key="profile">
                <Link to={"/profile"}>Trang cá nhân</Link>
              </Menu.Item>
              {isAdmin && (
                <Menu.Item key="dashboard">
                  <Link to={"/dashboard"}>Trang quản lý</Link>
                </Menu.Item>
              )}
              <Menu.Item key="/logout">
                <p onClick={logout}>Đăng xuất</p>
              </Menu.Item>
            </>
          </SubMenu>
        </Menu>
      )}
    </div>
  );
};
