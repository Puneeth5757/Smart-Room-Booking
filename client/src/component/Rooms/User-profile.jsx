import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";

const Profile = () => {
  const { logindata } = useContext(LoginContext);
  const [authMethod, ] = useState(localStorage.getItem("authMethod"));
  const [isGoogleLogin, ] = useState(localStorage.getItem("isGoogleLogin"));
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
        if (isGoogleLogin === "true") {
        const uid = localStorage.getItem("uid");
        if (uid) {
          try {
            const response = await axios.get(`http://localhost:3000/api/g-users/User-profile/${uid}`);
            console.log()
            setUserData(response.data.user);
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
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
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
              <p className="text-muted">{userData.username || userData.username}</p>
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
  );
};

export default Profile;
