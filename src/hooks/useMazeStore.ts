// useMazeStore.ts
import { create } from 'zustand';
import { Cell } from '../algorithms/utils/PathfindingUtils';

interface MazeState {
    maze: Cell[][];
    startNode: [number, number];
    endNode: [number, number];
    setMaze: (newMaze: Cell[][]) => void;
    setCell: (row: number, col: number, updates: Partial<Cell>) => void;
    generateMaze: (width: number, height: number) => void;
    clearAttribute: (attribute: keyof Cell) => void;
    clearLatestRun: () => void;
    populateOptimalPath: (optimalPath: Cell[] | null) => void;
    setStartPosition: (flatHeight: number, flatWidth: number) => void;
    setEndPosition: (flatHeight: number, flatWidth: number) => void;
    drawCell: (row: number, col: number, value: boolean) => void;
    moveNode: (row: number, col: number, nodeType: 'start' | 'end') => void;
}

export const useMazeStore = create<MazeState>((set) => ({
    maze: [],
    startNode: [0, 0],
    endNode: [0, 0],
    setMaze: (newMaze) => set({ maze: newMaze }),
    setCell: (row, col, updates) => {
        set((state) => {
            const newMaze = state.maze.map((r, i) =>
                i === row ? r.map((c, j) => (j === col ? { ...c, ...updates } : c)) : r
            );
            return { maze: newMaze };
        });
    },
    generateMaze: (width, height) => {
        let flatHeight = Math.floor((height - (26 + 64)) / 26);
        if (flatHeight % 2 === 0) flatHeight += 1;
        let flatWidth = Math.floor((width - 326) / 26);
        if (flatWidth % 2 === 0) flatWidth += 1;

        const newMaze = [];
        for (let i = 0; i < flatHeight; i++) {
            const row = [];
            for (let j = 0; j < flatWidth; j++) {
                row.push(new Cell(i, j));
            }
            newMaze.push(row);
        }
        set({ maze: newMaze });
    },
    clearAttribute: (attribute) => {
        set((state) => ({
            maze: state.maze.map((row) =>
                row.map((cell) => ({ ...cell, [attribute]: false }))
            ),
        }));
    },
    clearLatestRun: () => {
        set((state) => {
            const clearedMaze = state.maze.map((row) =>
                row.map((cell) => ({ ...cell, visited: false, finalPath: false }))
            );
            return { maze: clearedMaze };
        });
    },
    populateOptimalPath: (optimalPath) => {
        if (!optimalPath) {
            return;
        }
        const delay = 50; // Delay in milliseconds between each update
        const updateCell = (index: number) => {
            if (index >= optimalPath.length) {
                return;
            }

            set((state) => {
                const newMaze = state.maze.map((row) =>
                    row.map((cell) => ({ ...cell }))
                );
                newMaze[optimalPath[index].row][optimalPath[index].col].finalPath = true;
                return { maze: newMaze };
            });

            // Schedule the next update with delay
            requestAnimationFrame(() =>
                setTimeout(() => updateCell(index + 1), delay)
            );
        };

        updateCell(0);
    },
    setStartPosition: (flatHeight, flatWidth) => {
        set((state) => {
            const rowIndex = Math.floor(flatHeight / 2);
            const colIndex = Math.floor(flatWidth / 4);
            const newMaze = state.maze.map((row, i) =>
                i === rowIndex ? row.map((cell, j) => (j === colIndex ? { ...cell, start: true } : cell)) : row
            );
            return { maze: newMaze, startNode: [rowIndex, colIndex] };
        });
    },
    setEndPosition: (flatHeight, flatWidth) => {
        set((state) => {
            const rowIndex = Math.floor(flatHeight / 2);
            const colIndex = Math.floor(flatWidth * (3 / 4));
            const newMaze = state.maze.map((row, i) =>
                i === rowIndex ? row.map((cell, j) => (j === colIndex ? { ...cell, end: true } : cell)) : row
            );
            return { maze: newMaze, endNode: [rowIndex, colIndex] };
        });
    },
    drawCell: (row, col, value) => {
        set((state) => {
            const newMaze = state.maze.map((r, i) =>
                i === row ? r.map((c, j) => (j === col ? { ...c, wall: value } : c)) : r
            );
            return { maze: newMaze };
        });
    },
    moveNode: (row, col, nodeType) => {
        set((state) => {
            const newMaze = state.maze.map((r) =>
                r.map((c) => {
                    if (c.row === row && c.col === col) {
                        return { ...c, [nodeType]: true };
                    }else if (nodeType === 'end' && c.end){
                        return { ...c, end: false};
                    }else if (nodeType === 'start' && c.start){
                        return { ...c, start: false};
                    }
                    return c;
                })
            );

            if (nodeType === 'start') {
                return { maze: newMaze, startNode: [row, col] };
            } else {
                return { maze: newMaze, endNode: [row, col] };
            }
        });
    },
}));
