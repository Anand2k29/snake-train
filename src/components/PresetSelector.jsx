"use client";
import LiveStats from "./LiveStats";

// 1. DATA: All 7 Python Presets
const PRESETS_DATA = {
  python: {
    basic: { 
      label: "Basic Singly List", 
      icon: "🔗", 
      color: "bg-cyan-200", 
      code: `# 🔗 Basic Singly Linked List
# Each node points to the next one.

# 1. Create the head
head = Node(10)

# 2. Attach more nodes
head.next = Node(20)
head.next.next = Node(30)
head.next.next.next = Node(40)` 
    },

    doubly: { 
      label: "Doubly Linked List", 
      icon: "↔️", 
      color: "bg-emerald-200", 
      code: `# ↔️ Doubly Linked List
# Nodes have 'next' AND 'prev' pointers.

head = Node(10)
node2 = Node(20)
node3 = Node(30)

# Connect Forward
head.next = node2
node2.next = node3

# Connect Backward (prev)
node2.prev = head
node3.prev = node2` 
    },

    cycle: { 
      label: "Cycle / Loop (Trap)", 
      icon: "🪤", 
      color: "bg-rose-200", 
      code: `# 🪤 List with a Cycle
# The last node points back to an earlier node,
# creating an infinite loop!

head = Node(1)
node2 = Node(2)
node3 = Node(3)
node4 = Node(4)

# Build the line
head.next = node2
node2.next = node3
node3.next = node4

# Create the cycle (4 -> 2)
node4.next = node2` 
    },

    circular: { 
      label: "Circular List", 
      icon: "⭕", 
      color: "bg-violet-200", 
      code: `# ⭕ Circular Linked List
# The last node points all the way back to Head.

head = Node('A')
second = Node('B')
third = Node('C')
fourth = Node('D')

# Connect them
head.next = second
second.next = third
third.next = fourth

# Close the circle
fourth.next = head` 
    },

    intersection: { 
      label: "Intersection (Y-Shape)", 
      icon: "Y", 
      color: "bg-amber-200", 
      code: `# 🛤️ Intersection of Two Lists
# Two separate heads merge into one common path.

# 1. Create the common tail
common = Node(100)
common.next = Node(200)

# 2. List A connects to common
headA = Node(1)
headA.next = Node(2)
headA.next.next = common

# 3. List B connects to common
headB = Node(99)
headB.next = common` 
    },

    middle: {
        label: "Tortoise & Hare Setup",
        icon: "🐢",
        color: "bg-blue-200",
        code: `# 🐢 Finding the Middle
# Often used with slow (tortoise) and fast (hare) pointers.

head = Node(10)
head.next = Node(20)
head.next.next = Node(30)
head.next.next.next = Node(40)
head.next.next.next.next = Node(50)

# Setup pointers
slow = head
fast = head

# Move them manually to visualize 1 step
slow = slow.next       # Moves 1 step
fast = fast.next.next  # Moves 2 steps`
    },

    delete: {
        label: "Deleting a Node",
        icon: "✂️",
        color: "bg-orange-200",
        code: `# ✂️ Deleting a Node (Skipping)
# To delete Node(20), we make 10 point directly to 30.

head = Node(10)
to_delete = Node(20)
tail = Node(30)

# Initial Setup: 10 -> 20 -> 30
head.next = to_delete
to_delete.next = tail

# ACTION: Skip the middle node!
head.next = tail

# Node(20) is now disconnected (Garbage Collection)`
    }
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

      {language === 'python' ? (
        <>
          <button
              onClick={() => onSelect("# 🐍 Start Coding Here:\n# Create a node:\nhead = Node(1)")}
              className="group relative w-full h-10 mb-2"
            >
                <div className="absolute inset-0 bg-black translate-x-0.5 translate-y-0.5 rounded transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                <div className="relative border-2 border-black bg-white rounded px-2 h-full flex items-center justify-center gap-2 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0 group-active:translate-y-0">
                    <span className="text-sm">✨</span>
                    <span className="text-xs font-black text-black uppercase tracking-wider">
                        Create New (Empty)
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
        <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded bg-gray-50 text-xs text-gray-400 font-bold italic p-4 text-center">
            <span>🚧 Examples for {language.toUpperCase()} are Coming Soon! 🚧</span>
            <span className="text-[9px] mt-2 text-gray-300">Switch back to Python to see examples.</span>
        </div>
      )}

      <div className="flex flex-col gap-1 mt-2">
          <LiveStats /> 
          
          {/* 👇 UPDATED FOOTER WITH PURPLE AND RED 👇 */}
          <div className="flex flex-col items-center pt-2 text-[9px] font-bold uppercase tracking-widest animate-pulse">
            <span className="text-purple-600">Built by MR.MINEJES</span>
            <span className="text-red-600">Discord: SpidyOnRest</span>
          </div>
      </div>

    </div>
  );
}