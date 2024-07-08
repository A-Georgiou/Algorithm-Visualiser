import { useState, useEffect } from 'react';
import { Cell } from '../algorithms/utils/PathfindingUtils';
import { BreadthFirstSearch } from '../algorithms/pathfinding/BreadthFirstSearch.ts';
import { Dijkstra } from '../algorithms/pathfinding/Dijkstra.ts';
import { DepthFirstSearch } from '../algorithms/pathfinding/DepthFirstSearch.ts';
import { primsMazeGeneration } from '../algorithms/mazes/PrimsMazeGeneration.ts';
import { dfsMazeGeneration } from '../algorithms/mazes/DFSMazeGeneration.ts';

interface PathfindingAlgorithmHooksProps {
    clearLatestRun: () => void;
    populateOptimalPath: (optimalPath: Cell[]) => void;
    maze: Cell[][];
    startNode: number[];
    endNode: number[];
    setMaze: (maze: Cell[][]) => void;
}

const pathfindingAlgorithmHooks = ({
    clearLatestRun,
    populateOptimalPath,
    maze,
    startNode,
    endNode,
    setMaze,
}: PathfindingAlgorithmHooksProps) => {
    const [algorithm, setAlgorithm] = useState<string | null>(null);

    useEffect(() => {
        if (!algorithm) return;

        const startCell = maze[startNode[0]][startNode[1]];
        const endCell = maze[endNode[0]][endNode[1]];

        const algorithmMap: Record<string, () => Promise<void> | void> = {
            bfs: async () => {
                const optimalPath = await BreadthFirstSearch(maze, startCell, endCell, setMaze);
                if (optimalPath) populateOptimalPath(optimalPath);
            },
            dijkstra: async () => {
                const optimalPath = await Dijkstra(maze, startCell, endCell, setMaze);
                if (optimalPath) populateOptimalPath(optimalPath);
            },
            dfs: async () => {
                const optimalPath = await DepthFirstSearch(maze, startCell, endCell, setMaze);
                if (optimalPath) populateOptimalPath(optimalPath);
            },
            primsMaze: () => {
                primsMazeGeneration(maze, startCell, endCell, setMaze);
            },
            dfsMaze: () => {
                dfsMazeGeneration(maze, startCell, endCell, setMaze);
            },
        };

        algorithmMap[algorithm]?.();

        setAlgorithm(null);
    }, [algorithm, maze, startNode, endNode, clearLatestRun, populateOptimalPath, setMaze]);

    const triggerAlgorithm = (algorithm: 'bfs' | 'dijkstra' | 'dfs' | 'primsMaze' | "dfsMaze") => {
        clearLatestRun();
        setAlgorithm(algorithm)};

    return {
        triggerAlgorithm,
    };
};

export default pathfindingAlgorithmHooks;
