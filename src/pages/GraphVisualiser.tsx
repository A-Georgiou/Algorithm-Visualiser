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

const GraphVisualiser: React.FC<GraphVisualiserProps> = ({ graph }) => {
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