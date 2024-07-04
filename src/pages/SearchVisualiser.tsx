import React, { useState } from 'react';
import "../styles/search.css";
import { sleep } from '../algorithms/utils/SleepTime.ts';

const SearchVisualiser: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [target, setTarget] = useState<number | null>(null);
    const [foundIndex, setFoundIndex] = useState<number | null>(null);
    const [isBinarySearch, setBinarySearch] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [numSteps, setNumSteps] = useState<number>(0);

    // Function to generate a random array
    const generateArray = () => {
        const newArray = [];
        for (let i = 0; i < 12; i++) {
            newArray.push(Math.floor(Math.random() * 100) + 1);
        }
        setArray(newArray);
        setTarget(null);
        setFoundIndex(null);
        setBinarySearch(false);
    };

    // Function to generate a random sorted array
    const generateSortedArray = () => {
        generateArray();
        setArray((prevArray) => prevArray.sort((a, b) => a - b));
        setBinarySearch(true);
    };
    // Function to perform binary search
    const binarySearch = async () => {
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
        setNumSteps(0);
        setSelectedIndex(null);
        setFoundIndex(null);
    };

    // Function to perform linear search
    const linearSearch = async () => {
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
        setNumSteps(0);
        setSelectedIndex(null);
        setFoundIndex(null);
    };

    return (
        <div className="search-container">
            <div className="search-button-container">
                <button onClick={generateArray} className="search-buttons">Generate Array</button>
                <button onClick={generateSortedArray} className="search-buttons">Generate Sorted Array</button>
            </div>
            {array.length > 0 && (
                <div className="search-array-container">
                    <div className="search-results-container">
                        <h3>Array:</h3>
                        {array.map((value, index) => (
                            <div key={index} className="search-results-box" style={{ backgroundColor: selectedIndex === index ? 'rgb(204 22 163)' : '' }}>{value}</div>
                        ))}
                    </div>
                    <input
                        type="number"
                        placeholder="Enter target value"
                        onChange={(e) => setTarget(Number(e.target.value))}
                    />
                    <div className="search-button-container">
                        <button onClick={binarySearch} disabled={!isBinarySearch} style={{ backgroundColor: !isBinarySearch ? 'grey' : ''}}className="search-buttons">Binary Search</button>
                        <button onClick={linearSearch} className="search-buttons">Linear Search</button>
                    </div>
                    {foundIndex !== null ? (
                        <h3>Target found at index: {foundIndex}</h3>
                    ) : (
                        <h3>Target not found</h3>
                    )}

                    {numSteps > 0 && (
                        <h3>Number of steps: {numSteps}</h3>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchVisualiser;