import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";
import Sidebar from "./common/Sidebar";

const Profile = () => {
  const { logindata } = useContext(LoginContext);
  const [isGoogleLogin] = useState(localStorage.getItem("isGoogleLogin"));
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isGoogleLogin === "true") {
        const uid = localStorage.getItem("uid");
        if (uid) {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/g-users/User-profile/${uid}`
            );
            setUserData(response.data.user);
          } catch (err) {
            setError("Failed to fetch profile: " + err.message);
          }
        } else {
          setError("No UID found in localStorage");
        }
      } else if (isGoogleLogin === "false") {
        setUserData(logindata?.ValidUserOne);
      }
    };

    fetchUserData();
  }, [logindata]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5 " style={{ marginLeft: "320px" }}>
        <div className="card shadow-lg ">
          <div className="card-header bg-primary text-white text-center">
            <h3 className="mb-0">Profile Information</h3>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-sm-3">
                <strong>Name:</strong>
              </div>
              <div className="col-sm-9">{userData.username || "N/A"}</div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <strong>Email:</strong>
              </div>
              <div className="col-sm-9">{userData.email || "N/A"}</div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <strong>Phone:</strong>
              </div>
              <div className="col-sm-9">{userData.phone || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
