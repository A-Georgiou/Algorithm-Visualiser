import { SleepTime, sleep } from '../utils/SleepTime.ts';
import { highlightIndices, completeSortedArray } from './utils.ts';

async function InsertionSort(
    arr: number[],
    setArr: (arr: number[]) => void,
    sleepTime: SleepTime,
    setSelectedIndices: (arr: { [index: number]: string }) => void,
    isRunningRef: React.MutableRefObject<boolean>,
    setIsRunning: (isRunning: boolean) => void): Promise<void> {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        if (!isRunningRef.current) return;
        await highlightIndices(setSelectedIndices, {[i] : '#BA55D3' }, sleepTime);

        while (j >= 0 && arr[j] > key) {
            if (!isRunningRef.current) return;
            await highlightIndices(setSelectedIndices, { [i] : '#BA55D3', [j+1] : '#0DA0AD' }, sleepTime);
            arr[j + 1] = arr[j];
            j--;
            setArr([...arr]);
            await sleep(sleepTime.value);
        }
        await highlightIndices(setSelectedIndices, { [i] : '#BA55D3', [j+1] : '#0DA0AD' }, sleepTime);
        arr[j + 1] = key;
        setArr([...arr]);
        await sleep(sleepTime.value);
    }

    if (!isRunningRef.current) return;
    await completeSortedArray(arr, sleepTime, isRunningRef, setSelectedIndices);
    setIsRunning(false);
}

export default InsertionSort;