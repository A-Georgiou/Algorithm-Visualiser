import { Cell, initialiseAllWalls } from '../utils/PathfindingUtils';

type Maze = Cell[][];

// Initialize edges as walls
function initialiseEdges(maze: Maze): void {
    for (let row = 0; row < maze.length; row++) {
        maze[row][maze[row].length - 1].wall = true;
        maze[row][0].wall = true;
    }

    for (let col = 0; col < maze[0].length; col++) {
        maze[0][col].wall = true;
        maze[maze.length - 1][col].wall = true;
    }
}

// Add a horizontal wall with a single passage
function addHorizontalWall(maze: Maze, y: number, xStart: number, xEnd: number, passageX: number): void {
    for (let x = xStart; x <= xEnd; x++) {
        if (x !== passageX) {
            maze[y][x].wall = true;
        } else {
            maze[y][x].wall = false;
        }
    }
}

// Add a vertical wall with a single passage
function addVerticalWall(maze: Maze, x: number, yStart: number, yEnd: number, passageY: number): void {
    for (let y = yStart; y <= yEnd; y++) {
        if (y !== passageY) {
            maze[y][x].wall = true;
        } else {
            maze[y][x].wall = false;
        }
    }
}

// Recursive function to divide the maze
function recursiveDivision(maze: Maze, xStart: number, yStart: number, width: number, height: number, chooseOrientation: (width: number, height: number) => boolean): void {
    if (width <= 2 || height <= 2) {
        return;
    }

    const horizontal = chooseOrientation(width, height);
    if (horizontal) {
        const y = Math.floor(randomNumber(yStart, yStart + height - 1) / 2) * 2;
        const passageX = Math.floor(randomNumber(xStart, xStart + width - 1) / 2) * 2 + 1;
        addHorizontalWall(maze, y, xStart, xStart + width - 1, passageX);

        recursiveDivision(maze, xStart, yStart, width, y - yStart, chooseOrientation);
        recursiveDivision(maze, xStart, y + 1, width, yStart + height - y - 1, chooseOrientation);
    } else {
        const x = Math.floor(randomNumber(xStart, xStart + width - 1) / 2) * 2;
        const passageY = Math.floor(randomNumber(yStart, yStart + height - 1) / 2) * 2 + 1;
        addVerticalWall(maze, x, yStart, yStart + height - 1, passageY);

        recursiveDivision(maze, xStart, yStart, x - xStart, height, chooseOrientation);
        recursiveDivision(maze, x + 1, yStart, xStart + width - x - 1, height, chooseOrientation);
    }
}

// Function to create a biased chooseOrientation function
function createUseBiasOrientationFunction(bias: number) {
    return function (): boolean {
        return Math.random() > bias;
    };
}

function nonBiasedOrientationFunction(width: number, height: number): boolean {
    if (width < height) return true;
    if (height < width) return false;
    return Math.random() < 0.5;
}

// Generate a random number within a range
function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Main function to generate the maze using recursive division
export function recursiveDivisionMazeGeneration(maze: Maze, startCell: Cell, endCell: Cell, setMaze: (arr: Maze) => void, bias: number = 0.5): void {
    if (maze.length < 3 || maze[0].length < 3) {
        return;
    }
    initialiseAllWalls(maze, false);
    initialiseEdges(maze);
    const chooseOrientation = bias === 0.5 ? nonBiasedOrientationFunction : createUseBiasOrientationFunction(bias);
    recursiveDivision(maze, 1, 1, maze[0].length - 2, maze.length - 2, chooseOrientation);
    maze[startCell.row][startCell.col].wall = false;
    maze[endCell.row][endCell.col].wall = false;
    setMaze([...maze]);
}
