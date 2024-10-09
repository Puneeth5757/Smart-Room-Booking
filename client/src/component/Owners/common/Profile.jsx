// import { useState, useEffect } from 'react';
// import axios from 'axios';

const Profile = () => {
//   const [ownerInfo, setOwnerInfo] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('ownersdatatoken');
//     if (token) {
//       axios.get('http://localhost:3000/api/owners/profile', {
//         headers: { Authorization: token },
//       }).then(response => {
//         setOwnerInfo(response.data.owner);  // Assuming the API returns owner data
//       }).catch(err => {
//         console.log('Error fetching owner info', err);
//       });
//     }
//   }, []);

//   if (!ownerInfo) {
//     return <div>Loading...</div>;
//   }

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      {/* <p><strong>Name:</strong> {ownerInfo.ownername}</p>
      <p><strong>Email:</strong> {ownerInfo.email}</p>
      <p><strong>Phone:</strong> {ownerInfo.phone}</p> */}
    </div>
  );
};

export default Profile;
