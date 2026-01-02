"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language, setLanguage }) {
  
  return (
    <div className="h-full w-full flex flex-col">
      {/* HEADER */}
      <div className="h-10 bg-gray-100 border-b-3 border-black flex items-center justify-between px-3">
        <span className="text-xs font-black uppercase tracking-widest text-gray-500">
          Input Source
        </span>

        {/* Dropdown with Coming Soon Labels */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white border-2 border-black text-xs font-bold uppercase px-2 py-1 rounded shadow-[2px_2px_0px_black] focus:outline-none hover:translate-y-[-1px] active:translate-y-[0px] transition-all cursor-pointer"
        >
          <option value="python">🐍 Python</option>
          <option value="java" className="text-gray-400">☕ Java (Coming Soon)</option>
          <option value="cpp" className="text-gray-400">🚀 C++ (Coming Soon)</option>
        </select>
      </div>

      {/* EDITOR */}
      <div className="flex-grow">
        <Editor
          height="100%"
          language={language === "cpp" || language === "java" ? "java" : "python"} 
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            fontFamily: "monospace",
            readOnly: language !== "python", // Optional: Make it read-only if not python
          }}
        />
      </div>
    </div>
  );
}