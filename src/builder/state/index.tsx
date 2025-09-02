// "use client";

// import React, {
//   createContext,
//   useContext,
//   useReducer,
//   useCallback,
//   ReactNode,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import {
//   Node,
//   Edge,
//   NodeChange,
//   EdgeChange,
//   applyNodeChanges,
//   applyEdgeChanges,
//   useNodesState,
//   useEdgesState,
// } from "@xyflow/react";
// import { useMutation, useQuery } from "convex/react";
// import { Id } from "../../../convex/_generated/dataModel";
// import { api } from "../../../convex/_generated/api";
// import { NODE_TYPES } from "../consts";

// // Custom debounce hook
// function useDebounce(
//   callback: () => void,
//   delay: number,
//   deps: any[]
// ): () => void {
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   return useCallback(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     timeoutRef.current = setTimeout(() => callback(), delay);
//   }, [delay, ...deps]);
// }

// export interface BuilderNode extends Node {}

// export interface BuilderEdge extends Edge {}

// // Action types
// export type BuilderAction =
//   | { type: "ON_NODES_CHANGE"; payload: NodeChange<BuilderNode>[] }
//   | { type: "ON_EDGES_CHANGE"; payload: EdgeChange<BuilderEdge>[] }
//   | { type: "SET_NODES"; payload: BuilderNode[] }
//   | { type: "SET_EDGES"; payload: BuilderEdge[] }
//   | { type: "LOAD_TEMPLATE_START" }
//   | { type: "LOAD_TEMPLATE_SUCCESS"; payload: Template }
//   | { type: "LOAD_TEMPLATE_ERROR"; payload: string }
//   | { type: "CLEAR_ERROR" }
//   | { type: "SET_LOADING"; payload: boolean };

// export type Template = {
//   version: string;
//   nodes: BuilderNode[];
//   edges: BuilderEdge[];
// };

// // Initial state
// const initialNodes: BuilderNode[] = [
//   {
//     id: "1",
//     data: { label: "Original Node" },
//     position: { x: 0, y: 0 },
//     type: NODE_TYPES.TRIGGER,
//     draggable: true,
//   },
//   {
//     id: "2",
//     data: {},
//     position: { x: 0, y: 150 },
//     type: NODE_TYPES.PLACEHOLDER,
//     draggable: true,
//   },
// ];

// const initialEdges: BuilderEdge[] = [
//   {
//     id: "1=>2",
//     source: "1",
//     target: "2",
//     type: "default",
//     animated: true,
//   },
// ];

// const initialState: Template = {
//   version: "1.0.0",
//   nodes: initialNodes,
//   edges: initialEdges,
// };

// // Extended state with loading
// interface BuilderState extends Template {
//   loading: boolean;
//   error: string | null;
//   hasChangesToSave: boolean;
// }

// const initialBuilderState: BuilderState = {
//   ...initialState,
//   loading: false,
//   error: null,
//   hasChangesToSave: false,
// };

// // Context
// interface BuilderContextType {
//   // state: BuilderState;
//   nodes: BuilderNode[];
//   edges: BuilderEdge[];
//   onNodesChange: (nodes: NodeChange<BuilderNode>[]) => void;
//   onEdgesChange: (edges: EdgeChange<BuilderEdge>[]) => void;
//   setNodes: (nodes: BuilderNode[]) => void;
//   setEdges: (edges: BuilderEdge[]) => void;
//   setLoading: (loading: boolean) => void;
// }

// const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

// // Provider component
// interface BuilderProviderProps extends BuilderProps {
//   children: ReactNode;
// }

// export interface StorageApi {
//   save: (state: Template) => Promise<void>;
// }

// export type BuilderProps = {
//   initialState?: Partial<Template>;
//   storageApi?: StorageApi;
//   workflowId?: string;
// };

// export const BuilderProvider: React.FC<BuilderProviderProps> = ({
//   children,
//   initialState: customInitialState,
//   workflowId,
// }) => {
//   // const [state, setState] = useState(initialBuilderState);
//   const [nodes, setNodes, onNodesChangeRef] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChangeRef] = useEdgesState(initialEdges);
//   const [loading, setLoading] = useState(false);
//   const loadedFirst = useRef(false);
//   const workflow = useQuery(api.workflows.getWorkflow, {
//     id: workflowId as Id<"workflows">,
//   });


//   const setNodesFn = useCallback((nodes: BuilderNode[]) => {
//     setNodes(nodes);
//   }, []);
//   const setEdgesFn = useCallback((edges: BuilderEdge[]) => {
//     setEdges(edges);
//   }, []);

//   const setLoadingFn = useCallback((loading: boolean) => {
//     setLoading(loading);
//   }, []);

//   const value: BuilderContextType = {
//     // state: {
//     //   loading,
//     //   error: null,
//     //   hasChangesToSave: false,
//     // },
//     nodes,
//     edges,
//     onNodesChange: onNodesChangeRef,
//     onEdgesChange: onEdgesChangeRef,
//     setNodes: setNodesFn,
//     setEdges: setEdgesFn,
//     setLoading: setLoadingFn,
//   };

//   useEffect(() => {
//     if (workflow != null && !loadedFirst.current) {
//       const parsedTemplate = JSON.parse(workflow.template ?? "{}") as Template;
//       setNodes(parsedTemplate.nodes);
//       setEdges(parsedTemplate.edges);
//     }
//   }, [workflow]);

//   return (
//     <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
//   );
// };

// // Hook to use the builder context
// export const useBuilder = (): BuilderContextType => {
//   const context = useContext(BuilderContext);
//   if (context === undefined) {
//     throw new Error("useBuilder must be used within a BuilderProvider");
//   }
//   return context;
// };

