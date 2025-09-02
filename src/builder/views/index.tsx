"use client";

import { cn } from "@/lib/utils";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { HTMLAttributes } from "react";
import { NODE_TYPES } from "../consts";

export interface BuilderNode extends Node {}

export interface BuilderEdge extends Edge {}

const initialNodes: BuilderNode[] = [
  {
    id: "1",
    data: { label: "Original Node" },
    position: { x: 0, y: 0 },
    type: NODE_TYPES.TRIGGER,
    draggable: true,
  },
  {
    id: "2",
    data: {},
    position: { x: 0, y: 150 },
    type: NODE_TYPES.PLACEHOLDER,
    draggable: true,
  },
];

const initialEdges: BuilderEdge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
];

interface Props extends HTMLAttributes<HTMLDivElement> {}
export const Builder = ({ className, ...props }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className={cn(className)} {...props}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // nodeTypes={nodeTypes}
        proOptions={{
          hideAttribution: true,
        }}
        fitView
      >
        <Background color="#00000040" />
      </ReactFlow>
    </div>
  );
};
