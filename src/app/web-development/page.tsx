// app/web-development/page.tsx

"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Code, Monitor, Smartphone, Server, Database, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export const LoadingScreen = ({ title = "Web Development" }: { title?: string }) => (
  <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="animate-pulse">
        <Code size={64} className="text-green-400 mx-auto" />
      </div>
      <div className="h-1 bg-green-400 rounded-full animate-progress" />
      <p className="text-gray-400 mt-4 animate-pulse">Loading {title}...</p>
    </div>
  </div>
);

const CodeParticle = ({ position, char }: { position: THREE.Vector3; char: string }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const initialY = position.y;
  const speed = 0.02 + Math.random() * 0.03;
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(clock.elapsedTime * speed) * 2;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      color="#4ade80"
      fontSize={0.4}
      anchorX="center"
      anchorY="middle"
    >
      {char}
    </Text>
  );
};

const CodeBackground = () => {
  const chars = useMemo(() => ['<', '/', '>', '{', '}', '(', ')', '*', '#', '@', '$', '%'], []);
  const particles = useMemo(() => 
    Array.from({ length: 150 }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ),
      char: chars[Math.floor(Math.random() * chars.length)]
    }))
  , [chars]);

  return (
    <>
      {particles.map((particle, i) => (
        <CodeParticle key={i} position={particle.position} char={particle.char} />
      ))}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const projects = [
  {
    title: "E-commerce Platform",
    description: "Scalable online shopping solution with real-time analytics",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "SAAS Dashboard",
    description: "Data visualization platform for enterprise analytics",
    tech: ["Next.js", "TypeScript", "AWS"],
  },
  {
    title: "Social Network",
    description: "Community platform with live chat features",
    tech: ["React Native", "GraphQL", "PostgreSQL"],
  },
];

const techStack = [
  { name: "React", icon: <Code className="w-12 h-12" /> },
  { name: "Next.js", icon: <Monitor className="w-12 h-12" /> },
  { name: "Node.js", icon: <Server className="w-12 h-12" /> },
  { name: "TypeScript", icon: <Smartphone className="w-12 h-12" /> },
  { name: "PostgreSQL", icon: <Database className="w-12 h-12" /> },
  { name: "Git", icon: <GitBranch className="w-12 h-12" /> },
];

export default function WebDevelopment() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />

      {/* Hero Section with 3D Background */}
      <section className="relative h-screen overflow-hidden">
        {/* Full-screen 3D Canvas */}
        <div className="absolute inset-0 h-full w-full z-0">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <CodeBackground />
          </Canvas>
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Web Excellence
            </h1>
            <p className="text-xl md:text-2xl text-white mt-6 max-w-2xl mx-auto">
              Crafting digital experiences that combine innovation with functionality
            </p>
          </motion.div>

          {/* Code Block Section */}
          <motion.div
            className="mt-16 mx-auto w-full max-w-4xl relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <pre className="px-8 py-6 text-left pt-12"> {/* Added pt-12 for top padding */}
              <code className="text-green-400">$ npm create-next-app@latest</code>
              <code className="text-gray-400 block mt-4">{`// Digital transformation starts here`}</code>
              <code className="text-cyan-400 block mt-4">{`<WebProvider>`}</code>
              <code className="text-cyan-400 pl-4">{`<Innovation />`}</code>
              <code className="text-cyan-400 pl-4">{`<Quality assurance="strict" />`}</code>
              <code className="text-cyan-400">{`</WebProvider>`}</code>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Our <span className="text-green-400">Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-green-400/30 transition-all"
                whileHover={{ y: -10 }}
              >
                <div className="mb-4 text-green-400">
                  <Code className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-green-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative py-20 px-4 sm:px-6 bg-black">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Our <span className="text-green-400">Stack</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-green-400/30 transition-all"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-green-400 mb-4">{tech.icon}</div>
                <h3 className="text-xl font-bold text-white">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}