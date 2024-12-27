import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";

const RoomRegister = () => {
  const { logindata } = useContext(LoginContext);
  const [ownerId, setOwnerId] = useState(null);

  const [roomName, setRoomName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [startAvailableDate, setStartAvailableDate] = useState("");
  const [endAvailableDate, setEndAvailableDate] = useState("");
  const [amenities, setAmenities] = useState("");
  const [photo, setPhoto] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [numOfBeds, setNumOfBeds] = useState("");
  const [status, setStatus] = useState("available");

  // Fetch ownerId based on auth method
  useEffect(() => {
    const fetchOwnerId = async () => {
      const authMethod = localStorage.getItem("authMethod");

      if (authMethod === "google") {
        // Google-based authentication
        const uid = localStorage.getItem("uid");
        if (uid) {
          try {
            const response = await axios.get(`http://localhost:3000/api/g-owners/profile/${uid}`);
            setOwnerId(response.data.owner._id); // Assuming the response contains an owner object
          } catch (err) {
            console.error("Failed to fetch ownerId:", err.message);
          }
        }
      } else if (authMethod === "token") {
        // Token-based authentication
        setOwnerId(logindata?._id || logindata?.ValidUserOne?._id);
      }
    };

    fetchOwnerId();
  }, [logindata]);

  const handleRoomRegistration = async (e) => {
    e.preventDefault();

    if (!ownerId) {
      alert("Owner ID not found. Please ensure you are logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("name", roomName);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("startAvailableDate", new Date(startAvailableDate).toISOString());
    formData.append("endAvailableDate", new Date(endAvailableDate).toISOString());
    formData.append("amenities", amenities);
    formData.append("photo", photo);
    formData.append("type", roomType);
    formData.append("beds", numOfBeds);
    formData.append("status", status);
    formData.append("ownerId", ownerId); // Add ownerId to the request

    try {
      const response = await axios.post("http://localhost:3000/api/rooms", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Room registered successfully");
      // Clear form fields
      setRoomName("");
      setLocation("");
      setPrice("");
      setStartAvailableDate("");
      setEndAvailableDate("");
      setAmenities("");
      setPhoto(null);
      setRoomType("");
      setNumOfBeds("");
      setStatus("available");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Room registration failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Room Registration</h2>
      <form onSubmit={handleRoomRegistration} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Room Name</label>
          <input
            type="text"
            className="form-control"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Room Type</label>
          <select
            className="form-select"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          >
            <option value="">Select Room Type</option>
            <option value="King">King</option>
            <option value="Queen">Queen</option>
            <option value="Double">Double</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Start Available Date</label>
          <input
            type="date"
            className="form-control"
            value={startAvailableDate}
            onChange={(e) => setStartAvailableDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">End Available Date</label>
          <input
            type="date"
            className="form-control"
            value={endAvailableDate}
            onChange={(e) => setEndAvailableDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Number of Beds</label>
          <input
            type="number"
            className="form-control"
            value={numOfBeds}
            onChange={(e) => setNumOfBeds(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Amenities</label>
          <textarea
            className="form-control"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="col-12">
          <label className="form-label">Upload Photo</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary mt-3">Register Room</button>
        </div>
      </form>
    </div>
  );
};

export default RoomRegister;
