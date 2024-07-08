import React from 'react';
import { Cell } from '../algorithms/utils/PathfindingUtils';
import { HiChevronDoubleRight, HiOutlineFlag } from "react-icons/hi";
import '../styles/pathfinding.css';


interface MazeGridProps {
    maze: Cell[][],
    handleMouseDown: (rowIndex: number, colIndex: number) => void,
    handleMouseEnter: (rowIndex: number, colIndex: number) => void,
    handleMouseUp: () => void
}

const MazeGrid: React.FC<MazeGridProps> = ({ maze, handleMouseDown, handleMouseEnter, handleMouseUp }) => {
    return (
        <div onMouseUp={handleMouseUp}>
            {maze.map((row, rowIndex) => (
                <div key={rowIndex} className="pathfinding-row" id={'row-' + rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            style={{
                                width: '25px',
                                height: '25px',
                                backgroundColor: cell.wall ? 'black' : (cell.finalPath ? 'yellow' : (cell.visited ? 'lightblue' : 'white')),
                                border: '.5px solid lightblue',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            {cell.start ? <HiChevronDoubleRight style={{ color: 'black', fontSize: '26px' }} /> : ''}
                            {cell.end ? <HiOutlineFlag style={{ color: 'black', fontSize: '26px' }} /> : ''}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MazeGrid;