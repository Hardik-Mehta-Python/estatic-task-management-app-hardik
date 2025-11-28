import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css" 

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/home">TaskManager</Link>
            </div>
            <div className="navbar-links">
                <Link to="/home">Home</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;
