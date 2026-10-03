"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box, Layers, Maximize2 } from "lucide-react";

function ArchitecturalStructure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Foundation Concrete Slab */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4.2, 0.2, 4.2]} />
        <meshStandardMaterial
          color="#0f172a"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Main Structural Framing Cube */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[3.8, 2.2, 3.8]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Steel Flitch Ridge Beam (Orange Accent) */}
      <mesh position={[0, 2.3, 0]}>
        <boxGeometry args={[4.0, 0.15, 0.15]} />
        <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.6} />
      </mesh>

      {/* Cantilevered Roof Truss Wireframe */}
      <group position={[0, 2.3, 0]}>
        {[-1.6, -0.8, 0, 0.8, 1.6].map((x, i) => (
          <mesh key={i} position={[x, 0.4, 0]} rotation={[0, 0, 0]}>
            <coneGeometry args={[1.2, 0.9, 4]} />
            <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* Internal Floor Separation */}
      <mesh position={[0, 0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 3.6]} />
        <meshStandardMaterial
          color="#1e293b"
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Structural Corner Columns (High-Tensile Steel) */}
      {[
        [-1.8, 1.0, -1.8],
        [1.8, 1.0, -1.8],
        [-1.8, 1.0, 1.8],
        [1.8, 1.0, 1.8],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.06, 0.06, 2.2, 8]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Ground Grid Helper */}
      <gridHelper args={[8, 16, "#38bdf8", "#1e293b"]} position={[0, -0.2, 0]} />
    </group>
  );
}

export default function BlueprintScene() {
  const [mounted, setMounted] = useState(false);
  const [activeLayer, setActiveLayer] = useState<"all" | "framing" | "mep">("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="blueprint" className="py-20 lg:py-28 relative bg-[#06080e] overflow-hidden border-t border-b border-white/5">
      {/* CAD Axis Guides */}
      <div className="shell-container relative z-10">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            <Box className="w-3.5 h-3.5" />
            <span>Interactive 3D BIM Architectural Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight">
            Structural Clarity. <br />
            <span className="text-gradient-blueprint">Engineered Down to the Millimeter.</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
            Before we set foot on your property, our team builds a fully articulated 3D Building Information Model (BIM).
            Inspect our structural steel load paths and framing schematics in the live 3D canvas below.
          </p>
        </div>

        {/* 3D Canvas Box */}
        <div className="relative w-full h-[460px] sm:h-[540px] rounded-2xl glass-panel cad-corner overflow-hidden border border-sky-500/30 shadow-2xl bg-gradient-to-b from-[#090e1a] to-[#04060a]">
          {/* Top Canvas HUD Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-sky-500/30 text-[11px] font-mono-draft text-sky-300">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>LIVE CAD VIEWPORT // ORBIT ACTIVE</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={() => setActiveLayer("all")}
                className={`text-[10px] uppercase font-bold px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeLayer === "all"
                    ? "bg-sky-500 text-black font-extrabold shadow-md shadow-sky-500/30"
                    : "bg-black/60 text-neutral-400 border border-white/10 hover:text-white"
                }`}
              >
                Full Envelope
              </button>
              <button
                type="button"
                onClick={() => setActiveLayer("framing")}
                className={`text-[10px] uppercase font-bold px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeLayer === "framing"
                    ? "bg-orange-500 text-black font-extrabold shadow-md shadow-orange-500/30"
                    : "bg-black/60 text-neutral-400 border border-white/10 hover:text-white"
                }`}
              >
                Structural Steel Only
              </button>
            </div>
          </div>

          {/* Three.js Canvas */}
          {mounted ? (
            <Canvas
              camera={{ position: [4.5, 3.2, 5.0], fov: 45 }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <pointLight position={[-10, -5, -10]} intensity={0.5} color="#38bdf8" />
              <ArchitecturalStructure />
              <OrbitControls
                enableZoom={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 2.1}
                minPolarAngle={Math.PI / 6}
              />
            </Canvas>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-mono-draft text-sky-400">
              Initializing Architectural 3D Engine...
            </div>
          )}

          {/* Bottom HUD Callouts */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono-draft text-neutral-400 pointer-events-none">
            <div className="flex items-center gap-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-white/10">
              <span className="text-orange-400">● LOAD BEAM: W12x26 A992 STEEL</span>
              <span className="text-sky-400">● DEFLECTION TOLERANCE: &lt; L/480</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-neutral-400">
              <Maximize2 className="w-3 h-3 text-sky-400" />
              <span>Click &amp; drag mouse to orbit 360°</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
