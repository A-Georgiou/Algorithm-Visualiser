import { Cell, getOptimalPath } from '../utils/PathfindingUtils';
import { sleep } from '../utils/SleepTime';

export async function DepthFirstSearch(maze: Cell[][], startCell: Cell, endCell: Cell, setMaze: (arr: Cell[][]) => void ): Promise<Cell[] | null> {
    const stack: Cell[] = [];
    const visited: boolean[][] = [];
    for (let row = 0; row < maze.length; row++) {
        visited[row] = [];
        for (let col = 0; col < maze[row].length; col++) {
            visited[row][col] = false;
        }
    }

    stack.push(startCell);
    visited[startCell.row][startCell.col] = true;
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
            if (neighbor.visited) {
                continue;
            }
            neighbor.prev = currentCell;
            stack.push(neighbor);
        }
        await sleep(10);
        setMaze([...maze]);
    }

    return null;
}

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
