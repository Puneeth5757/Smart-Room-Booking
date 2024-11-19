import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Error from "./component/LandingSite/Auth/Error";
import Login from "./component/LandingSite/Auth/Login";
import OwnerLogin from "./component/LandingSite/Auth/OwnerLogin";
import OwnerRegister from "./component/LandingSite/Auth/OwnerRegister";
import Register from "./component/LandingSite/Auth/Register";
import LandingSite from "./component/LandingSite/Index";
import LandingPage from "./component/LandingSite/LandingPage/index";
import OwnerDash from "./component/Owners/Dashboard";
import Profile from "./component/Owners/Profile";
import Bookings from "./component/Owners/Bookings"
import Complaints from "./component/Owners/Complaints"
import RoomRegister from "./component/Owners/RoomRegister";
import RoomDash from "./component/Rooms/Dashboard";
import RoomsPage from "./component/Rooms/RoomsPage";
import UserProfile from "./component/Rooms/User-profile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingSite />}>
        <Route index element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="owner-register" element={<OwnerRegister />} />
        <Route path="owner-login" element={<OwnerLogin />} />
        <Route path="*" element={<Error />} />
      </Route>

      <Route path="ownerdash" element={<OwnerDash />}>
        <Route index element={<RoomRegister />} />
        <Route path="profile" element={<Profile />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="complaints" element={<Complaints />} />
      </Route>

      <Route path="dashboard" element={<RoomDash />}>
        <Route index element={<RoomsPage />} />
        <Route path="User-profile" element={<UserProfile />} />

      </Route>

    </Routes>   
  );
}

export default App;


