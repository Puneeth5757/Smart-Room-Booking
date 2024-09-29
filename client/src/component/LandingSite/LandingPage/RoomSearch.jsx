import "../LandingPage/RoomSearch.css";

const RoomSearch = () => {
  return (
    <div>
      <div className="homepage">
        <div className="hero-image">
          <div className="content">
          <h1>Luxurious Rooms</h1>
          <p>Deluxe Rooms Starting At $299</p>

          <div className="login-buttons">
            <button className="owner-login">
              <a href="/owner-login">Owner Login</a>
            </button>
            <button className="user-login">
              <a href="/login">User Login</a>
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSearch;
