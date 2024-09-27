import { useState, useEffect } from 'react';
import axios from 'axios';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [numOfBeds, setNumOfBeds] = useState('All');
  const [roomType, setRoomType] = useState('All');

  // Fetch rooms data from the server
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rooms');
        console.log(response.data);  
        setRooms(response.data); 
        setFilteredRooms(response.data); 
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  // Filter rooms based on search term, number of beds, and room type
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

    setFilteredRooms(filtered);
  }, [searchTerm, numOfBeds, roomType, rooms]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Rooms</h2>

      {/* Search and Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
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
            <option value="King">King</option>
            <option value="Queen">Queen</option>
            <option value="Double">Double</option>
          </select>
        </div>
      </div>

      {/* Rooms Listing */}
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
                  <p className="card-text text-muted">{room.beds} Beds</p> {/* Number of Beds */}
                  <p className="card-text text-muted">{room.type} Room</p> {/* Room Type */}
                  <p className="card-text text-muted">Available on: {new Date(room.availableDate).toLocaleDateString()}</p> {/* Available Date */}
                  <p className="card-text text-muted">{room.amenities}</p>
                  <a className="btn btn-primary" href={`/rooms/${room._id}`}>
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;
