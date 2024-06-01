import React, { useRef, useState } from 'react';
import ArrayBar from './ArrayBar';
import generateRandomArray from '../utils/generateRandomArray.ts';
import bubbleSort from '../algorithms/sorting/BubbleSort.ts';
import '../styles/main.css';
import { SleepTime } from '../algorithms/utils/SleepTime.ts';

const SortingVisualiser: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [sleepDuration, setSleepDuration] = useState<number>(50);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const sleepTimeRef = useRef<SleepTime>(new SleepTime(sleepDuration));
    
    // Function to generate a random array of numbers
    const generateArray = () => {
        if (isRunning) return;
        setSelectedIndices([]);
        setArray(generateRandomArray(100));
    };

    // Function to run the sorting algorithm
    const runSortingAlgorithm = () => {
        if (isRunning) return;
        bubbleSort(array, setArray, sleepTimeRef.current, setSelectedIndices, setIsRunning);
    };

    const handleSleepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSleepDuration = Number(e.target.value);
        setSleepDuration(newSleepDuration);
        sleepTimeRef.current.value = newSleepDuration;
    };

    return (
        <div className="sorting-content-container">
            <div className="array-bar-container">
                {array.map((value, index) => (
                    <ArrayBar key={index} height={value} selected={selectedIndices.includes(index)}/>
                ))}
            </div>
            <button onClick={generateArray}>Generate Array</button>
            <button onClick={runSortingAlgorithm}>Run Sorting Algorithm</button>
            Speed Selector: <input
                type="range"
                value={sleepDuration}
                onChange={handleSleepChange}
                min="0"
                max="300"
                step="1"
            />
        </div>
    );
};

export default SortingVisualiser;