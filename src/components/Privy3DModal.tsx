"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { X, Compass, Layers, Eye } from "lucide-react";

function LuxuryBIMStructure({ wireframeOnly }: { wireframeOnly: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Monolithic Plinth / Base */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[4.8, 0.3, 4.8]} />
        <meshStandardMaterial
          color="#222020"
          roughness={0.7}
          wireframe={wireframeOnly}
        />
      </mesh>

      {/* Main Double-Height Cantilever Volume */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[3.8, 2.4, 3.8]} />
        <meshStandardMaterial
          color="#E5D8CA"
          wireframe={wireframeOnly}
          transparent
          opacity={wireframeOnly ? 0.8 : 0.25}
          roughness={0.2}
        />
      </mesh>

      {/* Structural Bronze Ridge / Fascia Line */}
      <mesh position={[0, 2.45, 0]}>
        <boxGeometry args={[4.2, 0.1, 4.2]} />
        <meshStandardMaterial color="#8C7A65" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Cantilevered Overhang Wing */}
      <mesh position={[1.4, 1.2, 0]}>
        <boxGeometry args={[2.0, 1.8, 3.2]} />
        <meshStandardMaterial
          color="#3A3837"
          wireframe={wireframeOnly}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Floor Plates */}
      <mesh position={[0, 1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 3.6]} />
        <meshStandardMaterial color="#4A4744" side={THREE.DoubleSide} />
      </mesh>

      {/* Load-Bearing Bronze Columns */}
      {[
        [-1.8, 1.1, -1.8],
        [1.8, 1.1, -1.8],
        [-1.8, 1.1, 1.8],
        [1.8, 1.1, 1.8],
        [2.3, 1.1, -1.5],
        [2.3, 1.1, 1.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.04, 0.04, 2.4, 12]} />
          <meshStandardMaterial color="#E5D8CA" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Luxury Architectural Grid */}
      <gridHelper args={[10, 20, "#E5D8CA", "#3C3A38"]} position={[0, -0.3, 0]} />
    </group>
  );
}

interface Privy3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Privy3DModal({ isOpen, onClose }: Privy3DModalProps) {
  const [wireframe, setWireframe] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1919]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 animate-fadeIn text-white">
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-20">
        <div className="flex items-center gap-3">
          <Compass className="w-4 h-4 text-[#E5D8CA] animate-spin-slow" />
          <span className="text-xs font-mono tracking-[0.25em] text-[#E5D8CA] uppercase">
            3D BIM AXONOMETRIC EXPLORER
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-widest text-[#8E8B85] font-mono border-l border-white/10 pl-3">
            LAT 25.1972° N · LONG 55.2744° E
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setWireframe(!wireframe)}
            className="flex items-center gap-2 text-[11px] tracking-widest text-[#8E8B85] hover:text-white uppercase px-3 py-1.5 border border-white/10 hover:border-white/30 transition-all font-mono"
          >
            <Eye className="w-3 h-3 text-[#E5D8CA]" />
            <span>{wireframe ? "Shaded Mode" : "Wireframe Mode"}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 border border-white/10 hover:border-[#E5D8CA] hover:text-[#E5D8CA] transition-colors"
            aria-label="Close 3D Viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative w-full flex-grow my-4 overflow-hidden cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [5.5, 4.5, 5.5], fov: 42 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 15, 10]} intensity={1.5} color="#FFFFFF" />
          <directionalLight position={[-10, 5, -10]} intensity={0.6} color="#E5D8CA" />
          <LuxuryBIMStructure wireframeOnly={wireframe} />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            maxPolarAngle={Math.PI / 2.05}
            minDistance={4}
            maxDistance={12}
          />
        </Canvas>

        {/* Holographic HUD Overlays */}
        <div className="absolute bottom-6 left-6 font-mono text-[10px] space-y-1 text-[#8E8B85] pointer-events-none">
          <p className="text-[#E5D8CA]">PROTOTYPE RESIDENCE: THE BEL-AIR MONOLITH</p>
          <p>STRUCTURAL CORE: POST-TENSIONED C60 SILICA CONCRETE</p>
          <p>LOAD CAPACITY: 1,450 KN/M²</p>
          <p>SEISMIC RESISTANCE: ZONE 4 RATING</p>
        </div>

        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[#8E8B85] pointer-events-none text-right">
          <p>DRAG TO ORBIT · SCROLL TO ZOOM</p>
          <p className="text-[#E5D8CA]">STATUS: PERMITTED FOR EXECUTION</p>
        </div>
      </div>

      {/* Bottom Coordinates & Spec Footer */}
      <div className="flex justify-between items-center border-t border-white/10 pt-4 text-[10px] tracking-[0.3em] text-[#8E8B85] uppercase font-mono z-20">
        <span>© 2026 ATELIER PRIVÉ BIM</span>
        <span>CONFIDENTIAL ARCHITECTURAL DOSSIER</span>
      </div>
    </div>
  );
}
