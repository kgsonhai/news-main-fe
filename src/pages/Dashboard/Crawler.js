import { Button } from "antd";
import { useCallback, useState } from "react";
import { client } from "../../api/client";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";

export const Crawler = () => {
  const [message, setMessage] = useState(null);
  const callCrawler = useCallback(async () => {
    const data = await client.post("/api/admin/crawler", null);
    setMessage(data);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <div style={{ fontSize: "30px", marginBottom: "15px" }}>
        Bắt đầu phiên báo mới
      </div>
      <Button
        type={"primary"}
        shape="round"
        icon={<VerticalAlignBottomOutlined />}
        size="large"
        onClick={callCrawler}
      >
        Bắt đầu
      </Button>
      <p>{message}</p>
    </div>
  );
};
