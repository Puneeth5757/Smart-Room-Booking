import { useState } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
  const [roomName, setRoomName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [startAvailableDate, setStartAvailableDate] = useState(''); // Start date
  const [endAvailableDate, setEndAvailableDate] = useState(''); // End date
  const [amenities, setAmenities] = useState('');
  const [photo, setPhoto] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [numOfBeds, setNumOfBeds] = useState('');

  const handleRoomRegistration = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', roomName);
    formData.append('location', location);
    formData.append('price', price);

    // Convert dates to ISO format
    formData.append('startAvailableDate', new Date(startAvailableDate).toISOString()); // Start date
    formData.append('endAvailableDate', new Date(endAvailableDate).toISOString());     // End date

    formData.append('amenities', amenities);
    formData.append('photo', photo);
    formData.append('type', roomType);
    formData.append('beds', numOfBeds);

    try {
      const response = await axios.post('http://localhost:3000/api/rooms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      alert('Room registered successfully');
      // Clear the form
      setRoomName('');
      setLocation('');
      setPrice('');
      setStartAvailableDate('');
      setEndAvailableDate('');
      setAmenities('');
      setPhoto(null);
      setRoomType('');
      setNumOfBeds('');
    } catch (error) {
      console.error(error);
      alert('Room registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Owner Dashboard</h2>
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

export default OwnerDashboard;
