import React from 'react';

interface ArrayBarProps {
    height: number;
    width: number;
    selected: boolean;
    selectedColor: string;
}

const ArrayBar: React.FC<ArrayBarProps> = ({ height, width, selected, selectedColor }) => {
    const barStyle: React.CSSProperties = {
        height: `${height}%`,
        backgroundColor: selected ? selectedColor : 'white',
        width: `100%`,
        margin: `0 ${width < 250 ? 1 : 0}px`,
        display: 'inline-block'
    };

    return <div style={barStyle}></div>;
};

export default ArrayBar;