// Define a class to represent a cell in the maze
export class Cell {
    row: number;
    col: number;
    visited: boolean;
    wall: boolean;
    start: boolean;
    end: boolean;
    prev: Cell | null;
    finalPath: boolean;
    distance: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.visited = false;
        this.wall = false;
        this.start = false;
        this.end = false;
        this.prev = null;
        this.finalPath = false;
        this.distance = 0;
    }
}

export function getNeighbors(cells: Cell[][], cell: Cell): Cell[] {
    const neighbors: Cell[] = [];
    const { row, col } = cell;

    if (col < cells[0].length - 1 && !cells[row][col + 1].wall) {
        neighbors.push(cells[row][col + 1]);
    }
    if (row < cells.length - 1 && !cells[row + 1][col].wall) {
        neighbors.push(cells[row + 1][col]);
    }
    if (col > 0 && !cells[row][col - 1].wall) {
        neighbors.push(cells[row][col - 1]);
    }
    if (row > 0 && !cells[row - 1][col].wall) {
        neighbors.push(cells[row - 1][col]);
    }
    
    return neighbors;
}

export function getOptimalPath(maze: Cell[][], startCell: Cell, endCell: Cell): Cell[] {
    const optimalPath: Cell[] = [];
    let currentCell = endCell;

    while (currentCell.prev != null) {
        optimalPath.unshift(currentCell);
        currentCell = maze[currentCell.row][currentCell.col].prev!;
    }

    optimalPath.unshift(startCell);

    return optimalPath;
}