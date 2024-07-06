import React, { useState, useEffect } from 'react';
import useWindowDimensions from '../utils/useWindowDimensions';
import '../styles/pathfinding.css';
import { HiChevronDoubleRight } from "react-icons/hi2";
import { HiOutlineFlag } from "react-icons/hi";
import { Cell } from '../algorithms/utils/PathfindingUtils';
import { BreadthFirstSearch } from '../algorithms/pathfinding/BreadthFirstSearch.ts';
import { Dijkstra } from '../algorithms/pathfinding/Dijkstra.ts';
import { DepthFirstSearch } from '../algorithms/pathfinding/DepthFirstSearch.ts';
import { primsMazeGeneration } from '../algorithms/mazes/PrimsMazeGeneration.ts';
import { dfsMazeGeneration } from '../algorithms/mazes/DFSMazeGeneration.ts';

const PathfindingVisualiser: React.FC = () => {
    const { width = 0, height = 0 } = useWindowDimensions();
    const [maze, setMaze] = useState<Cell[][]>([]);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [drawingValue, setDrawingValue] = useState<boolean>(false);
    const [startNode, setStartNode] = useState<number[]>([0, 0]);
    const [endNode, setEndNode] = useState<number[]>([0, 0]);
    const [isMovingNode, setIsMovingNode] = useState<'start' | 'end' | null>(null);
    const [runDijkstra, setRunDijkstra] = useState<boolean>(false);
    const [runBFS, setRunBFS] = useState<boolean>(false);
    const [runDFS, setRunDFS] = useState<boolean>(false);
    const [generatePrimsMaze, setGeneratePrimsMaze] = useState<boolean>(false);
    const [generateDFSMaze, setGenerateDFSMaze] = useState<boolean>(false);

    useEffect(() => {
        generateTable();
    }, [width, height]);

    useEffect(() => {
        if (runDijkstra) {
            callDijkstra();
            setRunDijkstra(false);
        }
    }, [runDijkstra]);

    useEffect(() => {
        if (runBFS) {
            callBFS();
            setRunBFS(false);
        }
    }, [runBFS]);

    useEffect(() => {
        if (runDFS) {
            callDFS();
            setRunDFS(false);
        }
    }, [runDFS]);

    useEffect(() => {
        if (generatePrimsMaze) {
            primsMazeRun();
            setGeneratePrimsMaze(false);
        }
    }, [generatePrimsMaze]);

    useEffect(() => {
        if (generateDFSMaze) {
            DFSMazeRun();
            setGenerateDFSMaze(false);
        }
    }, [generateDFSMaze]);

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
        let flatHeight = Math.floor((height - 26) / 26);
        if (flatHeight % 2 === 0) flatHeight += 1; 
        let flatWidth = Math.floor((width - 326) / 26);
        if (flatWidth % 2 === 0) flatWidth += 1; 

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

    function clearAttribute(attribute: keyof Cell) {
        if (maze.length === 0 || maze[0].length === 0) {
            console.error(`Maze is empty or not initialized.`);
            return;
        }
    
        const sampleCell = maze[0][0];
        const validAttributes = Object.keys(sampleCell);
    
        if (!validAttributes.includes(attribute)) {
            console.error(`Invalid attribute: ${attribute}`);
            return;
        }
    
        setMaze(prevMaze => prevMaze.map(row =>
            row.map(cell => ({ ...cell, [attribute]: false }))
        ));
    };

    async function populateOptimalPath(optimalPath: Cell[] | null) {
        if (!optimalPath) {
            return;
        }
    
        const delay = 50; // Delay in milliseconds between each update
    
        const updateCell = (index: number) => {
            if (index >= optimalPath.length) {
                return;
            }
    
            setMaze(prevMaze => {
                const newMaze = prevMaze.map(row => row.map(cell => ({ ...cell })));
                newMaze[optimalPath[index].row][optimalPath[index].col].finalPath = true;
                return newMaze;
            });
    
            // Schedule the next update with delay
            requestAnimationFrame(() => setTimeout(() => updateCell(index + 1), delay));
        };
    
        updateCell(0);
    }

    async function callBFS(){
        const optimalPath = await BreadthFirstSearch(maze, maze[startNode[0]][startNode[1]], maze[endNode[0]][endNode[1]], setMaze);
        await populateOptimalPath(optimalPath);
    }

    async function callDijkstra(){
        const optimalPath = await Dijkstra(maze, maze[startNode[0]][startNode[1]], maze[endNode[0]][endNode[1]], setMaze);
        await populateOptimalPath(optimalPath);
    }

    async function callDFS(){
        const optimalPath = await DepthFirstSearch(maze, maze[startNode[0]][startNode[1]], maze[endNode[0]][endNode[1]], setMaze);
        await populateOptimalPath(optimalPath);
    }

    function triggerBFS(){
        clearAttribute('visited');
        clearAttribute('finalPath');
        setRunBFS(true);
    }

    function triggerDijkstra(){
        clearAttribute('visited');
        clearAttribute('finalPath');
        setRunDijkstra(true);
    }

    function triggerDFS(){
        clearAttribute('visited');
        clearAttribute('finalPath');
        setRunDFS(true);
    }

    function primsMazeRun(){
        clearAttribute('visited');
        clearAttribute('finalPath');
        setGeneratePrimsMaze(true);
    }

    function DFSMazeRun(){
        clearAttribute('visited');
        clearAttribute('finalPath');
        setGenerateDFSMaze(true);
    }

    function triggerPrimsMaze(){      
        primsMazeGeneration(maze, maze[startNode[0]][startNode[1]], maze[endNode[0]][endNode[1]], setMaze);
    }

    function triggerDFSMaze(){
        dfsMazeGeneration(maze, maze[startNode[0]][startNode[1]], maze[endNode[0]][endNode[1]], setMaze);
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
                                    width: '25px',
                                    height: '25px',
                                    backgroundColor: cell.wall  ? 'black' : (cell.finalPath ? 'yellow'  : (cell.visited ? 'lightblue' : 'white')),
                                    border: '.5px solid lightblue',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                {cell.start ? <HiChevronDoubleRight style={{color: 'black', fontSize: '26px'}} /> : ''}
                                {cell.end ? <HiOutlineFlag style={{color: 'black', fontSize: '26px'}} /> : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={() => {triggerBFS();}} style={{backgroundColor: 'white', color: 'black'}}>Run BFS Visualisation</button>
            <button onClick={() => {triggerDFS();}} style={{backgroundColor: 'white', color: 'black'}}>Run DFS Visualisation</button>
            <button onClick={() => {triggerDijkstra();}} style={{backgroundColor: 'white', color: 'black'}}>Run Djikstra Visualisation</button>
            <button onClick={() => {triggerPrimsMaze();}} style={{backgroundColor: 'white', color: 'black'}}>Generate Prims Maze</button>
            <button onClick={() => {triggerDFSMaze();}} style={{backgroundColor: 'white', color: 'black'}}>Generate DFS Maze</button>
            <button onClick={() => generateTable()} style={{backgroundColor: 'white', color: 'black'}}>Reset Board</button>
            <button onClick={() => {clearAttribute('visited'); clearAttribute('finalPath')}} style={{backgroundColor: 'white', color: 'black'}}>Clear Latest Run</button>
        </div>
    );
};

export default PathfindingVisualiser;
