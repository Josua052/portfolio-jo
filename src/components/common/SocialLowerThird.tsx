"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import contactsData from "@/data/contact.json";
import * as Icons from "lucide-react";

export default function SocialLowerThird() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<"hidden" | "icon" | "expanded">("hidden");

  useEffect(() => {
    // The total cycle is 6 seconds.
    // 0s -> icon appears
    // 0.8s -> expands to text
    // 4.5s -> retracts
    // 5.5s -> hidden & index changes
    const cycle = () => {
      setStage("icon");
      
      setTimeout(() => {
        setStage("expanded");
      }, 800);

      setTimeout(() => {
        setStage("hidden");
      }, 4500);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % contactsData.length);
      }, 5000);
    };

    // Start immediately
    cycle();

    // Repeat every 6 seconds
    const interval = setInterval(cycle, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentContact = contactsData[currentIndex];
  // @ts-ignore
  const Icon = Icons[currentContact.icon] || Icons.Link;

  return (
    <div className="fixed bottom-6 right-6 z-40 h-[44px] flex items-center justify-end pointer-events-none">
      <AnimatePresence mode="wait">
        {stage !== "hidden" && (
          <motion.a
            key={currentContact.id}
            href={currentContact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[var(--background)] border border-[var(--border)] rounded-full overflow-hidden shadow-lg pointer-events-auto hover:bg-[var(--hover)] transition-colors h-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: stage === "expanded" ? "auto" : "44px",
              opacity: 1
            }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.22, 1, 0.36, 1] // Apple-like spring ease
            }}
            // We use padding-right to account for the play button covering the right edge.
            // Play button is ~44px wide. We give 48px padding so content is safely to its left.
            style={{ paddingRight: "48px" }}
          >
            {/* 
              The content wrapper must not shrink and text must not wrap 
              so it reveals smoothly as width expands.
            */}
            <div className="flex items-center whitespace-nowrap pl-2 h-full">
              <div className="w-7 h-7 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center shrink-0">
                <Icon size={14} />
              </div>
              
              <motion.div 
                className="flex flex-col justify-center ml-3 pr-2"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ 
                  opacity: stage === "expanded" ? 1 : 0,
                  filter: stage === "expanded" ? "blur(0px)" : "blur(4px)"
                }}
                transition={{ duration: 0.4, delay: stage === "expanded" ? 0.2 : 0 }}
              >
                <span className="text-[9px] uppercase tracking-widest text-[var(--muted)] font-bold leading-none mb-1">
                  {currentContact.platform}
                </span>
                <span className="text-sm font-semibold leading-none text-[var(--foreground)]">
                  {currentContact.display}
                </span>
              </motion.div>
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
