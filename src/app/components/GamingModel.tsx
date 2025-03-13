"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

export default function GamingModel() {
  const { nodes, materials } = useGLTF('/Game-Design.glb') as GLTFResult;
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (nodes.SpaceStation) nodes.SpaceStation.rotation.y = time * 0.1;
    if (nodes.Asteroids) nodes.Asteroids.rotation.x = time * 0.05;
  });

  return (
    <group position={[0, -1, 0]} dispose={null}>
      {nodes.SpaceStation && (
        <mesh
          geometry={nodes.SpaceStation.geometry}
          material={materials.Metal}
          position={[0, 0.5, 0]}
        />
      )}
      {nodes.Asteroids && (
        <mesh
          geometry={nodes.Asteroids.geometry}
          material={materials.Rock}
          position={[0, -1, 0]}
          scale={1.2}
        />
      )}
    </group>
  );
}