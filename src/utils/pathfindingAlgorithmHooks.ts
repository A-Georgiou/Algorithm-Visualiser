import { useState, useEffect } from 'react';
import { Cell } from '../algorithms/utils/PathfindingUtils';
import { BreadthFirstSearch } from '../algorithms/pathfinding/BreadthFirstSearch.ts';
import { Dijkstra } from '../algorithms/pathfinding/Dijkstra.ts';
import { DepthFirstSearch } from '../algorithms/pathfinding/DepthFirstSearch.ts';
import { primsMazeGeneration } from '../algorithms/mazes/PrimsMazeGeneration.ts';
import { dfsMazeGeneration } from '../algorithms/mazes/DFSMazeGeneration.ts';
import { kruskalsMazeGeneration } from '../algorithms/mazes/KruskalsMazeGeneration.ts';
import { recursiveDivisionMazeGeneration } from '../algorithms/mazes/RecursiveDivisionMazeGeneration.ts';
import { Algorithm } from '../utils/AlgorithmEnum.ts';

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
    const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);

    useEffect(() => {
        if (!algorithm) return;

        const startCell = maze[startNode[0]][startNode[1]];
        const endCell = maze[endNode[0]][endNode[1]];

        const algorithmMap: Record<Algorithm, () => Promise<void> | void> = {
            [Algorithm.BFS]: async () => {
                const optimalPath = await BreadthFirstSearch(maze, startCell, endCell, setMaze);
                if (optimalPath) populateOptimalPath(optimalPath);
            },
            [Algorithm.DIJKSTRA]: async () => {
                const optimalPath = await Dijkstra(maze, startCell, endCell, setMaze);
                if (optimalPath) populateOptimalPath(optimalPath);
            },
            [Algorithm.DFS]: async () => {
                const optimalPath = await DepthFirstSearch(maze, startCell, endCell, setMaze);
                if (optimalPath) populateOptimalPath(optimalPath);
            },
            [Algorithm.PRIMS_MAZE]: () => {
                primsMazeGeneration(maze, startCell, endCell, setMaze);
            },
            [Algorithm.DFS_MAZE]: () => {
                dfsMazeGeneration(maze, startCell, endCell, setMaze);
            },
            [Algorithm.KRUSKAL_MAZE]: () => {
                kruskalsMazeGeneration(maze, startCell, endCell, setMaze);
            },
            [Algorithm.RECURSIVE_DIVISION_MAZE]: () => {
                recursiveDivisionMazeGeneration(maze, startCell, endCell, setMaze);
            },
            [Algorithm.RECURSIVE_DIVISION_MAZE_HORIZONTAL_BIAS]: () => {
                recursiveDivisionMazeGeneration(maze, startCell, endCell, setMaze, 0.4);
            },
            [Algorithm.RECURSIVE_DIVISION_MAZE_VERTICAL_BIAS]: () => {
                recursiveDivisionMazeGeneration(maze, startCell, endCell, setMaze, 0.6);
            }
        };

        algorithmMap[algorithm]?.();

        setAlgorithm(null);
    }, [algorithm, maze, startNode, endNode, clearLatestRun, populateOptimalPath, setMaze]);

    const triggerAlgorithm = (algorithm: Algorithm) => {
        clearLatestRun();
        setAlgorithm(algorithm);
    };

    return {
        triggerAlgorithm,
    };
};

export default pathfindingAlgorithmHooks;
