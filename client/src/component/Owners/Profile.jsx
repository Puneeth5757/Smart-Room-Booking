import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";
import Sidebar from "./common/Sidebar";

const Profile = () => {
  const { logindata } = useContext(LoginContext);
  const [authMethod] = useState(localStorage.getItem("authMethod"));
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authMethod === "google") {
        const uid = localStorage.getItem("uid"); // Get the UID from localStorage for Google login
        if (uid) {
          try {
            const response = await axios.get(`http://localhost:3000/api/g-owners/profile/${uid}`);
            setUserData(response.data.owner);
          } catch (err) {
            setError("Failed to fetch profile: " + err.message);
          }
        } else {
          setError("No UID found in localStorage");
        }
      } else if (authMethod === "token") {
        setUserData(logindata?.ValidUserOne);
      }
    };

    fetchUserData();
  }, [logindata, authMethod]);

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="container mt-5" style={{ marginLeft: "320px" }}>
        <div className="card shadow-sm border-0">
          <div className="card-header bg-primary text-white text-center">
            <h2 className="mb-0">Profile Information</h2>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-3">
                <strong>Name:</strong>
              </div>
              <div className="col-md-9">
                <p className="text-muted">{userData.name || userData.ownername}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <strong>Email:</strong>
              </div>
              <div className="col-md-9">
                <p className="text-muted">{userData.email}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <strong>Phone:</strong>
              </div>
              <div className="col-md-9">
                <p className="text-muted">{userData.phone || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
