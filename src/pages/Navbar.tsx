import React from 'react';
import '../styles/navbar.css';
import { Outlet, Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <>
        <nav className='navbar'>
            <h2>Algorithm Visualiser</h2>
            <ul>
                <li><Link to="/sorting">Sorting Algorithms</Link></li>
                <li><Link to="/search">Search Algorithms</Link></li>
                <li><Link to="/pathfinding">Pathfinding Algorithms</Link></li>
                <li><Link to="/graph">Graph Algorithms</Link></li>
            </ul>
        </nav>
        <Outlet />
        </>
    );
};

export default Navbar;