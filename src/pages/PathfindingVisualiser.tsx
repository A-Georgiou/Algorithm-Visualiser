import React, { useState, useEffect } from 'react';
import useWindowDimensions from '../utils/useWindowDimensions';
import '../styles/pathfinding.css';
import { HiChevronRight } from "react-icons/hi";
import { Cell } from '../algorithms/utils/PathfindingUtils';
import { BreadthFirstSearch } from '../algorithms/pathfinding/BreadthFirstSearch.ts';

const PathfindingVisualiser: React.FC = () => {
    const { width = 0, height = 0 } = useWindowDimensions();
    const [maze, setMaze] = useState<Cell[][]>([]);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [drawingValue, setDrawingValue] = useState<boolean>(false);
    const [startNode, setStartNode] = useState<number[]>([0, 0]);
    const [endNode, setEndNode] = useState<number[]>([0, 0]);
    const [isMovingNode, setIsMovingNode] = useState<'start' | 'end' | null>(null);

    useEffect(() => {
        generateTable();
    }, [width, height]);

    function setStartPosition(flatHeight: number, flatWidth: number){
        const rowIndex = Math.floor(flatHeight / 2);
        const colIndex = Math.floor(flatWidth / 4);
        setMaze(prevMaze => {
            const newMaze = [...prevMaze];
            newMaze[rowIndex][colIndex] = new Cell(rowIndex, colIndex);
            newMaze[rowIndex][colIndex].start = true;
            return newMaze;
        });
        setStartNode([rowIndex, colIndex]);
    }

    function setEndPosition(flatHeight: number, flatWidth: number){
        const rowIndex = Math.floor(flatHeight / 2);
        const colIndex = Math.floor(flatWidth * 3 / 4);
        setMaze(prevMaze => {
            const newMaze = [...prevMaze];
            newMaze[rowIndex][colIndex] = new Cell(rowIndex, colIndex);
            newMaze[rowIndex][colIndex].end = true;
            return newMaze;
        });
        setEndNode([rowIndex, colIndex]);
    }

    function generateTable() {
        const flatHeight = Math.floor(height / 27);
        const flatWidth = Math.floor((width - 300) / 27);
        const newMaze = [];
        for (let i = 0; i < flatHeight; i++) {
            const row = [];
            for (let j = 0; j < flatWidth; j++) {
                row.push(new Cell(i, j));
            }
            newMaze.push(row);
        }
        setMaze(newMaze);
        setStartPosition(flatHeight, flatWidth);
        setEndPosition(flatHeight, flatWidth);
    }

    const handleMouseDown = (rowIndex: number, colIndex: number) => {
        if (maze[rowIndex][colIndex].start) {
            setIsMovingNode('start');
        } else if (maze[rowIndex][colIndex].end) {
            setIsMovingNode('end');
        } else {
            setIsDrawing(true);
            const currentCellValue = maze[rowIndex][colIndex];
            setDrawingValue(currentCellValue.wall ? false : true);
            drawCell(rowIndex, colIndex, currentCellValue.wall ? false : true);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        setIsMovingNode(null);
    };

    const handleMouseEnter = (rowIndex: number, colIndex: number) => {
        if (isDrawing) {
            drawCell(rowIndex, colIndex, drawingValue);
        } else if (isMovingNode) {
            moveNode(rowIndex, colIndex, isMovingNode);
        }
    };

    const drawCell = (rowIndex: number, colIndex: number, value: boolean) => {
        if (rowIndex === startNode[0] && colIndex === startNode[1]) return;
        if (rowIndex === endNode[0] && colIndex === endNode[1]) return;
        setMaze(prevMaze => {
            const newMaze = [...prevMaze];
            newMaze[rowIndex][colIndex].wall = value;
            return newMaze;
        });
    };

    const moveNode = (rowIndex: number, colIndex: number, nodeType: 'start' | 'end') => {
        setMaze(prevMaze => {
            const newMaze = [...prevMaze];
            if (nodeType === 'start') {
                newMaze[startNode[0]][startNode[1]].start = false;
                newMaze[rowIndex][colIndex].start = true;
                setStartNode([rowIndex, colIndex]);
            } else if (nodeType === 'end') {
                newMaze[endNode[0]][endNode[1]].end = false;
                newMaze[rowIndex][colIndex].end = true;
                setEndNode([rowIndex, colIndex]);
            }
            return newMaze;
        });
    };

    function triggerBFS(){
        let visited = BreadthFirstSearch(maze, maze[startNode[0]][startNode[1]], maze[endNode[0]][endNode[1]]);
        console.log(visited);
    }

    return (
        <div>
            <div onMouseUp={handleMouseUp}>
                {maze.map((row, rowIndex) => (
                    <div key={rowIndex} className="pathfinding-row" id={'row-' + rowIndex}>
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                style={{
                                    width: '26px',
                                    height: '26px',
                                    backgroundColor: cell.start ? 'lightblue' : ( cell.end ? 'lightgreen' :  ( cell.visited ? 'orange' : (cell.wall ? 'black' : 'white'))),
                                    border: '.5px solid lightblue',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                {cell.start ? <HiChevronRight style={{color: 'black', fontSize: '26px'}} /> : ''}
                                {cell.end ? <HiChevronRight style={{color: 'black', fontSize: '26px', transform: 'rotate(180deg)'}} /> : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={() => triggerBFS()}></button>
        </div>
    );
};

export default PathfindingVisualiser;
