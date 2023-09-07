import { Tabs } from "antd";
import React from "react";
import WithAuth from "../../hoc/withAuth";
import { Crawler } from "./Crawler";
import "./Dashboard.css";
import { SystemInfo } from "./SystemInfo";
import { UserManagement } from "./UserManagement";

const { TabPane } = Tabs;
const Dashboard = () => {
  return (
    <div className={"Dashboard"}>
      <Tabs tabPosition={"left"}>
        <TabPane tab="Thông tin hệ thống" key="1">
          <SystemInfo />
        </TabPane>
        <TabPane tab="Quản lý người dùng" key="2">
          <UserManagement />
        </TabPane>
        <TabPane tab="Thu thập báo" key="3">
          <Crawler />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default WithAuth(Dashboard);
