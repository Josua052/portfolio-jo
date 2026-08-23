"use client";

import React, { useState } from "react";
import { FLUTTER_MOBILE_APPS, FlutterMobileApp } from "@/data/flutterProjects";
import { MobileAppMockup } from "@/components/MobileAppMockup";
import * as Icons from "lucide-react";

export default function FlutterMockupShowcase() {
  const [selectedApp, setSelectedApp] = useState<FlutterMobileApp>(FLUTTER_MOBILE_APPS[0]);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-neutral-950 text-white border-t border-neutral-800/80">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Icons.Smartphone className="w-4 h-4" /> Flutter Mobile Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Preview Aplikasi Mobile Interaktif
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Jalankan dan berinteraksi langsung dengan aplikasi Flutter Web di dalam bingkai smartphone realistis, atau scan QR code untuk mencobanya di ponsel Anda.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {FLUTTER_MOBILE_APPS.map((app) => {
            const isSelected = selectedApp.id === app.id;
            return (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                type="button"
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800"
                }`}
              >
                <span className="text-base">{app.icon}</span>
                <span>{app.title}</span>
                {isSelected && <Icons.Sparkles className="w-3.5 h-3.5 text-cyan-300 ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Content Layout: Left App Details & Right Smartphone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left App Details */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700/80 flex items-center justify-center text-2xl">
                  {selectedApp.icon}
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    {selectedApp.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {selectedApp.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs font-medium text-neutral-300 italic mb-4 bg-neutral-950/70 p-3 rounded-xl border border-neutral-800">
                "{selectedApp.tagline}"
              </p>

              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                {selectedApp.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
                  Fitur Utama
                </h4>
                <div className="space-y-2">
                  {selectedApp.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Icons.Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2.5">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 text-[11px] font-medium border border-neutral-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Smartphone Simulator Mockup */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2">
            <MobileAppMockup
              appUrl={selectedApp.appUrl}
              appName={selectedApp.title}
              appCategory={selectedApp.category}
              showCustomUrlInput={true}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
