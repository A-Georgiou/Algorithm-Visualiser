import React, { useState, useEffect } from 'react';
import useWindowDimensions from '../utils/useWindowDimensions';
import '../styles/pathfinding.css';
import MazeGrid from '../components/MazeGrid';
import { useMazeStore } from '../hooks/useMazeStore';
import pathfindingAlgorithmHooks from '../utils/pathfindingAlgorithmHooks';
import ControlPanel from '../components/ControlPanel';

const PathfindingVisualiser: React.FC = () => {
    const { width = 0, height = 0 } = useWindowDimensions();
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [drawingValue, setDrawingValue] = useState<boolean>(false);
    const [isMovingNode, setIsMovingNode] = useState<'start' | 'end' | null>(null);

    const {
        maze,
        startNode,
        endNode,
        setMaze,
        generateMaze,
        setStartPosition,
        setEndPosition,
        drawCell,
        moveNode,
        clearLatestRun,
        populateOptimalPath,
    } = useMazeStore();

    function initialiseMaze(width: number, height: number) {
        generateMaze(width, height);
        const cellHeight = Math.floor((height - (26 + 64)) / 26);
        const cellWidth = Math.floor((width - 326) / 26);
        setStartPosition(cellHeight, cellWidth);
        setEndPosition(cellHeight, cellWidth);
    }

    useEffect(() => {
        initialiseMaze(width, height);
    }, [width, height]);

    const { triggerAlgorithm } = pathfindingAlgorithmHooks({
        clearLatestRun,
        populateOptimalPath,
        maze,
        startNode,
        endNode,
        setMaze,
    });

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
        } else if (isMovingNode !== null) {
            moveNode(rowIndex, colIndex, isMovingNode);
        }
    };

    return (
        <div>
            <ControlPanel triggerAlgorithm={triggerAlgorithm} generateTable={() => { initialiseMaze(width, height); }} clearLatestRun={clearLatestRun} />
            <MazeGrid handleMouseDown={handleMouseDown} handleMouseEnter={handleMouseEnter} handleMouseUp={handleMouseUp} />
        </div>
    );
};

export default PathfindingVisualiser;
