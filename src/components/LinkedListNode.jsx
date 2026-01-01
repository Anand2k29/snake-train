import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";

export default function LinkedListNode({ data }) {
  // Randomize color slightly based on label or just stick to a theme
  const isHead = data.pointers && data.pointers.includes('head');

  return (
    <div className="relative group">
      {/* 1. The Pointers (Stickers) */}
      <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 w-max flex flex-col-reverse items-center gap-2 pointer-events-none z-10">
        {data.pointers && data.pointers.map((ptr) => (
          <motion.div 
            key={ptr}
            layoutId={ptr}
            transition={{type: "spring", stiffness: 300, damping: 20}} 
            className="bg-purple-400 text-white border-2 border-black text-xs px-3 py-1 rounded-full font-black uppercase shadow-[3px_3px_0px_black] rotate-[-5deg]"
          >
            {ptr} 👇
          </motion.div>
        ))}
      </div>

      {/* 2. Actual Node (The Cartoon Box) */}
      <div className={`
        w-20 h-20 flex items-center justify-center
        border-4 border-black rounded-xl
        shadow-[6px_6px_0px_black]
        transition-transform hover:-translate-y-1
        ${isHead ? 'bg-yellow-300' : 'bg-white'}
      `}>
        <div className="text-2xl font-black text-black font-mono">
            {data.label}
        </div>
      </div>

      {/* 3. Connectors (Handles) - styled larger */}
      <Handle type="target" position={Position.Left} id="next-tgt" className="!w-4 !h-4 !bg-blue-500 !border-2 !border-black" style={{top: '35%'}}/>
      <Handle type="source" position={Position.Right} id="next-src" className="!w-4 !h-4 !bg-black !border-2 !border-white" style={{top:'35%'}}/>

      <Handle type="source" position={Position.Left} id="prev-src" className="!w-3 !h-3 !bg-black" style={{top:'65%'}}/>
      <Handle type="target" position={Position.Right} id="prev-tgt" className="!w-3 !h-3 !bg-orange-400" style={{top:'65%'}}/>

      <Handle type="source" position={Position.Bottom} id="t-src" className="opacity-0" style={{ left: '60%' }} />
      <Handle type="target" position={Position.Bottom} id="t-tgt" className="opacity-0" style={{ left: '40%' }} />
    </div>
  );
}