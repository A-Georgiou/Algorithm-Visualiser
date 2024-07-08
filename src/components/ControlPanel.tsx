// ControlPanel.tsx
import React from 'react';
import { Algorithm } from '../utils/AlgorithmEnum';

interface ButtonLayoutProps {
    triggerAlgorithm: (algorithm: Algorithm) => void,
    generateTable: () => void,
    clearLatestRun: () => void
}

const ControlPanel: React.FC<ButtonLayoutProps> = ({ triggerAlgorithm, generateTable, clearLatestRun}) => {
    return (
        <div>
            <button onClick={() => triggerAlgorithm(Algorithm.BFS)} style={{backgroundColor: 'white', color: 'black'}}>Run BFS Visualisation</button>
            <button onClick={() => triggerAlgorithm(Algorithm.BFS)} style={{backgroundColor: 'white', color: 'black'}}>Run DFS Visualisation</button>
            <button onClick={() => triggerAlgorithm(Algorithm.DIJKSTRA)} style={{backgroundColor: 'white', color: 'black'}}>Run Djikstra Visualisation</button>
            <button onClick={() => triggerAlgorithm(Algorithm.PRIMS_MAZE)} style={{backgroundColor: 'white', color: 'black'}}>Generate Prims Maze</button>
            <button onClick={() => triggerAlgorithm(Algorithm.DFS_MAZE)} style={{backgroundColor: 'white', color: 'black'}}>Generate DFS Maze</button>
            <button onClick={() => generateTable()} style={{backgroundColor: 'white', color: 'black'}}>Reset Board</button>
            <button onClick={() => clearLatestRun()} style={{backgroundColor: 'white', color: 'black'}}>Clear Latest Run</button>
        </div>
    );
};

export default ControlPanel;