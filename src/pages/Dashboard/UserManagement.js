import { Table } from "antd";
import { useEffect, useState } from "react";
import { client } from "../../api/client";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const data = await client.get("/api/admin/users");
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Id người dùng",
      dataIndex: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
    },
    {
      title: "Năm sinh",
      dataIndex: "year_of_birth",
    },
  ];
  return (
    <div>
      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </div>
  );
};
