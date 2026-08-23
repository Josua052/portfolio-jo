"use client";

import React, { useState, useEffect } from "react";
import {
  IconRefresh,
  IconExternalLink,
  IconQrcode,
  IconDeviceMobile,
  IconWifi,
  IconX,
  IconCheck,
  IconCopy,
  IconLoader2,
  IconSparkles,
} from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";

export interface MobileAppMockupProps {
  appUrl: string;
  appName?: string;
  appCategory?: string;
  className?: string;
  showCustomUrlInput?: boolean;
}

export type FrameColor = "titanium-dark" | "titanium-natural" | "midnight-blue" | "deep-purple";

export function MobileAppMockup({
  appUrl: initialAppUrl,
  appName = "Flutter Mobile Preview",
  appCategory,
  className = "",
  showCustomUrlInput = true,
}: MobileAppMockupProps) {
  const [appUrl, setAppUrl] = useState(initialAppUrl);
  const [customInputUrl, setCustomInputUrl] = useState(initialAppUrl);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("09:41");
  const [frameColor, setFrameColor] = useState<FrameColor>("titanium-dark");
  const [isDynamicIslandExpanded, setIsDynamicIslandExpanded] = useState(false);

  // Sync if initialAppUrl prop changes
  useEffect(() => {
    setAppUrl(initialAppUrl);
    setCustomInputUrl(initialAppUrl);
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  }, [initialAppUrl]);

  // Update time for status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleRestart = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputUrl.trim()) return;
    let target = customInputUrl.trim();
    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      target = `https://${target}`;
    }
    setAppUrl(target);
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  // Color theme presets for realistic iPhone border & shadow
  const getFrameColorStyles = () => {
    switch (frameColor) {
      case "titanium-natural":
        return {
          frameBg: "bg-stone-800",
          border: "border-stone-500/80",
          ring: "ring-stone-600/30",
        };
      case "midnight-blue":
        return {
          frameBg: "bg-slate-950",
          border: "border-blue-900/70",
          ring: "ring-blue-500/30",
        };
      case "deep-purple":
        return {
          frameBg: "bg-[#181124]",
          border: "border-purple-900/70",
          ring: "ring-purple-500/30",
        };
      case "titanium-dark":
      default:
        return {
          frameBg: "bg-neutral-950",
          border: "border-neutral-700/80",
          ring: "ring-neutral-800/60",
        };
    }
  };

  const frameStyles = getFrameColorStyles();

  return (
    <div className={`flex flex-col items-center gap-5 select-none ${className}`}>
      {/* Top Floating Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 shadow-xl text-xs text-neutral-300">
        {/* Restart Button */}
        <button
          onClick={handleRestart}
          type="button"
          title="Restart Flutter Web Application"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-neutral-100 rounded-full font-medium transition shadow-sm cursor-pointer"
        >
          <IconRefresh
            className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-blue-400" : ""}`}
          />
          <span>Restart App</span>
        </button>

        {/* QR Code Button */}
        <button
          onClick={() => setShowQrModal(true)}
          type="button"
          title="Scan QR on physical phone"
          className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-neutral-800 active:scale-95 text-neutral-300 hover:text-white rounded-full font-medium transition cursor-pointer"
        >
          <IconQrcode className="w-3.5 h-3.5 text-emerald-400" />
          <span>Scan on Phone</span>
        </button>

        {/* Fullscreen / New Tab */}
        <a
          href={appUrl}
          target="_blank"
          rel="noreferrer"
          title="Open Flutter App in full browser tab"
          className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-neutral-800 active:scale-95 text-neutral-300 hover:text-white rounded-full font-medium transition"
        >
          <IconExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          <span>Fullscreen</span>
        </a>

        <div className="h-3.5 w-px bg-neutral-700 mx-0.5 hidden sm:block" />

        {/* Frame Color Picker */}
        <div className="hidden sm:flex items-center gap-1.5 pl-1">
          <span className="text-[11px] text-neutral-400">Color:</span>
          <button
            type="button"
            onClick={() => setFrameColor("titanium-dark")}
            className={`w-4 h-4 rounded-full bg-neutral-900 border ${
              frameColor === "titanium-dark" ? "border-blue-400 scale-110" : "border-neutral-600"
            }`}
            title="Titanium Black"
          />
          <button
            type="button"
            onClick={() => setFrameColor("titanium-natural")}
            className={`w-4 h-4 rounded-full bg-stone-500 border ${
              frameColor === "titanium-natural" ? "border-blue-400 scale-110" : "border-neutral-600"
            }`}
            title="Natural Titanium"
          />
          <button
            type="button"
            onClick={() => setFrameColor("midnight-blue")}
            className={`w-4 h-4 rounded-full bg-blue-900 border ${
              frameColor === "midnight-blue" ? "border-blue-400 scale-110" : "border-neutral-600"
            }`}
            title="Midnight Blue"
          />
          <button
            type="button"
            onClick={() => setFrameColor("deep-purple")}
            className={`w-4 h-4 rounded-full bg-purple-900 border ${
              frameColor === "deep-purple" ? "border-blue-400 scale-110" : "border-neutral-600"
            }`}
            title="Deep Purple"
          />
        </div>
      </div>

      {/* Main Smartphone Container with Realistic Physics Bezel & Hardware Buttons */}
      <div className="relative group">
        {/* Left Side Hardware Buttons (Action Button, Volume Up, Volume Down) */}
        <div className="absolute -left-[5px] top-24 w-[3px] h-7 bg-neutral-600 rounded-l-sm" />
        <div className="absolute -left-[5px] top-36 w-[3px] h-12 bg-neutral-600 rounded-l-sm" />
        <div className="absolute -left-[5px] top-52 w-[3px] h-12 bg-neutral-600 rounded-l-sm" />

        {/* Right Side Power Button */}
        <div className="absolute -right-[5px] top-36 w-[3px] h-16 bg-neutral-600 rounded-r-sm" />

        {/* Outer Smartphone Body (iPhone 16 Pro Style) */}
        <div
          className={`relative w-[340px] sm:w-[380px] h-[700px] sm:h-[770px] ${frameStyles.frameBg} rounded-[54px] p-[11px] shadow-2xl shadow-black/80 border-[5px] ${frameStyles.border} ring-1 ${frameStyles.ring} transition-all duration-300`}
        >
          {/* Subtle Outer Bezel Metallic Reflection */}
          <div className="absolute inset-0 rounded-[50px] pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-70" />

          {/* Inner Display Area (Screen Screen Wrapper) */}
          <div className="w-full h-full bg-black rounded-[44px] overflow-hidden relative shadow-inner flex flex-col">
            
            {/* Real-time Status Bar */}
            <div className="h-11 w-full bg-transparent px-7 pt-3.5 flex items-center justify-between z-30 pointer-events-none text-white text-xs font-semibold tracking-tight">
              {/* Clock Time */}
              <span className="w-12 text-center text-[13px] font-medium tracking-tight text-white/90 drop-shadow">
                {currentTime}
              </span>

              {/* Dynamic Island (Interactive pill) */}
              <div
                onClick={() => setIsDynamicIslandExpanded((prev) => !prev)}
                className={`pointer-events-auto cursor-pointer absolute top-3 left-1/2 -translate-x-1/2 bg-black rounded-full transition-all duration-300 ease-out z-40 flex items-center justify-between px-2.5 border border-white/10 shadow-lg ${
                  isDynamicIslandExpanded
                    ? "w-60 h-10 -translate-y-0.5 bg-neutral-950/95"
                    : "w-28 h-6 hover:scale-105"
                }`}
              >
                {/* Dynamic Island Content */}
                {isDynamicIslandExpanded ? (
                  <div className="flex items-center justify-between w-full text-[10px] text-white">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="font-mono text-blue-300 font-medium truncate max-w-[100px]">
                        {appName.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400">
                      <IconSparkles className="w-3 h-3 text-amber-400" />
                      <span>Flutter Web</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    {/* Front Camera Lens Reflection */}
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700/80 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-blue-900/60" />
                    </div>
                  </>
                )}
              </div>

              {/* Status Icons: Sinyal, WiFi, Baterai */}
              <div className="flex items-center gap-1.5 text-white/90 drop-shadow">
                <span className="text-[10px] font-bold tracking-tighter mr-0.5">5G</span>
                <IconWifi className="w-3.5 h-3.5" />
                <div className="flex items-center gap-0.5">
                  <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1px] flex items-center">
                    <div className="h-full w-full bg-white rounded-[1.5px]" />
                  </div>
                  <div className="w-0.5 h-1 bg-white/80 rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* Screen Content: Iframe with Skeleton Loader */}
            <div className="w-full flex-1 relative bg-neutral-900 overflow-hidden">
              {/* Animated Loading Skeleton */}
              {isLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950 text-neutral-400 gap-3 px-6 text-center animate-fadeIn">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
                      <IconDeviceMobile className="w-7 h-7 animate-bounce" />
                    </div>
                    <IconLoader2 className="w-5 h-5 text-blue-400 animate-spin absolute -top-1 -right-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-200">
                      Memuat {appName}...
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Menyiapkan runtime Flutter Web engine
                    </p>
                  </div>
                  <div className="w-36 h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              )}

              {/* The Flutter Web Iframe */}
              <iframe
                key={iframeKey}
                src={appUrl}
                title={appName}
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-0 select-none bg-white transition-opacity duration-300"
                allow="accelerometer; autoplay; camera; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
              />

              {/* Glare Reflection overlay for photorealism */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07] z-10" />
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="h-6 w-full flex items-center justify-center bg-black z-30">
              <div className="w-36 h-1 bg-white/40 rounded-full active:bg-white/70 transition-colors pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Optional Custom URL Input & Quick Switcher for Testing Live Flutter Apps */}
      {showCustomUrlInput && (
        <form
          onSubmit={handleApplyCustomUrl}
          className="w-full max-w-md bg-neutral-900/70 p-2 rounded-2xl border border-neutral-800 flex items-center gap-2 mt-2 shadow-lg"
        >
          <div className="pl-2 text-neutral-400">
            <IconDeviceMobile className="w-4 h-4 text-blue-400" />
          </div>
          <input
            type="url"
            value={customInputUrl}
            onChange={(e) => setCustomInputUrl(e.target.value)}
            placeholder="https://your-flutter-web-vercel.app"
            className="flex-1 bg-transparent text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none px-1"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-medium rounded-xl transition cursor-pointer"
          >
            Load App
          </button>
        </form>
      )}

      {/* Modal QR Code untuk Mencoba di HP Fisik */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center">
            {/* Close Button */}
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition"
            >
              <IconX className="w-5 h-5" />
            </button>

            {/* Icon & Title */}
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3">
              <IconQrcode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Buka di Smartphone Anda
            </h3>
            <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
              Arahkan kamera HP Anda ke QR Code di bawah untuk mencoba aplikasi{" "}
              <span className="text-emerald-400 font-semibold">{appName}</span> secara langsung.
            </p>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-2xl inline-block shadow-lg mb-5">
              <QRCodeSVG
                value={appUrl}
                size={180}
                level="H"
                includeMargin={false}
              />
            </div>

            {/* Copy Link Button */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="flex-1 bg-neutral-800 text-xs text-neutral-300 px-3 py-2 rounded-xl border border-neutral-700 focus:outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopyUrl}
                className="flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer"
              >
                {copied ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
                <span>{copied ? "Tersalin!" : "Salin"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
