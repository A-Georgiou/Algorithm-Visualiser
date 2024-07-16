import React from 'react';
import { HiChevronDoubleRight, HiOutlineFlag } from "react-icons/hi";
import { useMazeStore } from '../hooks/useMazeStore';
import '../styles/pathfinding.css';

interface MazeGridProps {
    handleMouseDown: (rowIndex: number, colIndex: number) => void;
    handleMouseEnter: (rowIndex: number, colIndex: number) => void;
    handleMouseUp: () => void;
}

const MazeGrid: React.FC<MazeGridProps> = ({ handleMouseDown, handleMouseEnter, handleMouseUp }) => {
    const { maze } = useMazeStore();

    return (
        <div onMouseUp={handleMouseUp}>
            {maze.map((row, rowIndex) => (
                <div key={rowIndex} className="pathfinding-row wrapper" id={'row-' + rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            className={cell.visited ? 'animate' : 'pathfinding-cell'}
                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            style={{
                                width: '25px',
                                height: '25px',
                                backgroundColor: (cell.wall && !(cell.end || cell.start)) ? 'black' : (cell.finalPath ? 'yellow' : (cell.visited ? 'lightblue' : 'white')),
                                border: '.5px solid lightblue',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            {cell.start && <HiChevronDoubleRight style={{ color: 'black', fontSize: '26px' }} />}
                            {cell.end && <HiOutlineFlag style={{ color: 'black', fontSize: '26px' }} />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MazeGrid;
