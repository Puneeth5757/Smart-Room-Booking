import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LoginContext } from "../LandingSite/Auth/ContextProvider/Context";

const RoomsPage = () => {
  const { logindata } = useContext(LoginContext);
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [numOfBeds, setNumOfBeds] = useState('All');
  const [roomType, setRoomType] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setUserId] = useState(null); // To store the logged-in user's ID
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle async loading of logindata

  // Fetch logged-in user's ID
  useEffect(() => {
    const fetchUserId = async () => {
      // Ensure that logindata is available before proceeding
      if (logindata) {
        const isGoogleLogin = localStorage.getItem("isGoogleLogin");

        if (isGoogleLogin === "true") {
          // Google-based authentication
          const uid = localStorage.getItem("uid");
          if (uid) {
            try {
              const response = await axios.get(`http://localhost:3000/api/g-users/User-profile/${uid}`);
              setUserId(response.data.user._id); // Assuming the response contains an owner object
            } catch (err) {
              console.error("Failed to fetch ownerId:", err.message);
            }
          } else {
            console.error("No UID found in localStorage.");
          }
        } else if (isGoogleLogin === "false") {
          // Token-based authentication  
          if (logindata && logindata.ValidUserOne) {
            console.log(logindata.ValidUserOne._id); // Log for debugging
            setUserId(logindata.ValidUserOne._id || "No id available");
          }
        }

        setIsLoading(false); // Once the data is loaded, stop loading
      }
    };

    fetchUserId();
  }, [logindata]);  // Re-run the effect when logindata changes

  // Fetch rooms data from the server
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rooms/all');
        setRooms(response.data);
        setFilteredRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  // Format available dates into a user-friendly string
  const formatAvailableDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `Available from ${start.toLocaleDateString(undefined, options)} to ${end.toLocaleDateString(undefined, options)}`;
  };

  // Filter rooms based on search term, number of beds, room type, and date range
  useEffect(() => {
    let filtered = rooms.filter((room) =>
      room.name && room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (numOfBeds !== 'All') {
      filtered = filtered.filter((room) => room.beds && room.beds === parseInt(numOfBeds));
    }

    if (roomType !== 'All') {
      filtered = filtered.filter((room) => room.type && room.type === roomType);
    }

    // Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((room) => {
        const availableStart = new Date(room.startAvailableDate);
        const availableEnd = new Date(room.endAvailableDate);
        return availableStart <= end && availableEnd >= start;
      });
    }

    setFilteredRooms(filtered);
  }, [searchTerm, numOfBeds, roomType, startDate, endDate, rooms]);

// Handle booking action
const handleBooking = async (roomId, userId) => {
  console.log(`Booked Successfully! Room ID: ${roomId}, User ID: ${userId}`);
  try {
    // Ensure userId is passed as a string (in case it's from Google login)
    const response = await axios.put(`http://localhost:3000/api/rooms/${roomId}`, {
      bookedBy: userId,  // userId should be a string
      status: 'booked',
    });

    if (response.status === 200) {
      alert(`Room booked successfully!`);
    } else {
      alert('Failed to book the room.');
    }
  } catch (error) {
    console.error('Error booking the room:', error);
    alert('Error booking the room.');
  }
};


  return (
    <div className="container mt-5">
      {isLoading ? (
        <p>Loading...</p>  // Show loading state until logindata is available
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-control"
                value={numOfBeds}
                onChange={(e) => setNumOfBeds(e.target.value)}
              >
                <option value="All">Num of Beds</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-control"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="All">Room Type</option>
                <option value="King">King</option>
                <option value="Queen">Queen</option>
                <option value="Double">Double</option>
              </select>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label" htmlFor="start-date">Start Date</label>
              <input
                type="date"
                id="start-date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="end-date">End Date</label>
              <input
                type="date"
                id="end-date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <div className="col-md-3 mb-4" key={room._id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={`http://localhost:3000/${room.photo}`}
                      alt={room.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(room.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          {room.name}
                        </a>
                      </h5>
                      <p className="card-text text-muted">${room.price} / Per Night</p>
                      <div className="d-flex justify-content-between">
                        <p className="card-text text-muted">{room.beds} Beds</p>
                        <p className="card-text text-muted">{room.type} Room</p>
                      </div>
                      <p className="card-text text-muted" style={{ fontWeight: 'bold' }}>
                        <span role="img" aria-label="location" style={{ marginRight: '5px' }}>📍</span>
                        {room.location}
                      </p>
                      <p className="card-text text-muted" style={{ fontWeight: 'bold' }}>
                        <span role="img" aria-label="calendar" style={{ marginRight: '5px' }}>📅</span>
                        {formatAvailableDates(room.startAvailableDate, room.endAvailableDate)}
                      </p>
                      <p className="card-text text-muted">{room.amenities}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleBooking(room._id, userId)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No rooms available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RoomsPage;
