import { useQuery } from "@tanstack/react-query";
import { Form, Input, Select } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { client } from "../../api/client";
import ModalConfirm from "../../components/Modal/modal-confirm";
import MultiSelect from "../../components/Select/multiSelect";
import WithAuth from "../../hoc/withAuth";
import "./Profile.scss";
import useAuth from "../../hook/useAuth";

let yearOfBirths = Array.from({ length: 104 }, (x, i) => i + 1920);

const Profile = () => {
  const [categories, setCategories] = useState();
  const [isOpenModal, setOpenModal] = useState();
  const [optionSelected, setSelected] = useState();
  const [form] = Form.useForm();
  const { data: user, isLoading } = useAuth();

  const categoryOptions = useMemo(
    () =>
      categories?.map((category) => ({
        label: category.description,
        value: category.id,
      })) || [],
    [categories]
  );

  const defaultOptionSelected = useMemo(
    () =>
      user?.categories.map((category) => ({
        label: category.description,
        value: category.id,
      })) || [],
    [user]
  );

  const onChangeCategories = useCallback((value) => {
    setSelected(value);
  }, []);

  const fetchData = async () => {
    const res = await client.get("/api/common/category");
    setCategories(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFinish = (value) => {
    const { year_of_birth, categories } = value;
    client
      .post("/api/user/update", {
        year_of_birth,
        category_ids: categories?.map((category) => category.value),
      })
      .then((response) => {
        setOpenModal(false);
      })
      .catch((error) => {
        setOpenModal(false);
      });
  };

  return (
    <div className="profile">
      {!isLoading && (
        <Form
          className="form-container"
          name="updateInfo"
          form={form}
          onFinish={handleFinish}
          initialValues={{
            year_of_birth: user?.year_of_birth,
            categories: defaultOptionSelected,
          }}
        >
          <h3>THÔNG TIN CÁ NHÂN</h3>
          <Form.Item name="username" label="Tên đăng nhập">
            <Input
              disabled
              defaultValue={user?.username}
              prefix={<div type={"user"} />}
              placeholder={"Tên đăng nhập"}
            />
          </Form.Item>
          <Form.Item
            name="year_of_birth"
            label="Năm sinh"
            rules={[
              {
                required: true,
                message: "Chọn năm sinh",
              },
            ]}
          >
            <Select
              placeholder={"-- Năm sinh --"}
              defaultValue={user?.year_of_birth}
            >
              {yearOfBirths.map((year) => (
                <Select.Option key={year}>{year}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Danh mục ưa thích"
            name="categories"
            rules={[
              {
                required: true,
                message: "Chọn ít nhất 1 danh mục ưa thích",
              },
            ]}
          >
            <MultiSelect
              options={categoryOptions}
              onChange={onChangeCategories}
              value={optionSelected}
              isSelectAll={true}
              menuPlacement={"bottom"}
              placeholder="Chọn danh mục"
              defaultValue={optionSelected}
            />
          </Form.Item>
          <ModalConfirm
            title="Cập nhật thông tin"
            content="Bạn chắc chắc muốn lưu thay đổi này?"
            buttonName="Cập nhật"
            isOpenModal={isOpenModal}
            setOpenModal={setOpenModal}
            handleSubmit={form.submit}
          />
        </Form>
      )}
    </div>
  );
};

export default WithAuth(Profile);
