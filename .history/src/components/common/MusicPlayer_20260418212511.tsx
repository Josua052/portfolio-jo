"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop src="/music/bg.mp3" />

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full 
        bg-[var(--background)] border border-[var(--border)]
        hover:bg-[var(--hover)] transition"
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
    </>
  );
}