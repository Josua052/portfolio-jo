"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function GlobeCobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // [1,1,1] in dark mode creates bright white dots
      markerColor: [0.133, 0.772, 0.368], // Tailwind Green-500
      glowColor: [1, 1, 1], // Bright white glow to make the edge visible
      markers: [
        // Jakarta: lat, lng
        { location: [-6.2088, 106.8456], size: 0.1 },
      ],
      // @ts-expect-error cobe types are missing onRender
      onRender: (state) => {
        // Handle drag to rotate
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + pointerInteractionMovement.current;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
        cursor: "grab",
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 1,
          transition: "opacity 1s ease",
          touchAction: "none",
        }}
      />
    </div>
  );
}
