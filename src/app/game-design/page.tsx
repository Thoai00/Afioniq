"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, useReducedMotion } from "framer-motion";
import { Gamepad, ArrowRight } from "lucide-react";

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const [particleCount] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 2000 : 5000);

  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
    
    colors[i] = Math.random();
    colors[i + 1] = Math.random();
    colors[i + 2] = Math.random();
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial 
        size={0.05}
        vertexColors
        color={0x00ff00}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function GameDesign() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen isMobile={isMobile} />;

  const animationProps = {
    initial: prefersReducedMotion ? { opacity: 0 } : {},
    animate: prefersReducedMotion ? { opacity: 1 } : {},
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
      {/* Animated Grid */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4a556812_1px,transparent_1px),linear-gradient(to_bottom,#4a556812_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-flow" />
      </div>

      {/* Responsive Header */}
      <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-lg">
        <div className="container mx-auto flex justify-between items-center p-4 md:p-6 px-4 md:px-8">
          <motion.div
            {...animationProps}
            initial={{ x: prefersReducedMotion ? 0 : -100 }}
            animate={{ x: 0 }}
            className="flex items-center gap-3"
          >
            <Link 
              href="/" 
              className="text-xl md:text-2xl font-bold text-emerald-400 tracking-wider hover:text-cyan-300 transition-colors"
            >
              AFIONIQ
            </Link>
          </motion.div>
          
          <nav className="flex items-center gap-4 md:gap-8">
            <motion.button
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              className="px-4 py-2 md:px-6 md:py-2 bg-cyan-400 rounded-lg text-black text-sm md:text-base font-bold hover:bg-cyan-300 transition-colors"
            >
              Contact Us
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Responsive Hero Section */}
      <section className="relative h-screen">
        <Canvas className="bg-gradient-to-b from-black to-gray-900">
          <ParticleField />
          <Stars radius={100} depth={50} count={isMobile ? 2000 : 5000} factor={4} saturation={0} fade />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
        </Canvas>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <motion.h1
            {...animationProps}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-400 mb-4 md:mb-8 text-center leading-tight"
          >
            <span className="neon-title">SHAPING</span><br />
            <span className="text-5xl md:text-7xl lg:text-8xl neon-title-cyan">GAMING WORLDS</span>
          </motion.h1>
          
          <motion.div
            {...animationProps}
            initial={{ scale: prefersReducedMotion ? 1 : 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 mt-8 md:mt-12"
          >
            <motion.button
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
              className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-400 to-cyan-500 rounded-xl text-black text-sm md:text-base font-bold flex items-center justify-center gap-2 md:gap-3 glow-button-lg"
            >
              <Gamepad className="w-5 h-5 md:w-6 md:h-6" />
              EXPLORE DEMOS
            </motion.button>
            
            <motion.button
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
              className="px-6 py-3 md:px-8 md:py-4 border-2 border-cyan-400 rounded-xl text-cyan-300 text-sm md:text-base font-bold flex items-center justify-center gap-2 md:gap-3 hover:bg-cyan-400/10"
            >
              WATCH TEASER
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Cyberpunk Content Section */}
      <section className="relative py-28 px-4 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-8 border border-cyan-400/30 rounded-2xl bg-gradient-to-br from-black/60 to-cyan-400/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20" />
              <h3 className="text-2xl font-bold text-cyan-300 mb-6">ENGINE CORE</h3>
              <ul className="space-y-5">
                {['Real-time Ray Tracing', 'AI-powered NPCs', 'Procedural Worlds', 'Cross-platform SDK'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-green-200">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 border border-green-400/30 rounded-2xl bg-gradient-to-br from-black/60 to-green-400/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/dots.png')] opacity-15" />
              <h3 className="text-2xl font-bold text-green-300 mb-6">TECH STACK</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Unreal 5', 'Unity', 'WebGPU', 'Houdini', 'Blender', 'FMOD'].map((tech, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white/5 rounded-lg text-center text-gray-200 hover:bg-green-400/10 transition-all cursor-pointer"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="p-8 border border-purple-400/30 rounded-2xl bg-gradient-to-br from-black/60 to-purple-400/5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
              <h3 className="text-2xl font-bold text-purple-300 mb-6">ACHIEVEMENTS</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-green-400">15M+</div>
                  <div className="text-gray-300">Active Players</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-cyan-400">23</div>
                  <div className="text-gray-300">Awards Won</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="relative py-20 px-4 bg-black/90 backdrop-blur-2xl">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-cyan-400 mb-16 text-center">
            Our Featured Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Cyber Nexus', 'Quantum Realm', 'Neon Frontier'].map((project, i) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-xl aspect-video"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-emerald-400/10" />
                <div className="h-full w-full bg-gray-800/50 backdrop-blur-sm">
                  <div className="h-full w-full bg-gray-700 animate-pulse" />
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project}
                  </h3>
                  <p className="text-gray-300 line-clamp-2">
                    {[
                      "Next-gen cyberpunk RPG with dynamic storytelling",
                      "Quantum physics-based puzzle adventure",
                      "Neon-lit racing simulator with NFT integration"
                    ][i]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8">
            {['Mobile Platformer', 'VR Experience'].map((project, i) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative h-64 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/10" />
                <div className="h-full w-full bg-gray-800/50 backdrop-blur-sm">
                  <div className="h-full w-full bg-gray-700 animate-pulse" />
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {project}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

interface LoadingScreenProps {
  isMobile: boolean;
}

function LoadingScreen({ isMobile }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <Gamepad size={72} className="text-cyan-400 mx-auto" />
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-2 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full"
        />
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-cyan-300 font-mono mt-6 tracking-wider"
        >
          INITIALIZING GAMING ENGINE...
        </motion.p>
      </div>
    </div>
  );
}