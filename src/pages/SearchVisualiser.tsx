import React, { useState } from 'react';

const SearchVisualiser: React.FC = () => {
    const [array, setArray] = useState<number[]>([]);
    const [target, setTarget] = useState<number | null>(null);
    const [foundIndex, setFoundIndex] = useState<number | null>(null);
    const [isBinarySearch, setBinarySearch] = useState<boolean>(false);

    // Function to generate a random array
    const generateArray = () => {
        const newArray = [];
        for (let i = 0; i < 10; i++) {
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
    const binarySearch = () => {
        if (!target) return;
        let left = 0;
        let right = array.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (array[mid] === target) {
                setFoundIndex(mid);
                return;
            } else if (array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        setFoundIndex(null);
    };

    // Function to perform binary search
    const linearSearch = () => {
        if (!target) return;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === target) {
                setFoundIndex(i);
                return;
            }
        }
        setFoundIndex(null);
    };

    return (
        <div>
            <button onClick={generateArray}>Generate Array</button>
            <button onClick={generateSortedArray}>Generate Sorted Array</button>
            <br />
            {array.length > 0 && (
                <div>
                    <h3>Array: {array.join(', ')}</h3>
                    <input
                        type="number"
                        placeholder="Enter target value"
                        onChange={(e) => setTarget(Number(e.target.value))}
                    />
                    <button onClick={binarySearch} disabled={!isBinarySearch}>Binary Search</button>
                    <button onClick={linearSearch}>Linear Search</button>
                    <br />
                    <br />
                    {foundIndex !== null ? (
                        <h3>Target found at index: {foundIndex}</h3>
                    ) : (
                        <h3>Target not found</h3>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchVisualiser;