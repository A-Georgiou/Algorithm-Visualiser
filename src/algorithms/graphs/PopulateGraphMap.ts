
import { Node } from '../utils/GraphUtils';

export default function PopulateGraphMap(nodeMap: Node[], setNodes: (nodes: any) => void, setEdges: (edges: any) => void) {
    const nodes = [];
    const edges = [];
    for (let i = 0; i < nodeMap.length; i++) {
        nodes.push({
            id: nodeMap[i].id,
            label: nodeMap[i].label,
        });
        for (let j = 0; j < nodeMap[i].children.length; j++) {
            edges.push({
                id: nodeMap[i].id + '-' + nodeMap[i].children[j].id,
                source: nodeMap[i].id,
                target: nodeMap[i].children[j].id,
                label: nodeMap[i].id + '-' + nodeMap[i].children[j].id,
            });
        }
        for (let j = 0; j < nodeMap[i].parents.length; j++) {
            edges.push({
                id: nodeMap[i].parents[j].id + '-' + nodeMap[i].id,
                source: nodeMap[i].parents[j].id,
                target: nodeMap[i].id,
                label: nodeMap[i].parents[j].id + '-' + nodeMap[i].id,
            });
        }
    }
    setNodes(nodes);
    setEdges(edges);
}