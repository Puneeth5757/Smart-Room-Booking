import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Header from "./common/Header";
import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";

const Dashboard = () => {
  const { setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const DashboardValid = async () => {
    const isGoogleLogin = localStorage.getItem("isGoogleLogin");

    if (isGoogleLogin === "true") {
      // User is logged in with Google, skip token validation
      console.log("User logged in with Google, bypassing token validation.");
      history("/dashboard");
      return;
    }

    const token = localStorage.getItem("usersdatatoken");
    console.log(token);

    const res = await fetch("http://localhost:3000/api/users/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("Redirected to error page");
      history("*");
    } else {
      console.log("User verification done");
      setLoginData(data);
      history("/dashboard");
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

export default Dashboard;