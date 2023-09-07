import { Button } from "antd";
import { useCallback, useState } from "react";
import { client } from "../../api/client";

export const Crawler = () => {
  const [message, setMessage] = useState(null);
  const callCrawler = useCallback(async () => {
    const data = await client.post("/api/admin/crawler", null);
    setMessage(data);
  }, []);

  return (
    <div>
      <p>Bắt đầu phiên báo mới</p>
      <Button type={"primary"} onClick={callCrawler}>
        Bắt đầu
      </Button>
      <p>{message}</p>
    </div>
  );
};
