// RoomsPage.js
import  { useState, useEffect } from 'react';
import axios from 'axios';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      <br /><br />
      <h2>Available Rooms</h2>
      <div className="room-cards">
        {rooms.map((room) => (
          <div key={room._id} className="room-card">
            <h3>{room.name}</h3>
            <p>Location: {room.location}</p>
            <p>Price: ${room.price}</p>
            <p>Available Date: {new Date(room.availableDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;