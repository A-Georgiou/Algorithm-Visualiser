import { SleepTime, sleep } from '../utils/SleepTime.ts';
import { highlightIndices, completeSortedArray } from './utils.ts';

async function partitionArray(
    arr: number[],
    low: number,
    high: number,
    setArr: (arr: number[]) => void,
    sleepTime: SleepTime,
    setSelectedIndices: (indices: { [index: number]: string }) => void,
    isRunningRef: React.MutableRefObject<boolean>
): Promise<number> {
    let pivotIndex = Math.floor((low + high) / 2);
    let pivot = arr[pivotIndex];
    let i = low;
    let j = high;

    await highlightIndices(setSelectedIndices, { [pivotIndex]: '#0DA0AD', [i]: '#BA55D3', [j]: '#50AD0D' }, sleepTime);

    while (i <= j) {
        if (!isRunningRef.current) return -1;  // Early return if sorting is stopped
        await sleep(sleepTime.value);

        while (arr[i] < pivot) {
            if (!isRunningRef.current) return -1;  // Early return if sorting is stopped
            i++;
            await highlightIndices(setSelectedIndices, { [pivotIndex]: '#0DA0AD', [i]: '#BA55D3', [j]: '#50AD0D' }, sleepTime);
        }

        while (arr[j] > pivot) {
            if (!isRunningRef.current) return -1;  // Early return if sorting is stopped
            j--;
            await highlightIndices(setSelectedIndices, { [pivotIndex]: '#0DA0AD', [i]: '#BA55D3', [j]: '#50AD0D' }, sleepTime);
        }

        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
            setArr([...arr]);
            await sleep(sleepTime.value);

            await highlightIndices(setSelectedIndices, { [pivotIndex]: '#0DA0AD', [i]: '#BA55D3', [j]: '#50AD0D' }, sleepTime);
            
            i++;
            j--;
            await highlightIndices(setSelectedIndices, { [pivotIndex]: '#0DA0AD', [i]: '#BA55D3', [j]: '#50AD0D' }, sleepTime);
        }
    }
    return i;
}

async function quickSort(
    arr: number[], 
    low: number, 
    high: number, 
    setArr: (arr: number[]) => void, 
    sleepTime: SleepTime, 
    setSelectedIndices: (indices: { [index: number]: string }) => void,
    isRunningRef: React.MutableRefObject<boolean>
): Promise<void> {
    if (!isRunningRef.current) return;  // Early return if sorting is stopped
    if (low < high) {
        let pi = await partitionArray(arr, low, high, setArr, sleepTime, setSelectedIndices, isRunningRef);
        if (pi === -1) return;  // Early return if sorting is stopped in partitionArray
        await quickSort(arr, low, pi - 1, setArr, sleepTime, setSelectedIndices, isRunningRef);
        await quickSort(arr, pi, high, setArr, sleepTime, setSelectedIndices, isRunningRef);
    }
}

async function initialiseQuickSort(
    arr: number[],
    setArr: (arr: number[]) => void, 
    sleepTime: SleepTime,
    setSelectedIndices: (indices: { [index: number]: string }) => void,
    isRunningRef: React.MutableRefObject<boolean>,
    setIsRunning: (isRunning: boolean) => void
): Promise<void> {
    await quickSort(arr, 0, arr.length - 1, setArr, sleepTime, setSelectedIndices, isRunningRef);
    if (!isRunningRef.current) return;  // Early return if sorting is stopped
    setArr([...arr]);
    await completeSortedArray(arr, sleepTime, isRunningRef, setSelectedIndices);
    setIsRunning(false);
}

export default initialiseQuickSort;
