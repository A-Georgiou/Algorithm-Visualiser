import { SleepTime } from "../utils/SleepTime";
import { highlightIndices, completeSortedArray } from "./utils";

async function MergeSort(
    arr: number[],
    setArr: (arr: number[]) => void,
    sleepTime: SleepTime,
    setSelectedIndices: (indices: { [index: number]: string }) => void,
    isRunningRef: React.MutableRefObject<boolean>,
    setIsRunning: (isRunning: boolean) => void
): Promise<void> {

    if (arr.length <= 1) {
        setIsRunning(false);
        return;
    }

    const merge = async (left: number[], right: number[], originalArr: number[], startIndex: number) => {
        const mergedArray: number[] = [];
        let leftIndex = 0;
        let rightIndex = 0;
        let currentIndex = startIndex;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (!isRunningRef.current) return [];
            await highlightIndices(setSelectedIndices, {
                [currentIndex]: '#BA55D3',
                [startIndex + leftIndex]: '#50AD0D',
                [startIndex + left.length + rightIndex]: '#0DA0AD'
            }, sleepTime);

            if (left[leftIndex] < right[rightIndex]) {
                originalArr[currentIndex] = left[leftIndex];
                leftIndex++;
            } else {
                originalArr[currentIndex] = right[rightIndex];
                rightIndex++;
            }
            mergedArray.push(originalArr[currentIndex]);
            setArr([...originalArr]);

            currentIndex++;
        }

        while (leftIndex < left.length) {
            if (!isRunningRef.current) return [];
            await highlightIndices(setSelectedIndices, {
                [currentIndex]: '#BA55D3',
                [startIndex + leftIndex]: '#50AD0D',
                [startIndex + left.length + rightIndex]: '#0DA0AD'
            }, sleepTime);

            originalArr[currentIndex] = left[leftIndex];
            mergedArray.push(originalArr[currentIndex]);
            setArr([...originalArr]);
            leftIndex++;
            currentIndex++;
        }

        while (rightIndex < right.length) {
            if (!isRunningRef.current) return [];
            await highlightIndices(setSelectedIndices, {
                [currentIndex]: '#BA55D3',
                [startIndex + leftIndex]: '#50AD0D',
                [startIndex + left.length + rightIndex]: '#0DA0AD'
            }, sleepTime);

            originalArr[currentIndex] = right[rightIndex];
            mergedArray.push(originalArr[currentIndex]);
            setArr([...originalArr]);

            rightIndex++;
            currentIndex++;
        }

        return mergedArray;
    };

    const mergeSort = async (arr: number[], originalArr: number[], startIndex: number): Promise<number[]> => {
        if (arr.length <= 1) {
            return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const left = await mergeSort(arr.slice(0, mid), originalArr, startIndex);
        const right = await mergeSort(arr.slice(mid), originalArr, startIndex + mid);
        if (!isRunningRef.current) return [];
        const mergedArray = await merge(left, right, originalArr, startIndex);

        return mergedArray;
    };

    const sortedArr = await mergeSort(arr, [...arr], 0);

    if (!isRunningRef.current) return;

    setArr(sortedArr);
    await completeSortedArray(sortedArr, sleepTime, isRunningRef, setSelectedIndices);
    setIsRunning(false);
}

export default MergeSort;
