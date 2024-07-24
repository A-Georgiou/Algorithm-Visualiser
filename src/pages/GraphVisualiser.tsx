import React, {useState, useEffect} from 'react';
import { GraphCanvas } from 'reagraph';
import GenerateRandomGraph from '../algorithms/graphs/GenerateRandomGraph';
import '../styles/graph.css';

const GraphVisualiser: React.FC = () => {
    const [edges, _] = useState([]);
    const [nodes, setNodes] = useState<{ id: string }[]>([]); // Specify the type of the nodes state variable

    useEffect(() => {
        GenerateRandomGraph(10, setNodes);
    }, []);

    return (
        <div className="graph-canvas">
                    <GraphCanvas
            nodes={nodes}
            edges={edges}
        />
        </div>
    );
};

export default GraphVisualiser;