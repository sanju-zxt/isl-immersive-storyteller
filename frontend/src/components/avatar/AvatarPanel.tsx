import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, SoftShadows, useGLTF, useAnimations } from '@react-three/drei';

function AvatarModel() {
  const { scene, animations } = useGLTF('/avatars/sign_avatar.gltf');
  const { actions, mixer } = useAnimations(animations, scene);
  const [loaded] = useState(true);

  useEffect(() => {
    if (animations && animations.length > 0 && actions) {
      const clip = animations[0];
      if (actions[clip.name]) {
        actions[clip.name].reset().play();
      }
    }
  }, [animations, actions]);

  return <primitive object={scene} />;
}

export function AvatarPanel() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 via-blue-950/90 to-teal-950/80 rounded-2xl shadow-2xl shadow-blue-900/20 border border-white/5 overflow-hidden ring-1 ring-white/10 relative" aria-label="3D Sign Avatar" role="region">
      <div className="absolute top-4 left-4 z-10 bg-black/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-white/90 border border-white/10">Passed</div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 px-2">
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg shadow-black/20" aria-label="Play">▶</button>
          <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg shadow-black/20" aria-label="Loop">↻</button>
        </div>
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10 shadow-lg shadow-black/20">
          <span className="text-[10px] font-bold text-white/80">Speed</span>
          <select className="bg-transparent text-[10px] font-bold text-white border-none outline-none cursor-pointer" aria-label="Animation speed"><option>1x</option><option>1.5x</option><option>2x</option></select>
        </div>
      </div>
      <Canvas shadows camera={{ position: [2, 2, 3], fov: 45 }} className="w-full h-full">
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 7]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <pointLight position={[-5, 5, -5]} intensity={0.3} color="#bae6fd" />
        <SoftShadows />
        <Environment preset="studio" />
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.1} enablePan={false} />
        <Suspense fallback={<mesh position={[0, 1, 0]} castShadow receiveShadow><capsuleGeometry args={[0.4, 1.2, 4, 8]} /><meshStandardMaterial color="#0ea5e9" roughness={0.3} metalness={0.2} /></mesh>}>
          <AvatarModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
