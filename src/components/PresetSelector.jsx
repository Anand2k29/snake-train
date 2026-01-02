"use client";
import LiveStats from "./LiveStats";

// Only define Python for now
const PRESETS_DATA = {
  python: {
    basic: { label: "Basic List", icon: "🔗", color: "bg-cyan-200", code: `head = Node(10)\nhead.next = Node(20)\nhead.next.next = Node(30)` },
    cycle: { label: "Cycle Loop", icon: "🔄", color: "bg-rose-200", code: `head = Node(1)\nnode2 = Node(2)\nhead.next = node2\nnode2.next = head` },
    circular: { label: "Circular", icon: "⭕", color: "bg-violet-200", code: `head = Node(1)\nsecond = Node(2)\nthird = Node(3)\nhead.next = second\nsecond.next = third\nthird.next = head` },
  }
};

export default function PresetSelector({ onSelect, language }) {
  
  const currentPresets = PRESETS_DATA[language];

  return (
    <div className="flex flex-col gap-2 p-3 bg-white h-48 overflow-y-auto border-t-0 border-black">
      
      <div className="sticky top-0 bg-white z-10 py-1 border-b-2 border-dashed border-gray-300 mb-1 flex justify-between items-center">
        <div className="text-black text-xs font-black uppercase tracking-wider">
            📚 {language.toUpperCase()} Examples
        </div>
      </div>

      {/* Only show buttons if language is Python */}
      {language === 'python' ? (
        <>
          <button
              onClick={() => onSelect("# New Code\nhead = Node(1)")}
              className="group relative w-full h-10 mb-2"
            >
                <div className="absolute inset-0 bg-black translate-x-0.5 translate-y-0.5 rounded transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                <div className="relative border-2 border-black bg-white rounded px-2 h-full flex items-center justify-center gap-2 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0">
                    <span className="text-sm">✨</span>
                    <span className="text-xs font-black text-black uppercase tracking-wider">
                        Create New (Python)
                    </span>
                </div>
          </button>
          
          <div className="grid grid-cols-1 gap-2 opacity-90 hover:opacity-100 transition-opacity">
          {Object.entries(currentPresets).map(([key, item]) => (
            <button
              key={key}
              onClick={() => onSelect(item.code)}
              className="group relative w-full h-8"
            >
                <div className="absolute inset-0 bg-black translate-x-0.5 translate-y-0.5 rounded transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                <div className={`relative border-2 border-black ${item.color} rounded px-2 h-full text-left flex items-center gap-2 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0`}>
                    <span className="text-xs">{item.icon}</span>
                    <span className="text-[10px] font-bold text-black uppercase tracking-wider truncate">
                        {item.label}
                    </span>
                </div>
            </button>
          ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded bg-gray-50 text-xs text-gray-400 font-bold italic">
            🚧 Examples Coming Soon 🚧
        </div>
      )}

      <div className="flex flex-col gap-1 mt-2">
          <LiveStats /> 
          <div className="flex flex-col items-center pt-2 text-[9px] text-gray-400 font-bold uppercase tracking-widest hover:text-black transition-colors">
            <span>Built by MR.MINEJES</span>
            <span>Discord: SpidyOnRest</span>
          </div>
      </div>

    </div>
  );
}