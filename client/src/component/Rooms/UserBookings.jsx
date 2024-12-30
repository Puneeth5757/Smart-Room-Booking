import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";
import Sidebar from "./common/Sidebar";

const UserBookings = () => {
  const { logindata } = useContext(LoginContext);
  const [userId, setUserId] = useState(null);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user ID based on authentication method
  useEffect(() => {
    const fetchUserId = async () => {
      const isGoogleLogin = localStorage.getItem("isGoogleLogin");

      if (isGoogleLogin === "true") {
        const uid = localStorage.getItem("uid");
        if (uid) {
          try {
            const response = await axios.get(`http://localhost:3000/api/g-users/User-profile/${uid}`);
            setUserId(response.data.user._id);
          } catch (err) {
            setError("Failed to fetch user ID: " + err.message);
          }
        } else {
          setError("No UID found in localStorage.");
        }
      } else if (isGoogleLogin === "false") {
        if (logindata?.ValidUserOne?._id) {
          setUserId(logindata.ValidUserOne._id);
        } else {
          setError("User ID not available in token-based authentication.");
        }
      }
      setLoading(false);
    };

    fetchUserId();
  }, [logindata]);

  // Fetch booked rooms for the current user
  useEffect(() => {
    if (!userId) return;

    const fetchBookedRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/rooms/all`);
        const allRooms = response.data;

        // Filter rooms booked by the current user
        const userBookedRooms = allRooms.filter(
          (room) => room.bookedBy === userId
        );
        setBookedRooms(userBookedRooms);
      } catch (err) {
        setError(`Error fetching booked rooms: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedRooms();
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5" style={{ marginLeft: "320px" }}>
        <div className="card shadow-lg">
          <div className="card-header text-center">
            <h3 className="mb-0">My Bookings</h3>
          </div>
          <div className="card-body">
            {bookedRooms.length > 0 ? (
              <div className="row">
                {bookedRooms.map((room) => (
                  <div className="col-md-4 mb-4" key={room._id}>
                    <div className="card">
                      <img
                        src={`http://localhost:3000/${room.photo}`}
                        className="card-img-top"
                        alt={room.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{room.name}</h5>
                        <p className="card-text">Location: {room.location}</p>
                        <p className="card-text">Price: ${room.price} / night</p>
                        <p className="card-text">Type: {room.type}</p>
                        <p className="card-text">Beds: {room.beds}</p>
                        <p className="card-text">
                          <strong>Booking Status:</strong> {room.status}
                        </p>
                        <p className="card-text">
                          <strong>Amenities:</strong> {room.amenities}
                        </p>
                        <p className="card-text">
                              <strong>Booking Period:</strong>{" "}
                              {new Date(room.startAvailableDate).toLocaleDateString()} -{" "}
                              {new Date(room.endAvailableDate).toLocaleDateString()}
                            </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">You have not booked any rooms yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
