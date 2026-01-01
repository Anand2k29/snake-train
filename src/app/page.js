"use client";
import { useState, useRef, useEffect } from "react";
import Script from "next/script"; 
import CodeEditor from "../components/CodeEditor";
import Visualizer from "../components/Visualizer";
import { SETUP_CODE } from "../utils/pythonSetup";
import { useNodesState, useEdgesState } from "reactflow";
import PresetSelector from "../components/PresetSelector";

export default function Home() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Tutorial Modal State
  const [showTutorial, setShowTutorial] = useState(true);

  // Default Mini-Tutorial Code
  const [code, setCode] = useState(`# 🐍 Welcome to Snake-Train!
# -----------------------------
# Type code here to build your list line-by-line.
# Watch the visualizer on the left update instantly!

# 1. Start by creating a head node:
head = Node(10)

# 2. Add a second node:
head.next = Node(20)

# 3. Now it's your turn...
# Try typing: head.next.next = Node(30)
`);

  const [output, setOutput] = useState("")
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const pyodideRef = useRef(null);
  const [isAutoRun, setIsAutoRun] = useState(true);
  
  useEffect(() => {
    if (!isAutoRun || !pyodideRef.current) return;
    const timer = setTimeout(() => { runCode() }, 1500);
    return () => clearTimeout(timer);
  }, [code, isAutoRun, isPyodideReady]);

  async function initPyodide() {
    if (typeof window.loadPyodide !== "function") {
       setTimeout(initPyodide, 500); 
       return;
    }
    try {
      const py = await window.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/" });
      pyodideRef.current = py;
      setIsPyodideReady(true);
    } catch (err) { setOutput(`Engine Error: ${err.message}`); }
  }

  const runCode = () => {
    setOutput("");
    setHistory([]);
    if (window.pyWorker) window.pyWorker.terminate();
    const worker = new Worker("/pyWorker.js");
    window.pyWorker = worker;
    const safeCode = typeof code === "string" ? code : "";
    const hasCode = safeCode.split('\n').some(line => line.trim() && !line.trim().startsWith('#'));
    const indentedCode = hasCode ? safeCode.split('\n').map(line => '    ' + line).join('\n') : '    pass';
    const protectedCode = `try:\n${indentedCode}\nexcept Exception as e:\n    raise e`;
    
    const timeout = setTimeout(() => {
      worker.terminate();
      setOutput("⛔ Time Limit Exceeded");
    }, 5000);
    
    worker.onmessage = (e) => {
      const { type, data } = e.data;
      if (type === "stdout") setOutput(prev => prev + data + "\n");
      if (type === "history") {
        clearTimeout(timeout);
        try {
            const newHistory = JSON.parse(data);
            if (newHistory.length > 0) {
                setHistory(newHistory);
                const lastIndex = newHistory.length - 1;
                setCurrentStep(lastIndex);
                setNodes(newHistory[lastIndex].nodes);
                setEdges(newHistory[lastIndex].edges);
            } else { setNodes([]); setEdges([]); }
        } catch (err) { setOutput(`Visualizer Error: ${err.message}`); }
      }
      if (type === "error") setOutput(prev => prev + `Runtime Error: ${data}\n`);
    };
    worker.postMessage({ setupCode: SETUP_CODE, userCode: protectedCode });
  };

  const handleScrub = (e) => {
    const step = parseInt(e.target.value);
    setCurrentStep(step);
    if (history[step]) {
      setNodes(history[step].nodes);
      setEdges(history[step].edges);
    }
  };

  const handlePresetSelect = (newCode) => {
    setCode(newCode);
  };

  return (
    <main className="flex h-screen w-screen p-4 gap-4 overflow-hidden relative">
      <Script src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js" strategy="afterInteractive" onLoad={initPyodide} />

      {/* 🟢 TUTORIAL MODAL (Instruction Page) */}
      {showTutorial && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
           <div className="bg-white p-6 rounded-xl border-4 border-black shadow-[8px_8px_0px_black] max-w-md w-full animate-in zoom-in-95 duration-200">
              
              <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                 <h2 className="text-2xl font-black uppercase italic tracking-tighter">🐍 Snake Train</h2>
                 <span className="text-xl">👋</span>
              </div>

              <div className="space-y-4 text-sm font-medium">
                  <p className="bg-yellow-100 p-3 rounded border-2 border-black">
                     1. 📝 <strong>Write Code:</strong> Type Python code on the right panel.
                  </p>
                  <p className="bg-blue-100 p-3 rounded border-2 border-black">
                     2. 👀 <strong>Visualize:</strong> Watch the Linked List build itself instantly.
                  </p>
                  <p className="bg-green-100 p-3 rounded border-2 border-black">
                     3. 🖱️ <strong>Interact:</strong> <span className="underline decoration-wavy decoration-red-500 font-bold">You can DRAG the nodes</span> to rearrange them!
                  </p>
              </div>

              <button 
                onClick={() => setShowTutorial(false)}
                className="w-full mt-6 bg-black text-white font-bold uppercase py-3 rounded border-2 border-black hover:bg-gray-800 hover:translate-y-[2px] hover:shadow-none shadow-[4px_4px_0px_gray] transition-all"
              >
                Let's Code! 🚀
              </button>
           </div>
        </div>
      )}

      {/* LEFT CARD: Visualizer */}
      <div className="w-[60%] flex flex-col neo-box bg-white rounded-xl overflow-hidden relative">
        <div className="flex-grow relative border-b-3 border-black">
            <Visualizer nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} />

            <button 
                className={`absolute top-4 right-4 z-10 neo-button ${!isPyodideReady ? "bg-gray-300 text-gray-500" : "bg-[#4ADE80] text-black hover:bg-[#22c55e]"}`}
                onClick={runCode}
                disabled={!isPyodideReady}
            >
                {!isPyodideReady ? "Loading..." : "Run Code ▶"}
            </button>
            
            <div className="absolute top-6 right-[12rem] z-10 flex items-center gap-2 bg-white px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_black]">
                <div className={`w-3 h-3 rounded-full border border-black ${isAutoRun ? "bg-green-500" : "bg-red-500"}`} />
                <label className="text-xs font-bold text-black cursor-pointer select-none">
                    <input type="checkbox" className="hidden" checked={isAutoRun} onChange={(e) => setIsAutoRun(e.target.checked)} />
                    {isAutoRun ? "Live Mode ON" : "Live Mode OFF"}
                </label>
            </div>
        </div>

        {history.length > 0 && (
            <div className="h-14 bg-yellow-100 flex items-center px-4 gap-4 z-20 shrink-0 border-b-3 border-black">
                <button onClick={() => handleScrub({target: {value: Math.max(0, currentStep - 1)}})} className="neo-button bg-white text-xs py-1 px-2">◀</button>
                <input 
                    type="range" min="0" max={history.length - 1} value={currentStep} onChange={handleScrub}
                    className="flex-grow accent-black h-4 bg-white border-2 border-black rounded-full appearance-none cursor-pointer"
                />
                <button onClick={() => handleScrub({target: {value: Math.min(history.length - 1, currentStep + 1)}})} className="neo-button bg-white text-xs py-1 px-2">▶</button>
                <span className="text-xs font-black text-black min-w-[60px] text-right">Step: {currentStep} / {history.length - 1}</span>
            </div>
        )}

        <div className="h-32 bg-black text-green-400 p-2 font-mono text-xs overflow-auto shrink-0 border-t-2 border-black">
            <div className="text-white mb-1 uppercase font-bold">Console Output:</div>
            <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>

      {/* RIGHT CARD: Code Editor */}
      <div className="w-[40%] flex flex-col neo-box bg-white rounded-xl overflow-hidden">
        <div className="flex-grow relative border-b-3 border-black">
          <CodeEditor code={code} setCode={setCode} />
        </div>
        <PresetSelector onSelect={handlePresetSelect} />
      </div>
    </main>
  );
}