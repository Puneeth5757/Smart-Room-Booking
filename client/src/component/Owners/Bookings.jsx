import { useEffect, useState, useContext } from 'react'; 
import axios from 'axios';
import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";
import Sidebar from "./common/Sidebar";

const Bookings = () => {
  const { logindata } = useContext(LoginContext);
  const [ownerId, setOwnerId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ownerId based on auth method
  useEffect(() => {
    const fetchOwnerId = async () => {
      const authMethod = localStorage.getItem("authMethod");

      if (!authMethod) {
        setError("Authentication method not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        if (authMethod === "google") {
          // Google-based authentication
          const uid = localStorage.getItem("uid");
          if (!uid) {
            setError("UID not found. Please log in again.");
            setLoading(false);
            return;
          }

          const response = await axios.get(`http://localhost:3000/api/g-owners/profile/${uid}`);
          if (response.data?.owner?._id) {
            setOwnerId(response.data.owner._id);
          } else {
            setError("Owner data missing in response. Please try again.");
          }
        } else if (authMethod === "token") {
          // Token-based authentication
          if (logindata?._id || logindata?.ValidUserOne?._id) {
            setOwnerId(logindata._id || logindata.ValidUserOne._id);
          } else {
            setError("Token authentication failed. Please log in again.");
          }
        }
      } catch (err) {
        setError(`Failed to fetch owner ID: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerId();
  }, [logindata]);

  useEffect(() => {
    if (!ownerId) {
      return;
    }

    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/rooms?ownerId=${ownerId}`);
        if (response.data?.length) {
          setRooms(response.data);
        } else {
          setError("No rooms found for the provided owner ID.");
        }
      } catch (err) {
        setError(`Error fetching rooms: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [ownerId]);

  if (loading) {
    return <p className="text-center">Loading rooms...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <h1 className="text-center mb-4">My Rooms and Bookings</h1>
            {rooms.length > 0 ? (
              <div className="row">
                {rooms.map((room) => (
                  <div className="col-md-4 mb-4" key={room._id}>
                    <div className="card">
                      <img
                        src={`http://localhost:3000/${room.photo}`}
                        className="card-img-top"
                        alt={room.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{room.name}</h5>
                        <p className="card-text">Location: {room.location}</p>
                        <p className="card-text">Price: ${room.price} / night</p>
                        <p className="card-text">Type: {room.type}</p>
                        <p className="card-text">Beds: {room.beds}</p>
                        <p className="card-text">
                          Booking Status:{" "}
                          {room.status === "booked"
                            ? "Booked"
                            : room.status === "available"
                            ? "Available"
                            : "Unavailable"}
                        </p>
                        {room.status === "booked" && room.bookedBy && (
                          <>
                            <p className="card-text">
                              <strong>Booked By:</strong>{" "}
                              {room.bookedBy.name || "Unknown"}
                            </p>
                            <p className="card-text">
                              <strong>Booking Date:</strong>{" "}
                              {room.bookingTime
                                ? new Date(room.bookingTime).toLocaleString()
                                : "N/A"}
                            </p>
                            <p className="card-text">
                              <strong>Booking Period:</strong>{" "}
                              {new Date(room.startAvailableDate).toLocaleDateString()} -{" "}
                              {new Date(room.endAvailableDate).toLocaleDateString()}
                            </p>
                            <p className="card-text">
                              <strong>Payment Status:</strong> {room.paymentStatus || "Pending"}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No rooms or bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
