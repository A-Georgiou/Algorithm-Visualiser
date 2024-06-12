import { SleepTime, sleep } from '../utils/SleepTime.ts';

// Helper function to set selected indices and sleep
async function highlightIndices(setSelectedIndices: (arr: { [index: number]: string }) => void, indices: { [index: number]: string }, sleepTime: SleepTime) {
    setSelectedIndices(indices);
    await sleep(sleepTime.value);
}

async function completeSortedArray(arr: number[], sleepTime: SleepTime, 
    isRunningRef: React.MutableRefObject<boolean>,
        setSelectedIndices: (arr: { [index: number]: string },
        ) => void){
    for (let i = 0; i <= arr.length; i++) {
        if (!isRunningRef.current) return;
        const indices = {} as { [index: number]: string };
        for (let j = 0; j <= i; j++) {
            indices[j] = 'green';
        }
        await highlightIndices(setSelectedIndices, indices, sleepTime);
    }
}

export { highlightIndices, completeSortedArray };