import { SleepTime, sleep } from '../utils/SleepTime.ts';

// Modified bubbleSort function with async and await
async function bubbleSort(arr: number[], setArr: (arr: number[]) => void, sleepTime: SleepTime, setSelectedIndices: (arr: number[]) => void, setIsRunning: (isRunning: boolean) => void): Promise<void> {
    const n = arr.length;
    setIsRunning(true);
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            setSelectedIndices([j, j+1]);
            await sleep(sleepTime.value);
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                setArr([...arr]);
                await sleep(sleepTime.value);
            }
        }
    }

    for (let i = 0; i <= n; i++) {
        setSelectedIndices([...Array(i).keys()]);
        await sleep(sleepTime.value);
    }

    setIsRunning(false);
}

export default bubbleSort;