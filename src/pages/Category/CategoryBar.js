import { Menu } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../../api/client";
import useAuth from "../../hook/useAuth";
import "./Category.scss";

export const CategoryBar = () => {
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

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className={"Category"}>
      <Menu>
        {categories?.map((category, index) => {
          return (
            <Menu.Item key={index}>
              <Link to={`/category/${category.name}`}>
                {category.description}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};
