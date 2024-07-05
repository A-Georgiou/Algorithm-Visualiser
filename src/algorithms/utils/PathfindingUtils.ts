// Define a class to represent a cell in the maze
export class Cell {
    row: number;
    col: number;
    visited: boolean;
    wall: boolean;
    start: boolean;
    end: boolean;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.visited = false;
        this.wall = false;
        this.start = false;
        this.end = false;
    }
}