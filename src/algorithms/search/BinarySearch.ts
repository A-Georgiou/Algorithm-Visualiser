import { sleep } from '../utils/SleepTime';

// Function to perform binary search
export const binarySearch = async (target: number | null, array: number[],
                                    setNumSteps: (arr: number) => void,
                                    setFoundIndex: (arr: number | null) => void,
                                    setSelectedIndex: (arr: number | null) => void) => {
    if (!target) return;
    let left = 0;
    let right = array.length - 1;
    let steps = 0;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        setSelectedIndex(mid);
        steps += 1;
        await sleep(500);
        if (array[mid] === target) {
            setFoundIndex(mid);
            setNumSteps(steps);
            return;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    setNumSteps(steps);
    setSelectedIndex(null);
    setFoundIndex(null);
};