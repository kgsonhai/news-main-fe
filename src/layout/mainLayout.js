import { Header } from "../components/Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout-container">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
