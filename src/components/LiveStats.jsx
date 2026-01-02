"use client";
import { useState, useEffect } from "react";

export default function LiveStats() {
  const [visits, setVisits] = useState(0);
  const [online, setOnline] = useState(1);

  useEffect(() => {
    // 1. Get TOTAL VISITS from a free API
    // We use a unique namespace so it counts just for you.
    fetch("https://api.countapi.xyz/hit/snake-train-viz/visits")
      .then((res) => res.json())
      .then((data) => setVisits(data.value))
      .catch((err) => console.log("Counter API Error:", err));

    // 2. SIMULATE "Online Users" for the demo
    const interval = setInterval(() => {
        setOnline(Math.floor(Math.random() * 5) + 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 pt-2 border-t-2 border-dashed border-gray-300 flex justify-between items-center text-[10px] text-gray-500 font-bold opacity-80">
        
        {/* Total Visits */}
        <div className="flex items-center gap-1">
            <span>👁️ Visits:</span>
            <span className="text-black bg-gray-200 px-1 rounded">
                {visits > 0 ? visits : "..."}
            </span>
        </div>

        {/* Online Users */}
        <div className="flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Online:</span>
            <span className="text-green-600">
                {online}
            </span>
        </div>

    </div>
  );
}