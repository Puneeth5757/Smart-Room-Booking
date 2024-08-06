import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LandingSite from "./component/LandingSite/Index";
import LandingPage from "./component/LandingSite/LandingPage/index";
import Register from "./component/LandingSite/Auth/Register";
import Login from "./component/LandingSite/Auth/Login";
import OwnerRegister from "./component/LandingSite/Auth/OwnerRegister";
import OwnerLogin from "./component/LandingSite/Auth/OwnerLogin";
import RoomsPage from "./component/Rooms/RoomsPage";
import Dashboard from "./component/Owners/Dashboard"
import Error from "./component/LandingSite/Auth/Error";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingSite />}>
        <Route index element={<LandingPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="owner-register" element={<OwnerRegister />} />
        <Route path="owner-login" element={<OwnerLogin />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="owner-dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;


