import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../component/Component.css"
const RoomSearch = () => {


  return (
    <div>
      <div className="homepage">
      <div className="hero-image px-5 py-2 ml-5">
        <img src="../../images/jpeg/defaultBcg2.jpg" alt="Beach Resort" style={{width:1600, height : 800}}/>
      </div>

      <div className="content">
        <h1>Luxurious Rooms</h1>
        <p>Deluxe Rooms Starting At $299</p>

        <div className="login-buttons">
          <button className="owner-login"><a href="/owner-login">Owner Login</a></button>
          <button className="user-login"><a href="/login">user Login</a></button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RoomSearch;
