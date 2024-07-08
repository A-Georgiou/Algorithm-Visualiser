// ControlPanel.tsx
import React from 'react';

const ControlPanel = ({
    BFSSolver,
    DFSSolver,
    DijkstraSolver,
    PrimsMazeSolver,
    DFSMazeSolver,
    generateTable,
    clearLatestRun
}: {
    BFSSolver: () => void,
    DFSSolver: () => void,
    DijkstraSolver: () => void,
    PrimsMazeSolver: () => void,
    DFSMazeSolver: () => void,
    generateTable: () => void,
    clearLatestRun: () => void
}) => {

    function runAlgorithm(setAlgorithm: () => void): void {
        clearLatestRun();
        setAlgorithm();
    }

    return (
        <div>
            <button onClick={() => runAlgorithm(BFSSolver)} style={{ backgroundColor: 'white', color: 'black' }}>Run BFS Visualisation</button>
            <button onClick={() => runAlgorithm(DFSSolver)} style={{ backgroundColor: 'white', color: 'black' }}>Run DFS Visualisation</button>
            <button onClick={() => runAlgorithm(DijkstraSolver)} style={{ backgroundColor: 'white', color: 'black' }}>Run Dijkstra Visualisation</button>
            <button onClick={() => runAlgorithm(PrimsMazeSolver)} style={{ backgroundColor: 'white', color: 'black' }}>Generate Prims Maze</button>
            <button onClick={() => runAlgorithm(DFSMazeSolver)} style={{ backgroundColor: 'white', color: 'black' }}>Generate DFS Maze</button>
            <button onClick={generateTable} style={{ backgroundColor: 'white', color: 'black' }}>Reset Board</button>
            <button onClick={clearLatestRun} style={{ backgroundColor: 'white', color: 'black' }}>Clear Latest Run</button>
        </div>
    );
};

export default ControlPanel;