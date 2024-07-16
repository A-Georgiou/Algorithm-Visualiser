import { Cell } from "../utils/PathfindingUtils";
import { useMazeStore } from '../../hooks/useMazeStore';

function getNeighbors(maze: Cell[][], cell: Cell): Cell[] {
    const neighbors: Cell[] = [];
    const { row, col } = cell;

    const directions = [
        { row: -2, col: 0 },  // Up
        { row: 2, col: 0 },   // Down
        { row: 0, col: -2 },  // Left
        { row: 0, col: 2 }    // Right
    ];

    for (let direction of directions) {
        const newRow = row + direction.row;
        const newCol = col + direction.col;

        if (newRow > 0 && newRow < maze.length - 1 && newCol > 0 && newCol < maze[0].length - 1) {
            neighbors.push(maze[newRow][newCol]);
        }
    }

    return neighbors;
}

function initialiseAllWalls(maze: Cell[][]): Cell[][] {
    return maze.map(row =>
        row.map(cell => ({ ...cell, wall: true }))
    );
}

export async function dfsMazeGeneration(startCell: Cell, endCell: Cell) {
    const { maze, setMaze } = useMazeStore.getState();

    let newMaze = initialiseAllWalls(maze);
    let stack = [newMaze[1][1]];
    newMaze[1][1].wall = false;

    while (stack.length > 0) {
        let current = stack[stack.length - 1];
        let neighbors = getNeighbors(newMaze, current).filter(n => n.wall);

        if (neighbors.length > 0) {
            let next = neighbors[Math.floor(Math.random() * neighbors.length)];
            stack.push(next);

            // Remove the wall between the current cell and the chosen neighbor
            const midRow = current.row + (next.row - current.row) / 2;
            const midCol = current.col + (next.col - current.col) / 2;
            newMaze[midRow][midCol].wall = false;

            // Mark the chosen neighbor as part of the maze
            newMaze[next.row][next.col].wall = false;
        } else {
            stack.pop();
        }
    }

    newMaze[startCell.row][startCell.col].wall = false;
    newMaze[endCell.row][endCell.col].wall = false;
    setMaze(newMaze);
}
