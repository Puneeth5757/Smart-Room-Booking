import { FaHome, FaBookOpen } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="header d-flex align-items-center justify-content-center mb-3">
        <MdSpaceDashboard className="me-2" /> Dashboard
      </div>
      {/* Sidebar Links */}
      <ul className="list-group list-unstyled">
        <li className="list-group-item">
          <Link to={"/ownerdash/profile"} className="text-decoration-none">
            <FaHome className="icon me-2" /> Profile
          </Link>
        </li>
        <li className="list-group-item">
          <Link to={"/ownerdash/bookings"} className="text-decoration-none">
            <FaBookOpen className="icon me-2" /> Bookings
          </Link>
        </li>
        <li className="list-group-item">
          <Link to={"/ownerdash/complaints"} className="text-decoration-none">
            <GrCompliance className="icon me-2" /> Complaints
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
