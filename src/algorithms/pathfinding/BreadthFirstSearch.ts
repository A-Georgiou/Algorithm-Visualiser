import { Cell, getNeighbors, getOptimalPath } from "../utils/PathfindingUtils";
import { sleep } from '../utils/SleepTime';

// Define a function to perform breadth-first search on the maze
export async function BreadthFirstSearch(maze: Cell[][], startCell: Cell, endCell: Cell, setMaze: (arr: Cell[][]) => void ): Promise<Cell[] | null> {
    const queue: Cell[] = [];
    const visited: boolean[][] = [];

    // Initialize the visited array
    for (let row = 0; row < maze.length; row++) {
        visited[row] = [];
        for (let col = 0; col < maze[row].length; col++) {
            visited[row][col] = false;
        }
    }

    // Add the start cell to the queue
    queue.push(startCell);
    visited[startCell.row][startCell.col] = true;
    maze[startCell.row][startCell.col].visited = true;

    // Perform breadth-first search
    while (queue.length > 0) {
        const currentCell = queue.shift();
        if (!currentCell) {
            continue;
        }
        // Check if we have reached the end cell
        if (currentCell.row === endCell.row && currentCell.col === endCell.col) {
            return getOptimalPath(maze, startCell, endCell);
        }

        // Get the neighbors of the current cell
        const neighbors = getNeighbors(maze, currentCell);

        // Visit each neighbor
        for (const neighbor of neighbors) {
            if (!visited[neighbor.row][neighbor.col]) {
                queue.push(neighbor);
                visited[neighbor.row][neighbor.col] = true;
                maze[neighbor.row][neighbor.col].visited = true;
                maze[neighbor.row][neighbor.col].prev = currentCell;
            }
        }
        await sleep(0);
        setMaze([...maze]);
    }

    // If we reach here, there is no path from start to end
    return null;
}