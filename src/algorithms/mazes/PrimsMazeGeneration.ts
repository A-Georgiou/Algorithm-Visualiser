import { Cell, initialiseAllWalls } from '../utils/PathfindingUtils';

type Maze = Cell[][];

function isInsideMaze(maze: Maze, row: number, col: number): boolean {
    return row > 0 && row < maze.length -1  && col > 0 && col < maze[0].length -1;
}

function getWalls(maze: Maze, row: number, col: number): [number, number][] {
    const frontier: [number, number][] = [];
    if (isInsideMaze(maze, row - 2, col) && maze[row - 2][col].wall) {
        frontier.push([row - 2, col]);
    }
    if (isInsideMaze(maze, row + 2, col) && maze[row + 2][col].wall) {
        frontier.push([row + 2, col]);
    }
    if (isInsideMaze(maze, row, col - 2) && maze[row][col - 2].wall) {
        frontier.push([row, col - 2]);
    }
    if (isInsideMaze(maze, row, col + 2) && maze[row][col + 2].wall) {
        frontier.push([row, col + 2]);
    }
    return frontier;
}

function getNeighbors(maze: Maze, row: number, col: number): [number, number][] {
    const neighbors: [number, number][] = [];
    if (isInsideMaze(maze, row - 2, col) && !maze[row - 2][col].wall) {
        neighbors.push([row - 2, col]);
    }
    if (isInsideMaze(maze, row + 2, col) && !maze[row + 2][col].wall) {
        neighbors.push([row + 2, col]);
    }
    if (isInsideMaze(maze, row, col - 2) && !maze[row][col - 2].wall) {
        neighbors.push([row, col - 2]);
    }
    if (isInsideMaze(maze, row, col + 2) && !maze[row][col + 2].wall) {
        neighbors.push([row, col + 2]);
    }
    return neighbors;
}

function connectCells(maze: Maze, cell1: { row: number, col: number }, cell2: { row: number, col: number }): void {
    const betweenRow = Math.floor((cell1.row + cell2.row) / 2);
    const betweenCol = Math.floor((cell1.col + cell2.col) / 2);
    maze[betweenRow][betweenCol].wall = false;
}

export function primsMazeGeneration(maze: Maze, startCell: Cell, endCell: Cell, setMaze: (arr: Maze) => void): void {
    if (maze.length < 3 || maze[0].length < 3) {
        return;
    }
    initialiseAllWalls(maze);
    maze[1][1].wall = false;

    let frontier = getWalls(maze, 1,1);

    while (frontier.length > 0) {
        const randomIndex = Math.floor(Math.random() * frontier.length);
        const [row, col] = frontier[randomIndex];
        frontier.splice(randomIndex, 1);

        const neighbors = getNeighbors(maze, row, col);
        if (neighbors.length > 0) {
            const [neighborRow, neighborCol] = neighbors[Math.floor(Math.random() * neighbors.length)];
            maze[row][col].wall = false;
            connectCells(maze, { row, col }, { row: neighborRow, col: neighborCol });

            const newFrontier = getWalls(maze, row, col);
            for (const cell of newFrontier) {
                if (!frontier.some(([fr, fc]) => fr === cell[0] && fc === cell[1])) {
                    frontier.push(cell);
                }
            }
        }
    }   
    maze[startCell.row][startCell.col].wall = false;
    maze[endCell.row][endCell.col].wall = false;
    setMaze([...maze]);
}
