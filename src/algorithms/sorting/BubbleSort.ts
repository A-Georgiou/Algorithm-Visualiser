import { SleepTime, sleep } from '../utils/SleepTime.ts';
import { highlightIndices, completeSortedArray } from './utils.ts';
// Modified bubbleSort function with async and await
async function BubbleSort(arr: number[], setArr: (arr: number[]) => void,
                            sleepTime: SleepTime,
                            setSelectedIndices: (arr: { [index: number]: string }) => void,
                            isRunningRef: React.MutableRefObject<boolean>,
                            setIsRunning: (isRunning: boolean) => void): Promise<void> {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!isRunningRef.current) {
                return;
            }
            await highlightIndices(setSelectedIndices, { [j]: '#0DA0AD', [j + 1]: '#0DA0AD' }, sleepTime);
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                setArr([...arr]);
                await sleep(sleepTime.value);
            }
        }
    }

    await completeSortedArray(arr, sleepTime, isRunningRef, setSelectedIndices);
    setIsRunning(false);
}

export default BubbleSort;