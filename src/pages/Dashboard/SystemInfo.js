import { Table } from "antd";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { client } from "../../api/client";

export const SystemInfo = () => {
  const [session, setSession] = useState([]);

  async function fetchSession() {
    const data = await client.get("/api/admin/session");
    setSession(data);
  }

  useEffect(() => {
    fetchSession();
  }, []);

  const columns = [
    {
      title: "Phiên",
      dataIndex: "id",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "created_time",
      render: (created_time) => (
        <p>
          <Moment format={"DD/MM/YYYY HH:mm:ss"}>{created_time}</Moment>
        </p>
      ),
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "finished_time",
      render: (finished_time) => {
        if (finished_time) {
          return (
            <p>
              <Moment format={"DD/MM/YYYY HH:mm:ss"}>{finished_time}</Moment>
            </p>
          );
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => <p>{status}</p>,
    },
  ];
  return (
    <div>
      <Table
        dataSource={session}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </div>
  );
};
