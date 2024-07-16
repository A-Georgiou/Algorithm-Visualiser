import React, { useState, useEffect } from 'react';
import useWindowDimensions from '../utils/useWindowDimensions';
import '../styles/pathfinding.css';
import MazeGrid from '../components/MazeGrid.tsx';
import mazeHooks from '../utils/mazeHooks.ts';
import pathfindingAlgorithmHooks from '../utils/pathfindingAlgorithmHooks.ts';
import ControlPanel from '../components/ControlPanel.tsx';

const PathfindingVisualiser: React.FC = () => {
    const { width = 0, height = 0 } = useWindowDimensions();
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [drawingValue, setDrawingValue] = useState<boolean>(false);
    const [isMovingNode, setIsMovingNode] = useState<'start' | 'end' | null>(null);

    useEffect(() => {
        generateTable();
    }, [width, height]);

    const {
        maze,
        setMaze,
        startNode,
        endNode,
        setStartNode,
        setEndNode,
        generateTable,
        clearLatestRun,
        populateOptimalPath,
    } = mazeHooks(width, height);

    const { triggerAlgorithm }  = pathfindingAlgorithmHooks({
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

    return (
        <div>
            <ControlPanel triggerAlgorithm={triggerAlgorithm} generateTable={generateTable} clearLatestRun={clearLatestRun}/>
            <MazeGrid
                maze={maze}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                handleMouseUp={handleMouseUp}
            />
        </div>
    );
};

export default PathfindingVisualiser;
