import { Cell } from "../utils/PathfindingUtils";

// Define a function to perform breadth-first search on the maze
function BreadthFirstSearch(maze: Cell[][], startRow: number, startCol: number, endRow: number, endCol: number): Cell[][] | null {
    const queue: Cell[] = [];
    const visited: Cell[][] = [];

    // Initialize the visited array
    for (let row = 0; row < maze.length; row++) {
        visited[row] = [];
        for (let col = 0; col < maze[row].length; col++) {
            visited[row][col] = new Cell(row, col);
            visited[row][col].wall = maze[row][col].wall;
        }
    }

    // Add the start cell to the queue
    queue.push(maze[startRow][startCol]);
    visited[startRow][startCol].visited = true;

    // Perform breadth-first search
    while (queue.length > 0) {
        const currentCell = queue.shift();

        if (!currentCell) {
            continue;
        }

        // Check if we have reached the end cell
        if (currentCell.row === endRow && currentCell.col === endCol) {
            return visited;
        }

        // Get the neighbors of the current cell
        const neighbors = getNeighbors(maze, currentCell);

        // Visit each neighbor
        for (const neighbor of neighbors) {
            if (!visited[neighbor.row][neighbor.col].visited) {
                queue.push(neighbor);
                visited[neighbor.row][neighbor.col].visited = true;
            }
        }
    }

    // If we reach here, there is no path from start to end
    return null;
}

// Define a function to get the neighbors of a cell
function getNeighbors(maze: Cell[][], cell: Cell): Cell[] {
    const neighbors: Cell[] = [];
    const { row, col } = cell;

    // Check the top neighbor
    if (row > 0 && !maze[row - 1][col].wall) {
        neighbors.push(maze[row - 1][col]);
    }

    // Check the right neighbor
    if (col < maze[row].length - 1 && !maze[row][col + 1].wall) {
        neighbors.push(maze[row][col + 1]);
    }

    // Check the bottom neighbor
    if (row < maze.length - 1 && !maze[row + 1][col].wall) {
        neighbors.push(maze[row + 1][col]);
    }

    // Check the left neighbor
    if (col > 0 && !maze[row][col - 1].wall) {
        neighbors.push(maze[row][col - 1]);
    }

    return neighbors;
}