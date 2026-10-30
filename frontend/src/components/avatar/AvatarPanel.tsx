import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, SoftShadows } from '@react-three/drei';
import { useAnimationController } from '@/lib/avatar/AnimationController';

function SignAvatarMesh() {
  const { isLoaded, controller } = useAnimationController('/avatars/sign_avatar.gltf');

  useEffect(() => {
    if (isLoaded && controller) {
      const clips = controller.getClipNames();
      if (clips.length > 0) controller.play(clips[0]);
    }
  }, [isLoaded, controller]);

  if (!isLoaded) {
    return (
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.4, 1.2, 4, 8]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.3} metalness={0.2} />
      </mesh>
    );
  }

  return null;
}

export function AvatarPanel() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-xl overflow-hidden" aria-label="3D Avatar panel" role="region">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <h2 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">3D Avatar</h2>
        <span className="text-xs text-neutral-500">Live Translation</span>
      </div>
      <div className="flex-1 relative">
        <Canvas shadows camera={{ position: [2, 2, 3], fov: 45 }} aria-label="3D sign language avatar">
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 7]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <pointLight position={[-5, 5, -5]} intensity={0.3} color="#bae6fd" />
          <SoftShadows />
          <Environment preset="studio" />
          <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.1} enablePan={false} />
          <Suspense fallback={<mesh position={[0, 1, 0]} castShadow receiveShadow><capsuleGeometry args={[0.4, 1.2, 4, 8]} /><meshStandardMaterial color="#0ea5e9" roughness={0.3} metalness={0.2} /></mesh>}>
            <SignAvatarMesh />
          </Suspense>
        </Canvas>
        <div aria-hidden="true" className="absolute bottom-2 right-2 bg-neutral-900/60 text-white/90 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">60 FPS</div>
      </div>
    </div>
  );
}
