// Mutable object to hold the sleep time
export class SleepTime {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
}
/*
// Sleep function that returns a promise that resolves after a specified time
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
*/


// Helper function to wait for a specified duration using requestAnimationFrame
export const sleep = (ms: number) => {
    return new Promise<void>(resolve => {
        const start = performance.now();
        const frame = () => {
            const now = performance.now();
            if (now - start >= ms) {
                resolve();
            } else {
                requestAnimationFrame(frame);
            }
        };
        requestAnimationFrame(frame);
    });
};
