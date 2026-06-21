"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Map2D() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div 
      className="relative w-full h-full bg-transparent overflow-hidden cursor-pointer flex items-center justify-center group"
      onClick={() => setIsZoomed(!isZoomed)}
    >
      <motion.div
        className="relative w-[130%] flex items-center justify-center"
        initial={false}
        animate={{
          scale: isZoomed ? 4.5 : 1,
          x: isZoomed ? "-27%" : "0%",
          y: isZoomed ? "-12%" : "0%",
        }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        style={{ aspectRatio: "2/1", transformOrigin: "77% 62%" }}
      >
        {/* We use CSS filter to make the SVG map white/gray on the dark background */}
        <img 
          src="/images/world-map.svg" 
          alt="World Map" 
          className="w-full h-full opacity-30 select-none pointer-events-none"
          draggable="false"
          style={{ filter: "invert(1) opacity(0.8)" }}
        />
        
        {/* Jakarta Marker */}
        <motion.div 
          className="absolute"
          style={{ 
            top: "62%", 
            left: "77%", 
          }}
          animate={{ scale: isZoomed ? 0.35 : 1 }} 
        >
          <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
             <span className="absolute w-5 h-5 bg-[#22c55e] rounded-full animate-ping opacity-60" />
             <span className="relative w-2 h-2 bg-[#22c55e] rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
             
             {isZoomed && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-[11px] font-bold text-white border border-white/10"
                >
                  Jakarta, ID
                </motion.div>
             )}
          </div>
        </motion.div>
      </motion.div>

      {/* Overlay - Bottom Left */}
      <motion.div 
        animate={{ opacity: isZoomed ? 0 : 1 }}
        className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 border border-white/10 backdrop-blur-md pointer-events-none"
      >
         <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
         <span className="text-white text-[11px] font-semibold tracking-wide">Jakarta, ID</span>
      </motion.div>

      {/* Overlay - Hint */}
      <div className="absolute top-3 right-3 bg-white/5 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
         <span className="text-white/80 text-[9px] uppercase tracking-widest font-semibold pointer-events-none">
           {isZoomed ? "Click to Zoom Out" : "Click to Zoom In"}
         </span>
      </div>
    </div>
  );
}
