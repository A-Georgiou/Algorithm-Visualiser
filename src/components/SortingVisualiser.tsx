import React, { useEffect, useRef, useState } from 'react';
import ArrayBar from './ArrayBar';
import generateRandomArray from '../utils/generateRandomArray.ts';
import BubbleSort from '../algorithms/sorting/BubbleSort.ts';
import InitialiseQuickSort from '../algorithms/sorting/QuickSort.ts';
import '../styles/main.css';
import { SleepTime } from '../algorithms/utils/SleepTime.ts';
import AlgorithmSelector  from './AlgorithmSelector.tsx';

const SortingVisualiser: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [sleepDuration, setSleepDuration] = useState<number>(50);
    const [selectedIndices, setSelectedIndices] = useState<{ [index: number]: string }>({});
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const sleepTimeRef = useRef<SleepTime>(new SleepTime(sleepDuration));
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('bubbleSort');
    
    // Function to generate a random array of numbers
    const generateArray = () => {
        if (isRunning) return;
        setSelectedIndices([]);
        setArray(generateRandomArray(100));
    };

    useEffect(() => {generateArray();}, []);

    // Function to run the sorting algorithm
    const runSortingAlgorithm = () => {
        if (isRunning) return;
        if (selectedAlgorithm === 'bubbleSort'){
            BubbleSort(array, setArray, sleepTimeRef.current, setSelectedIndices, setIsRunning);
        } else if (selectedAlgorithm === 'quickSort'){
            InitialiseQuickSort(array, setArray, sleepTimeRef.current, setSelectedIndices, setIsRunning);
        }
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
                    <ArrayBar key={index} height={value} selected={index in selectedIndices} selectedColor={index in selectedIndices ? selectedIndices[index] : 'white'}/>
                ))}
            </div>
            <AlgorithmSelector selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm}/>
            <button onClick={generateArray}>Generate Random Array</button>
            <button onClick={runSortingAlgorithm}>Run Sorting Algorithm</button>
            Algorithm Speed: <input
                type="range"
                value={sleepDuration}
                onChange={handleSleepChange}
                min="0"
                max="300"
                step="1"
                style={{verticalAlign: 'middle'}}
            />
        </div>
    );
};

export default SortingVisualiser;