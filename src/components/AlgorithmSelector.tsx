import React from 'react';
import '../styles/main.css';

type AlgorithmSelectorProps = {
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algorithm: string) => void;
  disabled: boolean;
};

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({selectedAlgorithm, setSelectedAlgorithm, disabled}) => {
    const handleAlgorithmChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlgorithm(event.target.value);
    };

    return (
        <select id="algorithm" className="algorithm-select" value={selectedAlgorithm} onChange={handleAlgorithmChange} disabled={disabled}>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
        </select>
    );
};

export default AlgorithmSelector;