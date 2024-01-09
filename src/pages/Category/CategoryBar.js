import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../../api/client";
import useAuth from "../../hook/useAuth";
import "./Category.scss";

export const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();
  const { data: user } = useAuth();
  const isLogin = !!localStorage.getItem("token");
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    const data = await client.get("/api/common/category");
    if (isLogin) {
      return setCategories(user?.categories || []);
    }
    setCategories(data);
  }, [isLogin, user]);

  const handleSelectedCategory = useCallback(
    (key) => {
      setSelectedCategory(key);
    },
    [setSelectedCategory]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className={"Category"}>
      <Menu selectedKeys={[selectedCategory]}>
        {categories?.map((category, index) => {
          return (
            <Menu.Item
              onClick={() => handleSelectedCategory(index)}
              key={index}
              className={`${
                index === selectedCategory ? "active-category" : ""
              }`}
            >
              <Link to={`/category/${category.name}`}>
                {t(`${category.name}`)}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};
