import React, { useState, useEffect } from 'react';

const PathfindingVisualiser: React.FC = () => {
    const [maze, setMaze] = useState<number[][]>([]);

    useEffect(() => {
        generateMaze();
    }, []);

    const generateMaze = () => {
        const rows = 10;
        const cols = 10;
        const newMaze: number[][] = [];
        for (let i = 0; i < rows; i++) {
            const row: number[] = [];
            for (let j = 0; j < cols; j++) {
                row.push(1);
            }
            newMaze.push(row);
        }

        setMaze(newMaze);
    };

    return (
        <div>
            {maze.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: cell === 1 ? 'black' : 'white',
                                border: '1px solid black',
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PathfindingVisualiser;