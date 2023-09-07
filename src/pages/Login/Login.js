import { LinkOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { client } from "../../api/client";
import AuthLayout from "../../layout/authLayout";
import "./Login.scss";

export const Login = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const isLogin = localStorage.getItem("token");
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await client.post(`/api/auth/login`, values);
      const rolesName = res?.["role"]?.map((role) => role.roleType);
      localStorage.setItem("token", res["accessToken"]);
      localStorage.setItem("role", rolesName);
      history.push("/");
    } catch (err) {
      setLoading(false);
      console.log({ err });
    }
  };

  if (isLogin) {
    return <Redirect to={"/"} />;
  }

  return (
    <AuthLayout>
      <div className="login-container">
        <div className="login-logo">
          <img src="/login-logo.png" alt="IMG" />
        </div>
        <Form
          onFinish={onFinish}
          name="login"
          initialValues={{
            remember: true,
          }}
          className="form-container"
        >
          <h3>ĐĂNG NHẬP</h3>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Nhập tên đăng nhập",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined type={"user"} />}
              placeholder={"Tên đăng nhập"}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined type={"lock"} />}
              type={"password"}
              placeholder={"Mật khẩu"}
            />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
          <div>
            <Link to="/register">
              Tạo tài khoản mới{" "}
              <LinkOutlined style={{ marginLeft: "8px", color: "#1890ff" }} />
            </Link>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};
