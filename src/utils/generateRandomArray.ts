function getRandomFloat(min: number, max: number, decimals: number) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

function generateRandomArray(size: number) {
    const array = [];
    for (let i = 0; i < size; i++) {
        const randomValue = getRandomFloat(0, 100, 3);
        array.push(randomValue);
    }
    return array;
}

export default generateRandomArray;