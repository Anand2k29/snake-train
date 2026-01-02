"use client";
import { useState, useEffect } from "react";

export default function LiveStats() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    // Get TOTAL VISITS from a free API
    // We use a unique namespace so it counts just for you.
    fetch("https://api.countapi.xyz/hit/snake-train-viz/visits")
      .then((res) => res.json())
      .then((data) => setVisits(data.value))
      .catch((err) => console.log("Counter API Error:", err));
  }, []);

  return (
    <div className="mt-4 pt-2 border-t-2 border-dashed border-gray-300 flex justify-center items-center text-[10px] text-gray-500 font-bold opacity-80">
        
        {/* Total Visits Only */}
        <div className="flex items-center gap-1">
            <span>👁️ Total Views:</span>
            <span className="text-black bg-gray-200 px-1.5 py-0.5 rounded border border-gray-400">
                {visits > 0 ? visits : "..."}
            </span>
        </div>

    </div>
  );
}