// useMaze.ts
import { useState, useEffect } from 'react';
import { Cell } from '../algorithms/utils/PathfindingUtils';

const mazeHooks = (width: number, height: number) => {
    const [maze, setMaze] = useState<Cell[][]>([]);
    const [startNode, setStartNode] = useState<number[]>([0, 0]);
    const [endNode, setEndNode] = useState<number[]>([0, 0]);

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

    function clearLatestRun(){
        clearAttribute('visited');
        clearAttribute('finalPath');
    }

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

    return {
        maze,
        setMaze,
        startNode,
        endNode,
        setStartNode,
        setEndNode,
        generateTable,
        clearLatestRun,
        populateOptimalPath,
    };
};

export default mazeHooks;
