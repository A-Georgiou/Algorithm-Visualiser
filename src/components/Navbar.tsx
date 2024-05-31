import React from 'react';
import '../styles/navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className='navbar'>
            <h2>Algorithm Visualiser</h2>
            <ul>
                <li>Sorting Algorithms</li>
                <li>Search Algorithms</li>
                <li>Pathfinding Algorithms</li>
                <li>Graph Algorithms</li>
            </ul>
        </nav>
    );
};

export default Navbar;