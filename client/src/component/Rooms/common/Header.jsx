import "./Header.css";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react'; 

const Header = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(true);
  console.log(loginData) // Initialize loginData and setLoginData

  const handleLogout = async () => {
    try {
      let token = localStorage.getItem("usersdatatoken");

      const res = await fetch("http://localhost:3000/api/users/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept: "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === 201) {
        console.log("User logged out successfully");
        localStorage.removeItem("usersdatatoken");
        setLoginData(false); // Update login state
        navigate("/"); // Redirect to the home or login page
      } else {
        console.log("Logout error");
      }
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <>
      <header className="bgcolor p-3">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg fixed-top d-flex justify-content-between px-5">
            <h1 className="navbar-brand mb-0">
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
