// ControlPanel.tsx
import React, { useState } from 'react';
import { Algorithm } from '../utils/AlgorithmEnum';

interface ButtonLayoutProps {
    triggerAlgorithm: (algorithm: Algorithm) => void,
    generateTable: () => void,
    clearLatestRun: () => void
}

const ControlPanel: React.FC<ButtonLayoutProps> = ({ triggerAlgorithm, generateTable, clearLatestRun}) => {
    const [pathfindingAlgorithm, setPathfindingAlgorithm] = useState<Algorithm>(Algorithm.BFS);
    const [mazeAlgorithm, setMazeAlgorithm] = useState<Algorithm>(Algorithm.PRIMS_MAZE);

    function runPathfindingAlgorithm(){
        triggerAlgorithm(pathfindingAlgorithm);
    }

    function generateMaze(){
        triggerAlgorithm(mazeAlgorithm);
    }

    return (
        <div className="floating-control-panel">
            <select id="pathfinding-selector" className="control-panel-select" onChange={(event) => {setPathfindingAlgorithm(event.target.value as Algorithm)}}>
                <option value={Algorithm.BFS}>Breadth First Search</option>
                <option value={Algorithm.DFS}>Depth First Search</option>
                <option value={Algorithm.DIJKSTRA}>Djikstra</option>
            </select>
            <button className="control-panel-btn" onClick={() => runPathfindingAlgorithm()}>Visualise Algorithm</button>
            <select id="maze-selector" className="control-panel-select" onChange={(event) => {setMazeAlgorithm(event.target.value as Algorithm)}}>
                <option value={Algorithm.PRIMS_MAZE}>Prims Maze</option>
                <option value={Algorithm.DFS_MAZE}>DFS Maze</option>
                <option value={Algorithm.KRUSKAL_MAZE}>Kruskals Maze</option>
                <option value={Algorithm.RECURSIVE_DIVISION_MAZE}>Recursive Division Maze</option>
                <option value={Algorithm.RECURSIVE_DIVISION_MAZE_HORIZONTAL_BIAS}>Recursive Division Maze (Horizontal)</option>
                <option value={Algorithm.RECURSIVE_DIVISION_MAZE_VERTICAL_BIAS}>Recursive Division Maze (Vertical)</option>
            </select>
            <button className="control-panel-btn" onClick={() => generateMaze()}>Generate Maze</button>
            <button className="control-panel-btn" onClick={() => generateTable()}>Reset Board</button>
            <button className="control-panel-btn" onClick={() => clearLatestRun()}>Clear Latest Run</button>
        </div>
    );
};

export default ControlPanel;