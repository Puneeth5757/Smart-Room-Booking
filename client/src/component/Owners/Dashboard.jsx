import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Header from "./common/Header";

import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";

const OwnerDashboard = () => {
  const { setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const DashboardValid = async () => {
    const token = localStorage.getItem("ownersdatatoken");
    const authMethod = localStorage.getItem("authMethod");

    if (authMethod === "token") {
      // Only validate the token if the authentication method is token-based
      const res = await fetch("http://localhost:3000/api/owners/validuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = await res.json();

      if (data.status === 401 || !data) {
        console.log("redirected to error page");
        history("*");
      } else {
        console.log("owner verified with token");
        setLoginData(data);
        history("/ownerdash");
      }
    } else {
      console.log("owner verified with Google");
      history("/ownerdash");
    }
  };

  useEffect(() => {
    DashboardValid();
  }, []);

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
