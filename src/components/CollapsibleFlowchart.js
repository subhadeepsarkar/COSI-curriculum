import React, { useState, useCallback } from 'react';
import { ReactFlow, MiniMap, Controls, Background, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    { id: '1', data: { label: 'COSI 10a' }, position: { x: 100, y: 100 }, sourcePosition: 'right', targetPosition: 'left' },
    { id: '2', data: { label: 'COSI 12b' }, position: { x: 400, y: 0 }, sourcePosition: 'right', targetPosition: 'left', parentId: '1' },
    { id: '3', data: { label: 'COSI 114a' }, position: { x: 100, y: 100 }, parentId: '2' },
    { id: '4', data: { label: 'COSI 135b' }, position: { x: 100, y: 100 }, parentId: '2' },
    { id: '5', data: { label: 'COSI 115b' }, position: { x: 100, y: 100 }, parentId: '3' },
    { id: '6', data: { label: 'COSI 132a' }, position: { x: 100, y: 100 }, parentId: '3' },
    { id: '7', data: { label: 'COSI 136a' }, position: { x: 100, y: 100 }, parentId: '3' },
    { id: '8', data: { label: 'COSI 230b' }, position: { x: 100, y: 100 }, parentId: '5' },
    { id: '9', data: { label: 'COSI 231a' }, position: { x: 100, y: 100 }, parentId: '5' },
    { id: '10', data: { label: 'COSI 216a' }, position: { x: 100, y: 100 }, parentId: '5' },
    { id: '11', data: { label: 'COSI 217b' }, position: { x: 100, y: 100 }, parentId: '5' },
    { id: '12', data: { label: 'COSI 232b' }, position: { x: 100, y: 100 }, parentId: '9' },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-3', source: '2', target: '3', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-4', source: '2', target: '4', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2-5', source: '2', target: '5', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3-5', source: '3', target: '5', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3-6', source: '3', target: '6', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3-7', source: '3', target: '7', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5-8', source: '5', target: '8', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5-9', source: '5', target: '9', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5-10', source: '5', target: '10', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5-11', source: '5', target: '11', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e9-12', source: '9', target: '12', markerEnd: { type: MarkerType.ArrowClosed } },
];

const CollapsibleFlowchart = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges] = useState(initialEdges);
    const [preReqNode, setPreReqNode] = useState('1');

    const onNodeClick = useCallback((event, node) => {

        if (node.id === preReqNode) { // if clicked on the PreReq node
            if (node.id === '1') {
                // Do nothing if the prerequisite node is '1'
                return;
            } else {
                const parentNodeId = nodes.find(n => n.id === node.id).parentId;
                if (parentNodeId) {
                    setPreReqNode(parentNodeId);
                    setNodes(prevNodes => {
                        const updatedNodes = prevNodes.map(n => {
                            if (n.id === parentNodeId) {
                                return { ...n, position: { x: 100, y: 100 }, sourcePosition: 'right', targetPosition: 'left' };
                            }
                            if (n.parentId === parentNodeId) {
                                const index = prevNodes.filter(pn => pn.parentId === parentNodeId).indexOf(n);
                                return { ...n, position: { x: 400, y: index * 200 }, sourcePosition: 'right', targetPosition: 'left' };
                            }
                            return n;
                        });
                        return updatedNodes;
                    });
                }
            }
        } else { // if clicked on the Dependent node
            setPreReqNode(node.id);
            setNodes(prevNodes => {
                const updatedNodes = prevNodes.map(n => {
                    if (n.id === node.id) {
                        return { ...n, position: { x: 100, y: 100 }, sourcePosition: 'right', targetPosition: 'left' };
                    }
                    if (n.parentId === node.id) {
                        const index = prevNodes.filter(pn => pn.parentId === node.id).indexOf(n);
                        return { ...n, position: { x: 400, y: index * 200 }, sourcePosition: 'right', targetPosition: 'left' };
                    }
                    return n;
                });
                return updatedNodes;
            });
        }
    }, [nodes, preReqNode]);

    const getVisibleNodes = useCallback(() => {
        const visibleNodes = [];
        const stack = [nodes.find(node => node.id === preReqNode)];

        while (stack.length) {
            const node = stack.pop();
            visibleNodes.push(node);

            if (node.id === preReqNode) {
                stack.push(...nodes.filter(n => n.parentId === node.id));
            }
        }

        return visibleNodes;
    }, [nodes, preReqNode]);

    return (
        <div style={{ height: 800 }}>
            <ReactFlow nodes={getVisibleNodes()} edges={edges} onNodeClick={onNodeClick}>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default CollapsibleFlowchart;