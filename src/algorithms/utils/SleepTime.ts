// Mutable object to hold the sleep time
export class SleepTime {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
}

// Sleep function that returns a promise that resolves after a specified time
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}