import React from 'react';
import '../styles/navbar.css';
import { Outlet, Link } from "react-router-dom";
const Navbar: React.FC = () => {
    return (
        <>
        <nav className='navbar'>
            <div className='navbar-header'>
                <h2>Algorithm Visualiser</h2>
            </div>
            <ul>
                <li><Link to="/pathfinding">Pathfinding Algorithms</Link></li>
                <li><Link to="/sorting">Sorting Algorithms</Link></li>
                <li><Link to="/search">Search Algorithms</Link></li>
                <li><Link to="/graph">Graph Algorithms</Link></li>
            </ul>
        </nav>
        <Outlet />
        </>
    );
};

export default Navbar;