import { UserOutlined } from "@ant-design/icons";
import { Menu, Select } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";

import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../App";
import useAuth from "../../hook/useAuth";
import { CategoryBar } from "../../pages/Category/CategoryBar";
import "./Header.scss";

const SubMenu = Menu.SubMenu;
export const Header = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { data: user } = useAuth();
  const { lang, setLang } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState();

  const isAdmin = !!user?.["roles"]?.includes("ROLE_ADMIN");
  const isLogin = !!localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    history.push("/");
  }

  const handleChangeLang = useCallback(
    (value) => {
      i18n.changeLanguage(value);
      setLang(value);
    },
    [i18n, setLang]
  );

  return (
    <div className={"Header"}>
      <div className="header-top">
        <div className="translation">
          <img
            src={lang === "vi" ? "/vietnam.png" : "/uk.png"}
            alt="translation"
            width={30}
            height={20}
          />
          <Select
            defaultValue="vi"
            style={{ width: 130 }}
            onSelect={handleChangeLang}
            value={lang}
          >
            <Select.Option value="vi">{t("vietnamese")}</Select.Option>
            <Select.Option value="en">{t("english")}</Select.Option>
          </Select>

          <div></div>
        </div>
        {!isLogin ? (
          <div className="form-auth">
            <Link to={"/login"}>{t("login")}</Link>
            <div></div>
            <Link to={"/register"}>{t("sign-up")}</Link>
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
                  <Link to={"/profile"}>{t("profile-page")}</Link>
                </Menu.Item>
                {isAdmin && (
                  <Menu.Item key="dashboard">
                    <Link to={"/dashboard"}>{t("manager-page")}</Link>
                  </Menu.Item>
                )}
                <Menu.Item key="/logout">
                  <p onClick={logout}>{t("logout")}</p>
                </Menu.Item>
              </>
            </SubMenu>
          </Menu>
        )}
      </div>
      <div className="header-bottom">
        <Link to={"/"} onClick={() => setSelectedCategory()}>
          <img className="image-logo" src="/logo-company.png" alt="header" />
        </Link>
        <CategoryBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};
