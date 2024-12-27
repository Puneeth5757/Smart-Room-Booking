import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { LoginContext } from "../../LandingSite/Auth/ContextProvider/Context";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logindata } = useContext(LoginContext);

  useEffect(() => {}, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('ownersdatatoken');
    localStorage.removeItem('uid');
    navigate('/');
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate('/ownerdash/profile');
    handleMenuClose();
  };

  return (
    <>
      <header className="bgcolor p-3">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg fixed-top d-flex justify-content-between px-5">
            <h1 className="navbar-brand mb-0">
              {/* Add fallback if logindata or ValidUserOne is undefined */}
              Email: {logindata && logindata.ValidUserOne ? logindata.ValidUserOne.email : "No email available"}
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
