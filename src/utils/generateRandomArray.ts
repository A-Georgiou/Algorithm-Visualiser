function generateRandomArray(size:number) {
    const array = [];
    for (let i = 0; i < size; i++) {
        const randomValue = Math.floor(Math.random() * 100) + 1;
        array.push(randomValue);
    }
    return array;
}

export default generateRandomArray;