import React, { useState, useEffect } from 'react';
import useWindowDimensions from '../utils/useWindowDimensions';
import '../styles/pathfinding.css';
import { HiChevronDoubleRight } from "react-icons/hi2";
import { HiOutlineFlag } from "react-icons/hi";
import { Cell } from '../algorithms/utils/PathfindingUtils';
import MazeGrid from '../components/MazeGrid.tsx';
import { BreadthFirstSearch } from '../algorithms/pathfinding/BreadthFirstSearch.ts';
import { Dijkstra } from '../algorithms/pathfinding/Dijkstra.ts';
import { DepthFirstSearch } from '../algorithms/pathfinding/DepthFirstSearch.ts';
import { primsMazeGeneration } from '../algorithms/mazes/PrimsMazeGeneration.ts';
import { dfsMazeGeneration } from '../algorithms/mazes/DFSMazeGeneration.ts';
import mazeHooks from '../utils/mazeHooks.ts';

const PathfindingVisualiser: React.FC = () => {
    const { width = 0, height = 0 } = useWindowDimensions();
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [drawingValue, setDrawingValue] = useState<boolean>(false);
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

    const {
        maze,
        setMaze,
        startNode,
        endNode,
        setStartNode,
        setEndNode,
        generateTable,
        clearAttribute,
        populateOptimalPath,
    } = mazeHooks(width, height);

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

    function triggerPrimsMaze(){
        clearAttribute('visited');
        clearAttribute('finalPath');
        setGeneratePrimsMaze(true);
    }

    function triggerDFSMaze(){
        clearAttribute('visited');
        clearAttribute('finalPath');
        setGenerateDFSMaze(true);
    }

    function primsMazeRun(){      
        primsMazeGeneration(maze, maze[startNode[0]][startNode[1]], maze[endNode[0]][endNode[1]], setMaze);
    }

    function DFSMazeRun(){
        dfsMazeGeneration(maze, maze[startNode[0]][startNode[1]], maze[endNode[0]][endNode[1]], setMaze);
    }

    return (
        <div>
            <MazeGrid
                maze={maze}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                handleMouseUp={handleMouseUp}
            />
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
