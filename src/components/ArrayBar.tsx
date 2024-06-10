import React from 'react';

interface ArrayBarProps {
    height: number;
    selected: boolean;
    selectedColor: string;
}

const ArrayBar: React.FC<ArrayBarProps> = ({ height, selected, selectedColor }) => {
    const barStyle: React.CSSProperties = {
        height: `${height}%`,
        backgroundColor: selected ? selectedColor : 'white',
        width: '10px',
        margin: '0 1px',
        display: 'inline-block'
    };

    return <div style={barStyle}></div>;
};

export default ArrayBar;