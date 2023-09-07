import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.scss";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import MultiSelect from "../../components/Select/multiSelect";
import AuthLayout from "../../layout/authLayout";
import { client } from "../../api/client";

let yearOfBirths = Array.from({ length: 104 }, (x, i) => i + 1920);

const { Option } = Select;
export const Register = () => {
  const history = useHistory();
  const [categories, setCategories] = useState();
  const [optionSelected, setSelected] = useState();
  const isLogin = !!localStorage.getItem("token");

  const onChangeCategories = useCallback((value) => {
    setSelected(value);
  }, []);

  const categoryOptions = useMemo(
    () =>
      categories?.map((category) => ({
        label: category.description,
        value: category.id,
      })) || [],
    [categories]
  );

  const fetchData = async () => {
    const data = await client.get("/api/common/category");
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFinish = (values) => {
    let data = {
      username: values.username,
      password: values.password,
      year_of_birth: values.year_of_birth,
      category_ids: optionSelected.map((opt) => opt.value),
    };
    axios
      .post("http://localhost:8080/api/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          history.push("/login");
        }
      })
      .catch((error) => console.log(error));
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
          onFinish={handleFinish}
          className="form-container"
          name="login"
          initialValues={{
            remember: true,
          }}
        >
          <h3>ĐĂNG KÝ</h3>
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
              prefix={<LockOutlined />}
              type={"password"}
              placeholder={"Mật khẩu"}
            />
          </Form.Item>
          <Form.Item
            name="re-password"
            rules={[
              {
                required: true,
                message: "Nhập lại mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu không khớp!");
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type={"password"}
              placeholder={"Nhập lại mật khẩu"}
            />
          </Form.Item>
          <Form.Item
            name={"year_of_birth"}
            rules={[
              {
                required: true,
                message: "Chọn năm sinh",
              },
            ]}
          >
            <Select placeholder={"-- Năm sinh --"}>
              {yearOfBirths.map((year) => (
                <Option key={year}>{year}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <MultiSelect
              options={categoryOptions}
              onChange={onChangeCategories}
              value={optionSelected}
              isSelectAll={true}
              menuPlacement={"bottom"}
              placeholder="Chọn danh mục"
            />
          </Form.Item>
          <Divider />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              ĐĂNG KÝ
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthLayout>
  );
};
