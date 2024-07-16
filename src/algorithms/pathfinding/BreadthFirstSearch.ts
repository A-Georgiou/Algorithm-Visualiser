import { Cell, getNeighbors, getOptimalPath } from "../utils/PathfindingUtils";
import { useMazeStore } from '../../hooks/useMazeStore';

// Define a generator function for breadth-first search on the maze
function* bfsGenerator(startCell: Cell, endCell: Cell, maze: Cell[][]): Generator<Cell[][] | Cell[] | null, unknown> {
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
            const optimalPath = getOptimalPath(maze, startCell, endCell);
            return optimalPath;
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
        yield maze;
    }

    // If we reach here, there is no path from start to end
    yield null;
}

// Define a function to animate the breadth-first search
export async function BreadthFirstSearch(startCell: Cell, endCell: Cell): Promise<Cell[] | null> {
    const { maze, setMaze, populateOptimalPath } = useMazeStore.getState();
    const generator = bfsGenerator(startCell, endCell, maze);

    return new Promise((resolve) => {
        function step() {
            const result = generator.next();
            if (result.done) {
                const optimalPath = result.value as Cell[] | null;
                if (optimalPath) {
                    populateOptimalPath(optimalPath);
                }
                resolve(optimalPath);
            } else {
                setMaze(result.value as Cell[][]);
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    });
}
