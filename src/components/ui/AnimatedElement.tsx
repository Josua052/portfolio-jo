"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedElement({ 
  children, 
  className = "", 
  delay = 0, 
  initialX = 0, 
  initialY = 40, 
  exitX = 0, 
  exitY = -40 
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  initialX?: number;
  initialY?: number;
  exitX?: number;
  exitY?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const x = useTransform(scrollYProgress, [0, 1], [0, exitX]);
  const y = useTransform(scrollYProgress, [0, 1], [0, exitY]);

  return (
    <motion.div ref={ref} style={{ opacity, x, y }} className={className}>
      <motion.div
        initial={{ opacity: 0, x: initialX, y: initialY }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
