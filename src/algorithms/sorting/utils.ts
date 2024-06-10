import { SleepTime, sleep } from '../utils/SleepTime.ts';

// Helper function to set selected indices and sleep
async function highlightIndices(setSelectedIndices: (arr: { [index: number]: string }) => void, indices: { [index: number]: string }, sleepTime: SleepTime) {
    setSelectedIndices(indices);
    await sleep(sleepTime.value);
}

async function completeSortedArray(arr: number[], setSelectedIndices: (arr: { [index: number]: string }) => void, sleepTime: SleepTime){
    for (let i = 0; i <= arr.length; i++) {
        const indices = {} as { [index: number]: string };
        for (let j = 0; j <= i; j++) {
            indices[j] = '#0DA0AD';
        }
        await highlightIndices(setSelectedIndices, indices, new SleepTime(50));
    }
}

export { highlightIndices, completeSortedArray };