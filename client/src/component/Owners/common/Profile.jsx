import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../LandingSite/Auth/ContextProvider/Context";

const Profile = () => {
  const { logindata } = useContext(LoginContext);
  const [authMethod, setAuthMethod] = useState(localStorage.getItem("authMethod"));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Set the user data based on the authentication method
    if (authMethod === "google") {
      setUserData(logindata?.googleUser);
    } else if (authMethod === "token") {
      setUserData(logindata?.ValidUserOne);
    }
  }, [logindata, authMethod]);

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
              <p className="text-muted">{userData ? userData.name || userData.ownername : ""}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Email:</strong>
            </div>
            <div className="col-md-9">
              <p className="text-muted">{userData ? userData.email : ""}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Phone:</strong>
            </div>
            <div className="col-md-9">
              <p className="text-muted">{userData ? userData.phone : ""}</p>
            </div>
          </div>
          {/* Add more profile details here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;


// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [owner, setOwner] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const uid = localStorage.getItem("uid");  // Get the UID from localStorage

//     if (uid) {
//       // Fetch the owner's profile using the stored UID
//       axios.get(`http://localhost:3000/api/g-owners/profile/${uid}`)
//         .then(response => {
//           setOwner(response.data.owner);  // Set the owner data
//         })
//         .catch(err => {
//           setError("Failed to fetch profile: " + err.message);
//         });
//     } else {
//       setError("No UID found in localStorage");
//     }
//   }, []);

//   if (error) {
//     return <div className="alert alert-danger">{error}</div>;
//   }

//   if (!owner) {
//     return (
//       <div className="d-flex justify-content-center align-items-center">
//         <div className="spinner-border" role="status">
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container my-5">
//       <div className="card shadow-sm">
//         <div className="card-header text-center bg-primary text-white">
//           <h3>Owner Profile</h3>
//         </div>
//         <div className="card-body">
//           <div className="row">
            
//             <div className="col-md-8">
//               <h5 className="card-title mb-3"> Name: {owner.ownername}</h5>
//               <p className="card-text"><strong>Email:</strong> {owner.email}</p>
//               <p className="card-text"><strong>Phone:</strong> {owner.phone || "N/A"}</p>
//             </div>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default Profile;
