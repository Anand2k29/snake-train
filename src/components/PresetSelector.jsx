"use client";

const PRESETS = {
    basic: {
        label: "Basic List",
        icon: "🔗",
        color: "bg-cyan-200", // Blue
        code: `# Basic singly linked list
head = Node(9)
head.next = Node(18)
head.next.next = Node(27)
head.next.next.next = Node(36)
head.next.next.next.next = Node(45)`
    },

    cycle: {
        label: "Cycle / Loop",
        icon: "🔄",
        color: "bg-rose-200", // Pink
        code: `# cyclic Linked List
head = Node(1)
node2 = Node(2)
node3 = Node(3)
node4 = Node(4)
node5 = Node(5)

head.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node2`
    },

    circular: {
        label: "Circular List",
        icon: "⭕",
        color: "bg-violet-200", // Purple
        code: `# circular Linked List
head = Node(1)
second = Node(2)
third = Node(3)
fourth = Node(4)

head.next = second
second.next = third
third.next = fourth
fourth.next = head`
    },

    intersection: {
        label: "Intersection",
        icon: "Y",
        color: "bg-amber-200", // Orange/Yellow
        code: `# Linked List with an intersection
common = Node(8)
common.next = Node(7)

headA = Node(1)
headA.next = Node(9)
headA.next.next = common

headB = Node(3)
headB.next = common`
    },

    doubly: {
        label: "Doubly Linked",
        icon: "↔️",
        color: "bg-emerald-200", // Green
        code: `# Doubly Linked List
head = Node(9)
head.next = Node(18)
head.next.prev = head
head.next.next = Node(27)
head.next.next.prev = head.next
head.next.next.next = Node(36)
head.next.next.next.prev = head.next.next`
    },
};

export default function PresetSelector({ onSelect }) {
  return (
    <div className="flex flex-col gap-2 p-3 bg-white h-48 overflow-y-auto border-t-0 border-black">
      
      {/* Header: Title + Helper Text side-by-side */}
      <div className="sticky top-0 bg-white z-10 py-1 border-b-2 border-dashed border-gray-300 mb-1 flex items-baseline gap-2">
        <div className="text-black text-xs font-black uppercase tracking-wider">
            📚 Presets
        </div>
        <div className="text-[10px] text-gray-400 font-bold lowercase">
            (click to load)
        </div>
      </div>
      
      {/* Fancy Compact Colorful Buttons */}
      <div className="grid grid-cols-1 gap-2">
      {Object.entries(PRESETS).map(([key, item]) => (
        <button
          key={key}
          onClick={() => onSelect(item.code)}
          className="group relative w-full h-8" // Fixed height for compactness
        >
            {/* Shadow Layer */}
            <div className="absolute inset-0 bg-black translate-x-0.5 translate-y-0.5 rounded transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
            
            {/* Main Button Layer */}
            <div className={`relative border-2 border-black ${item.color} rounded px-2 h-full text-left flex items-center gap-2 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0`}>
                <span className="text-xs">
                    {item.icon}
                </span>
                <span className="text-[10px] font-bold text-black uppercase tracking-wider truncate">
                    {item.label}
                </span>
            </div>
        </button>
      ))}
      </div>
    </div>
  );
}