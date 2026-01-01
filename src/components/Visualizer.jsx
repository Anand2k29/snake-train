"use client";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import LinkedListNode from "./LinkedListNode"; 
import { LayoutGroup } from "framer-motion";

const nodeTypes = {
  linkedListNode: LinkedListNode,
};

export default function Visualizer({ nodes = [], edges = [], onNodesChange, onEdgesChange }) {

  const styledNodes = nodes.map(node => ({
    ...node,
    type: 'linkedListNode', 
  }));

  const styledEdges = edges.map(edge => ({
    ...edge,
    style: { ...edge.style, strokeWidth: 3, stroke: "black" },
    animated: true, 
  }));

  return (
    <div className="h-full w-full bg-[#85dcff]"> 
      <LayoutGroup>
      <ReactFlow 
        nodes={styledNodes} 
        edges={styledEdges} 
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes} 
        fitView
        // ⬇️ THIS FIXES THE "HUGE NODES" ISSUE (Max zoom is set to normal 100%)
        fitViewOptions={{ padding: 0.2, maxZoom: 1 }} 
        panActivationKeyCode={null} 
      >
        <Background color="#000" gap={25} size={2} variant="dots" style={{ opacity: 0.1 }} />
        <Controls className="!bg-white !border-2 !border-black !shadow-[4px_4px_0px_black] !m-4" />
      </ReactFlow>
      </LayoutGroup>

      {/* LEGEND */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] z-10 scale-90 origin-top-left">
        <div className="font-black mb-1 text-black uppercase tracking-widest text-[10px] border-b-2 border-black pb-0.5">Legend</div>
        
        <div className="flex items-center gap-2 mb-1">
           <div className="w-6 h-0 border-b-4 border-black border-dotted"></div> 
           <span className="font-bold text-[10px] text-black">Next</span>
        </div>

        <div className="flex items-center gap-2">
           <div className="w-6 h-0 border-b-4 border-amber-500 border-dotted"></div>
           <span className="font-bold text-[10px] text-black">Prev</span>
        </div>
      </div>
    </div>
  );
}