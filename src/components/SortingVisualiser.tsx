import React, { useEffect, useRef, useState } from 'react';
import ArrayBar from './ArrayBar';
import generateRandomArray from '../utils/generateRandomArray.ts';
import BubbleSort from '../algorithms/sorting/BubbleSort.ts';
import InitialiseQuickSort from '../algorithms/sorting/QuickSort.ts';
import MergeSort from '../algorithms/sorting/MergeSort.ts';
import InsertionSort from '../algorithms/sorting/InsertionSort.ts';
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
    const [arraySize, setArraySize] = useState<number>(100);
    const isRunningRef = useRef<boolean>(isRunning);

    // Function to generate a random array of numbers
    const generateArray = () => {
        setIsRunning(false);
        setSelectedIndices([]);
        setArray(generateRandomArray(arraySize));
    };

    useEffect(() => {
        isRunningRef.current = isRunning;
    }, [isRunning]);

    useEffect(() => {
        generateArray();
    }, [arraySize]);

    // Function to run the sorting algorithm
    const runSortingAlgorithm = () => {
        if (isRunning) return;
        setIsRunning(true);
        isRunningRef.current = true;
        if (selectedAlgorithm === 'bubbleSort'){
            BubbleSort(array, setArray, sleepTimeRef.current, setSelectedIndices, isRunningRef, setIsRunning);
        } else if (selectedAlgorithm === 'quickSort'){
            InitialiseQuickSort(array, setArray, sleepTimeRef.current, setSelectedIndices, isRunningRef, setIsRunning);
        } else if (selectedAlgorithm === 'mergeSort'){
            MergeSort(array, setArray, sleepTimeRef.current, setSelectedIndices, isRunningRef, setIsRunning);
        } else if (selectedAlgorithm === 'insertionSort') {
            InsertionSort(array, setArray, sleepTimeRef.current, setSelectedIndices, isRunningRef, setIsRunning);
        }
    };

    const handleSleepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSleepDuration = Number(e.target.value);
        setSleepDuration(newSleepDuration);
        sleepTimeRef.current.value = newSleepDuration;
    };

    const handleArraySizeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setIsRunning(false);
        const newArraySize = Number(e.target.value);
        setArraySize(newArraySize);
    };

    return (
        <div className="sorting-content-container">
            <div className="array-bar-container">
                {array.map((value, index) => (
                    <ArrayBar key={index} height={value} width={arraySize} selected={index in selectedIndices} selectedColor={index in selectedIndices ? selectedIndices[index] : 'white'}/>
                ))}
            </div>
            <AlgorithmSelector selectedAlgorithm={selectedAlgorithm} setSelectedAlgorithm={setSelectedAlgorithm} disabled={isRunning}/>
            <button onClick={generateArray} >Generate Random Array</button>
            <button onClick={runSortingAlgorithm} >Run Sorting Algorithm</button>
            <div className="range-controllers">
                <div className="speed-input-range">
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
                <div className="array-size-input-range">
                    Array Size: <input
                        type="range"
                        value={arraySize}
                        onChange={handleArraySizeChange}
                        min="10"
                        max="1000"
                        step="10"
                        style={{verticalAlign: 'middle'}}
                    />
            </div>
            </div>
        </div>
    );
};

export default SortingVisualiser;