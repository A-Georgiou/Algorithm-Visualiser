import { Cell, initialiseAllWalls } from '../utils/PathfindingUtils';

type Maze = Cell[][];

class DSU {
    parent: number[];
    rank: number[];

    constructor(size: number) {
        this.parent = new Array(size).fill(0).map((_, index) => index);
        this.rank = new Array(size).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

function isInsideMaze(maze: Maze, row: number, col: number): boolean {
    return row >= 0 && row < maze.length && col >= 0 && col < maze[0].length;
}

function getEdges(maze: Maze): [number, number, number, number][] {
    const edges: [number, number, number, number][] = [];
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (row % 2 === 1 && col % 2 === 1) {
                if (isInsideMaze(maze, row + 2, col)) {
                    edges.push([row, col, row + 2, col]);
                }
                if (isInsideMaze(maze, row, col + 2)) {
                    edges.push([row, col, row, col + 2]);
                }
            }
        }
    }
    return edges;
}

function connectCells(maze: Maze, cell1: { row: number, col: number }, cell2: { row: number, col: number }): void {
    const betweenRow = Math.floor((cell1.row + cell2.row) / 2);
    const betweenCol = Math.floor((cell1.col + cell2.col) / 2);
    maze[betweenRow][betweenCol].wall = false;
    maze[cell1.row][cell1.col].wall = false;
    maze[cell2.row][cell2.col].wall = false;
}

export function kruskalsMazeGeneration(maze: Maze, startCell: Cell, endCell: Cell, setMaze: (arr: Maze) => void): void {
    if (maze.length < 3 || maze[0].length < 3) {
        return;
    }
    initialiseAllWalls(maze);

    const edges = getEdges(maze);
    const dsu = new DSU(maze.length * maze[0].length);

    while (edges.length > 0) {
        const randomIndex = Math.floor(Math.random() * edges.length);
        const [row1, col1, row2, col2] = edges[randomIndex];
        edges.splice(randomIndex, 1);

        const cellIndex1 = row1 * maze[0].length + col1;
        const cellIndex2 = row2 * maze[0].length + col2;

        if (dsu.find(cellIndex1) !== dsu.find(cellIndex2)) {
            dsu.union(cellIndex1, cellIndex2);
            connectCells(maze, { row: row1, col: col1 }, { row: row2, col: col2 });
        }
    }

    maze[startCell.row][startCell.col].wall = false;
    maze[endCell.row][endCell.col].wall = false;
    setMaze([...maze]);
}
