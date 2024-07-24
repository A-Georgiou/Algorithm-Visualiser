// Define a class to represent a cell in the maze
export class Node {
    id: string;
    label: string;
    fill: string;
    children: Node[];
    parents: Node[];

    constructor(id: string, label: string, fill: string) {
        this.id = id;
        this.label = label;
        this.fill = fill;
        this.children = [];
        this.parents = [];
    }
}