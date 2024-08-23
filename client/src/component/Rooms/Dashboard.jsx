import { Outlet } from "react-router-dom";
import Header from "./common/Header";

const OwnerDashboard = () => {
 

  return (
    <>
      <div className="row">
        <div className="">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default OwnerDashboard;
