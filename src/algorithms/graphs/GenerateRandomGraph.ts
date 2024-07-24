export default function GenerateRandomGraph(numNodes: number, setNodes: (nodes: { id: string }[]) => void) {
    const nodeTemp = [];
    for (let i = 0; i < numNodes; i++) {
        nodeTemp.push({
            id: i.toString(),
            fill: 'purple',
        });
    }
    setNodes(nodeTemp);
}