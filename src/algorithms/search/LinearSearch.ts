import {sleep} from '../utils/SleepTime';

// Function to perform linear search
export const linearSearch = async (target: number | null, array: number[],
    setNumSteps: (arr: number) => void,
    setFoundIndex: (arr: number | null) => void,
    setSelectedIndex: (arr: number | null) => void) => {
    if (!target) return;
    let steps = 0;
    for (let i = 0; i < array.length; i++) {
        setSelectedIndex(i);
        await sleep(500);
        steps += 1;
        if (array[i] === target) {
            setNumSteps(steps);
            setFoundIndex(i);
            return;
        }
    }
    setNumSteps(steps);
    setSelectedIndex(null);
    setFoundIndex(null);
};