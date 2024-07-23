import { Cell, getOptimalPath } from '../utils/PathfindingUtils';
import { useMazeStore } from '../../hooks/useMazeStore';

// Define a generator function for depth-first search on the maze
function* dfsGenerator(maze: Cell[][], startCell: Cell, endCell: Cell): Generator<Cell[][] | Cell[] | null, unknown> {
    const stack: Cell[] = [];

    stack.push(startCell);
    maze[startCell.row][startCell.col].visited = true;

    while (stack.length > 0) {
        const currentCell = stack.pop();
    
        if (!currentCell) {
            continue;
        }

        currentCell.visited = true;

        if (currentCell.row === endCell.row && currentCell.col === endCell.col) {
            return getOptimalPath(maze, startCell, endCell);
        }

        let neighbors = getNeighbors(maze, currentCell);

        for (let neighbor of neighbors) {
            if (!neighbor.visited) {
                neighbor.prev = currentCell;
                stack.push(neighbor);
            }
        }
        yield maze;
    }

    yield null;
}

// Define a function to animate the depth-first search
export async function DepthFirstSearch(startCell: Cell, endCell: Cell): Promise<Cell[] | null> {
    const { maze, setMaze, populateOptimalPath } = useMazeStore.getState();
    const generator = dfsGenerator(maze, startCell, endCell);

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

// Helper function to get the neighbors of a cell
export function getNeighbors(cells: Cell[][], cell: Cell): Cell[] {
    const neighbors: Cell[] = [];
    const { row, col } = cell;

    if (row > 0 && !cells[row - 1][col].wall) {
        neighbors.push(cells[row - 1][col]);
    }
    if (col > 0 && !cells[row][col - 1].wall) {
        neighbors.push(cells[row][col - 1]);
    }

    if (row < cells.length - 1 && !cells[row + 1][col].wall) {
        neighbors.push(cells[row + 1][col]);
    }

    if (col < cells[0].length - 1 && !cells[row][col + 1].wall) {
        neighbors.push(cells[row][col + 1]);
    }

    return neighbors;
}
