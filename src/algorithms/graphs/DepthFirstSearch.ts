import { Node } from '../utils/GraphUtils';

export default function DepthFirstSearch(nodeMap: Node[], setNodes: (nodes: any) => void, selectedId: string) {
    let queue: Node[] = [];
    let visited: Node[] = [];

    for (let i = 0; i < nodeMap.length; i++) {
        if (nodeMap[i].id === selectedId) {
            queue.push(nodeMap[i]);
            visited.push(nodeMap[i]);
        }
    }

    function processQueue() {
        if (queue.length > 0) {
            let currentNode: Node = queue.pop()!;
            currentNode.fill = 'darkseagreen';
            for (let i = 0; i < currentNode.children.length; i++) {
                if (!visited.includes(currentNode.children[i])) {
                    queue.push(currentNode.children[i]);
                    visited.push(currentNode.children[i]);
                }
            }
            setNodes([...nodeMap]);
            setTimeout(processQueue, 1000); // 1 second delay
        }
    }

    setTimeout(processQueue, 1000); // 1 second delay
}
