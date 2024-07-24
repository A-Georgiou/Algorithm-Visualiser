import React, {useState, useEffect} from 'react';
import { GraphCanvas } from 'reagraph';
import GenerateRandomGraph from '../algorithms/graphs/GenerateRandomGraph';
import BreadthFirstSearch from '../algorithms/graphs/BreadthFirstSearch';
import DepthFirstSearch from '../algorithms/graphs/DepthFirstSearch';
import { Node } from '../algorithms/utils/GraphUtils';
import PopulateGraphMap from '../algorithms/graphs/PopulateGraphMap';
import '../styles/graph.css';
import { GraphAlgorithm } from '../utils/GraphEnum';

const GraphVisualiser: React.FC = () => {
    const [edges, setEdges] = useState([]);
    const [nodes, setNodes] = useState<{ id: string }[]>([]); // Specify the type of the nodes state variable
    const [algorithm, setAlgorithm] = useState(GraphAlgorithm.BFS);

    const nodeMap: Node[] = [
        new Node('0', '0', 'slateblue'),
        new Node('1', '1', 'slateblue'),
        new Node('2', '2', 'slateblue'),
        new Node('3', '3', 'slateblue'),
        new Node('4', '4', 'slateblue'),
        new Node('5', '5', 'slateblue'),
        new Node('6', '6', 'slateblue'),
        new Node('7', '7', 'slateblue'),
        new Node('8', '8', 'slateblue'),
        new Node('9', '9', 'slateblue'),
    ];

    nodeMap[0].children.push(nodeMap[1]);
    nodeMap[1].children.push(nodeMap[2]);
    nodeMap[2].children.push(nodeMap[3]);
    nodeMap[3].children.push(nodeMap[4]);
    nodeMap[3].children.push(nodeMap[7]);
    nodeMap[4].children.push(nodeMap[8]);
    nodeMap[4].children.push(nodeMap[5]);
    nodeMap[4].children.push(nodeMap[6]);
    nodeMap[1].children.push(nodeMap[0]);
    nodeMap[5].children.push(nodeMap[9]);

    useEffect(() => {
        PopulateGraphMap(nodeMap, setNodes, setEdges);
    }, []);

    function runAlgorithm(nodeId: string) {
        if(algorithm === GraphAlgorithm.BFS){
            BreadthFirstSearch(nodeMap, setNodes, nodeId);
        } else {
            DepthFirstSearch(nodeMap, setNodes, nodeId);
        }
    }


    return (
        <div className="graph-canvas">
            <div className="graph-canvas-control-panel">
                <h4>Double Click Node to run algorithm.</h4>
            <select className="graph-canvas-control" onChange={(event) => {setAlgorithm(event.target.value as GraphAlgorithm)}}>
                <option value={GraphAlgorithm.DFS}>Depth First Search</option>
                <option value={GraphAlgorithm.BFS}>Breadth First Search</option>
            </select>
            </div>
            <div className="graph-canvas-art">
            <GraphCanvas
                nodes={nodes}
                edges={edges}
                onNodeDoubleClick={node => runAlgorithm(node.id)} 
            />
            </div>
        </div>
    );
};

export default GraphVisualiser;