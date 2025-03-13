"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Menu, X, Gamepad, Film, Code, Smartphone, Search, BarChart, Monitor } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

// Dynamic imports for Lucide icons
const DynamicMenu = dynamic(() => import("lucide-react").then((mod) => mod.Menu), { ssr: false });
const DynamicX = dynamic(() => import("lucide-react").then((mod) => mod.X), { ssr: false });

type GLTFResult = GLTF & {
  scene: THREE.Group;
};

const vertexShader = `
  uniform float explosion;
  void main() {
    vec3 newPosition = position + normal * explosion;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

function ExplodingModel({ url, color = "#5B8FB9" }: { url: string; color?: string }) {
  const { scene } = useGLTF(url) as GLTFResult;

  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.ShaderMaterial({
          uniforms: {
            explosion: { value: 0 },
            uColor: { value: new THREE.Color(color) },
          },
          vertexShader,
          fragmentShader: `
            uniform vec3 uColor;
            void main() {
              gl_FragColor = vec4(uColor, 1.0);
            }
          `,
        });
      }
    });
  }, [scene, color]);

  useFrame((_, delta) => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const material = (child as THREE.Mesh).material as THREE.ShaderMaterial;
        if (material.uniforms.explosion) {
          material.uniforms.explosion.value = Math.min(
            material.uniforms.explosion.value + delta * 0.5,
            1.0
          );
        }
      }
    });
  });

  return <primitive object={scene} scale={[2, 2, 2]} />;
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-pulse">
          <Gamepad size={64} className="text-green-400 mx-auto" />
        </div>
        <div className="h-1 bg-green-400 rounded-full animate-progress" />
        <p className="text-gray-400 mt-4 animate-pulse">Loading Game World...</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { 
      title: "Web Development",
      icon: <Code className="w-8 h-8" />,
      desc: "Custom websites that scale with your business needs",
      link: "/web-development",
      onClick: () => setLoading(true)
    },
    {
      title: "App Development",
      icon: <Smartphone className="w-8 h-8" />,
      desc: "Native & cross-platform mobile solutions",
      link: "/app-development"
    },
    {
      title: "SEO Optimization",
      icon: <Search className="w-8 h-8" />,
      desc: "Boost your search rankings & organic traffic",
      link: "/seo"
    },
    {
      title: "Digital Marketing",
      icon: <BarChart className="w-8 h-8" />,
      desc: "Data-driven marketing strategies that convert",
      link: "/digital-marketing"
    },
    {
      title: "Game Design",
      icon: <Gamepad className="w-8 h-8" />,
      desc: "Immersive gaming experiences across platforms",
      link: "/game-design",
      onClick: () => setLoading(true)
    },
    {
      title: "3D Animation",
      icon: <Film className="w-8 h-8" />,
      desc: "Captivating motion graphics & character animation",
      link: "/3d-animation"
    },
    {
      title: "VFX Production",
      icon: <Monitor className="w-8 h-8" />,
      desc: "Cinematic visual effects for film & media",
      link: "/vfx-production"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header Section */}
      <header className={`fixed w-full top-0 z-50 font-[Montserrat] transition-all ${scrollY > 0 ? 'backdrop-blur-md bg-black/50' : ''}`}>
        <div className="container mx-auto flex justify-between items-center p-4 sm:p-6">
          <Link href="/" className="text-2xl font-bold text-white z-50 sm:ml-[200px]">
            <span className="text-green-400">Afioniq</span>
          </Link>
          
          <button
            className="sm:hidden p-2 rounded-md focus:outline-none z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
          
          <nav className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-col sm:flex-row items-center gap-6 absolute sm:relative top-full left-0 w-full sm:w-auto bg-black/95 sm:bg-transparent p-4 sm:p-0`}>
            <Link href="/about" className="text-white hover:text-green-400 transition-colors">
              About
            </Link>
            <Link href="/services" className="text-white hover:text-green-400 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-full transition-colors sm:mr-[200px]">
              <span>Contact Us</span>
              <ArrowRight size={18} />
            </Link>
          </nav>
        </div>
      </header>
      
      {loading && <LoadingScreen />}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10">
          <Canvas
            camera={{ position: [0, 0, 5] }}
            gl={{
              alpha: true,
              antialias: true,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(new THREE.Color(0x000000), 0)
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <ExplodingModel url="/Sphere.glb" color="rgba(114, 114, 114, 0.67)" />
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </div>
        
        <div className="relative z-20 text-center space-y-8 px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 animate-pulse">
            Innovate, Create, Elevate
          </h1>
          
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto leading-relaxed">
            Transforming your digital landscape with cutting-edge technology and innovative design.
          </p>

          {/* Animated Grid Background */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="container mx-auto relative z-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Our <span className="text-green-400">Services</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Link 
                key={index}
                href={service.link}
                className="group w-full sm:w-[45%] lg:w-[30%] p-4 transition-all duration-300"
                onClick={service.onClick}
              >
                <div className="relative bg-gray-900 rounded-2xl p-6 h-full border border-gray-800 hover:border-green-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/10">
                  <div className="mb-4 text-green-400 group-hover:text-cyan-400 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute inset-0 bg-[radial-gradient(400px_at_50%_50%,rgba(75,175,100,0.15)_0%,transparent_100%)]"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Background Effects */}
          <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-green-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/3"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-cyan-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>
    </div>
  );
}