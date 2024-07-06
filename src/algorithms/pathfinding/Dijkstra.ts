import { Cell, getNeighbors} from '../utils/PathfindingUtils';
import { sleep } from '../utils/SleepTime';

export async function Dijkstra(cells: Cell[][], startCell: Cell, endCell: Cell, setMaze: (arr: Cell[][]) => void ): Promise<Cell[]> {
    const queue: Cell[] = [];
    startCell.visited = true;
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
        await sleep(10);
        setMaze([...cells]);
    }

    return [];
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