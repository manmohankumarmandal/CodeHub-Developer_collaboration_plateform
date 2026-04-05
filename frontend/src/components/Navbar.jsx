import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';
const Navbar = () => {
  return (
    <nav>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div>
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
          <h3>GitHub</h3>
        </div>
      </Link>
      <div>
        <Link to="/create" style={{ textDecoration: "none" }} >
          <p >Create a Repository</p>
        </Link>
        <Link to="/issue" style={{ textDecoration: "none" }}>
          <p>Create issue</p>
        </Link>
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <p >Profile</p>
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;