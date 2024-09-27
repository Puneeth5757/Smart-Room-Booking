import "./Header.css";
import { Button } from 'react-bootstrap';

const Header = () => {

  const handleLogout = () => {
    // Logic for logging out the user (e.g., removing tokens, etc.)
    console.log("User logged out");
  };

  return (
    <>
      <header className="bgcolor p-3">
        <div className="container-fluid">
          <nav className="navbar d-flex justify-content-between">
            <h1 className="navbar-brand mb-0 text-primary">
              Email: example@example.com {/* Replace with actual user email */}
            </h1>
            <div className="d-flex align-items-center">
              <Button variant="outline-primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
