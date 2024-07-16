import { Cell, getNeighbors } from '../utils/PathfindingUtils';
import { useMazeStore } from '../../hooks/useMazeStore';

function* dijkstraGenerator(cells: Cell[][], startCell: Cell, endCell: Cell): Generator<Cell[][] | Cell[], unknown> {
    const queue: Cell[] = [];
    startCell.visited = true;
    startCell.distance = 0;
    queue.push(startCell);

    while (queue.length > 0) {
        const currentCell = queue.shift()!;
        if (currentCell === endCell) {
            return getPath(endCell);
        }

        const neighbors = getNeighbors(cells, currentCell);
        for (const neighbor of neighbors) {
            const newDistance = currentCell.distance + 1;
            if (!neighbor.visited || newDistance < neighbor.distance) {
                neighbor.distance = newDistance;
                neighbor.prev = currentCell;
                if (!neighbor.visited) {
                    neighbor.visited = true;
                    queue.push(neighbor);
                }
            }
        }
        yield cells;
    }

    yield [];
}

export async function Dijkstra(startCell: Cell, endCell: Cell):  Promise<Cell[] | null>{
    const { maze, setMaze, populateOptimalPath } = useMazeStore.getState();
    const generator = dijkstraGenerator(maze, startCell, endCell);

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

function getPath(endCell: Cell): Cell[] {
    const path: Cell[] = [];
    let currentCell: Cell | null = endCell;

    while (currentCell !== null) {
        path.unshift(currentCell);
        currentCell = currentCell.prev;
    }

    return path;
}
