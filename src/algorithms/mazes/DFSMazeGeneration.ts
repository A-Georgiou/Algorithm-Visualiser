import { Cell } from "../utils/PathfindingUtils";

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

function initialiseAllWalls(maze: Cell[][]): void {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            maze[row][col].wall = true;
        }
    }
}

export function dfsMazeGeneration(maze: Cell[][], startCell: Cell, endCell: Cell, setMaze: (arr: Cell[][]) => void) {
    initialiseAllWalls(maze);

    let stack = [maze[1][1]];
    maze[1][1].wall = false;

    while (stack.length > 0) {
        let current = stack[stack.length - 1];
        let neighbors = getNeighbors(maze, current).filter(n => n.wall);

        if (neighbors.length > 0) {
            let next = neighbors[Math.floor(Math.random() * neighbors.length)];
            stack.push(next);

            // Remove the wall between the current cell and the chosen neighbor
            const midRow = current.row + (next.row - current.row) / 2;
            const midCol = current.col + (next.col - current.col) / 2;
            maze[midRow][midCol].wall = false;

            // Mark the chosen neighbor as part of the maze
            next.wall = false;
        } else {
            stack.pop();
        }
    }

    maze[startCell.row][startCell.col].wall = false;
    maze[endCell.row][endCell.col].wall = false;
    setMaze([...maze]);
}