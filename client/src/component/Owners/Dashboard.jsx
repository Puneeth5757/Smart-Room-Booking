// OwnerDashboard.js
import  { useState } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
  const [roomName, setRoomName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [amenities, setAmenities] = useState('');

  const handleRoomRegistration = async (e) => {
    e.preventDefault();
    const roomData = {
      name: roomName,
      location,
      price,
      availableDate,
      amenities,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/rooms', roomData);
      console.log(response)
      alert('Room registered successfully');
      // Clear the form
      setRoomName('');
      setLocation('');
      setPrice('');
      setAvailableDate('');
      setAmenities('');
    } catch (error) {
      console.error(error);
      alert('Room registration failed');
    }
  };

  return (
    <div>
      <br /><br />
      <h2>Owner Dashboard</h2>
      <form onSubmit={handleRoomRegistration}>
        <div>
          <label>Room Name</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Available Date</label>
          <input
            type="date"
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amenities</label>
          <textarea
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Register Room</button>
      </form>
    </div>
  );
};

export default OwnerDashboard;
