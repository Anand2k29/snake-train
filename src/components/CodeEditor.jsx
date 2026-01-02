"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language, setLanguage }) {
  
  return (
    <div className="h-full w-full flex flex-col">
      {/* 🟢 EDITOR HEADER & LANGUAGE SELECTOR */}
      <div className="h-10 bg-gray-100 border-b-3 border-black flex items-center justify-between px-3">
        <span className="text-xs font-black uppercase tracking-widest text-gray-500">
          Input Source
        </span>

        {/* The Language Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white border-2 border-black text-xs font-bold uppercase px-2 py-1 rounded shadow-[2px_2px_0px_black] focus:outline-none hover:translate-y-[-1px] active:translate-y-[0px] transition-all cursor-pointer"
        >
          <option value="python">🐍 Python</option>
          <option value="java">☕ Java</option>
          <option value="cpp">🚀 C++</option>
        </select>
      </div>

      {/* 🟡 MONACO EDITOR */}
      <div className="flex-grow">
        <Editor
          height="100%"
          language={language === "cpp" ? "cpp" : "python"} // Monaco uses 'cpp' or 'python'
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            fontFamily: "monospace",
          }}
        />
      </div>
    </div>
  );
}