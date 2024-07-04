import React from 'react';

interface Node {
    id: string;
    label: string;
}

interface Edge {
    source: string;
    target: string;
}

interface Graph {
    nodes: Node[];
    edges: Edge[];
}

interface GraphVisualiserProps {
    graph: Graph;
}

const GraphVisualiser: React.FC = () => {

    let graph = {
        nodes: [
            { id: '1', label: 'Node 1' },
            { id: '2', label: 'Node 2' },
            { id: '3', label: 'Node 3' },
            { id: '4', label: 'Node 4' },
            { id: '5', label: 'Node 5' },
            { id: '6', label: 'Node 6' },
            { id: '7', label: 'Node 7' },
            { id: '8', label: 'Node 8' },
            { id: '9', label: 'Node 9' },
            { id: '10', label: 'Node 10' }
        ],
        edges: [
            { source: '1', target: '2' },
            { source: '1', target: '3' },
            { source: '2', target: '4' },
            { source: '2', target: '5' },
            { source: '3', target: '6' },
            { source: '3', target: '7' },
            { source: '4', target: '8' },
            { source: '4', target: '9' },
            { source: '5', target: '10' }
        ]
    }

    return (
        <div>
            <h1>Network Graph Visualiser</h1>
            <div>
                {/* Render nodes */}
                {graph.nodes.map((node) => (
                    <div key={node.id}>{node.label}</div>
                ))}
            </div>
            <div>
                {/* Render edges */}
                {graph.edges.map((edge) => (
                    <div key={`${edge.source}-${edge.target}`}>
                        {edge.source} -{'>'} {edge.target}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GraphVisualiser;