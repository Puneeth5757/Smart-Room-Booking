import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  // const [ownerInfo, setOwnerInfo] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem('ownersdatatoken');
    // if (token) {
    //   axios.get('http://localhost:3000/api/owners/profile', {
    //     headers: { Authorization: token },
    //   }).then(response => {
    //     setOwnerInfo(response.data.owner); // Assuming the API returns owner info
    //   }).catch(err => {
    //     console.log('Error fetching owner info', err);
    //   });
    // }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('ownersdatatoken');
    navigate('/');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/profile');  // Navigate to Profile Page
    handleMenuClose();
  };

  return (
    <>
      <header className="bgcolor p-3">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg fixed-top d-flex justify-content-between px-5">
            <h1 className="navbar-brand mb-0">
              Email: { "example@example.com"} {/* Display owner email */}
            </h1>
            <div className="d-flex align-items-center">
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                aria-controls="menu-appbar"
                aria-haspopup="true"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
