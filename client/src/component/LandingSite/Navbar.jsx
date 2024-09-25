import "../../component/Component.css"
    import { Link } from "react-router-dom";

    function Navbar() {
        return (
          <nav className="navbar fixed-top navbar-light navbg">
            <Link to="/" className="navbar-brand mx-3">
              <b>Room Booking</b>
            </Link>
            <div className="ml-auto d-flex">
              <Link to="/" className="nav-link mx-2">
                Home
              </Link>
              <Link to="/dashboard" className="nav-link mx-2">
                Rooms
              </Link>
              <Link to="/owner-login" className="nav-link mx-2">
                Owner-login
              </Link>
              <Link to="/login" className="nav-link mx-2">
                Login
              </Link>
            </div>
          </nav>
        );
      }
      
      export { Navbar };
