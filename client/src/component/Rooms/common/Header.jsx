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
          <nav className="navbar navbar-expand-lg fixed-top d-flex justify-content-between px-5">
            <h1 className="navbar-brand mb-0 ">
              Email: example@example.com {/* Replace with actual user email */}
            </h1>
            <div className="d-flex align-items-center">
              <Button onClick={handleLogout}>
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
