import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

// Loading component
const ModelLoader = () => (
  <Html center>
    <div className="flex flex-col items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
      <p className="text-sm text-gray-600">Loading 3D Model...</p>
    </div>
  </Html>
);

// Error fallback component
const ModelError = ({ error }) => (
  <Html center>
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-red-500 mb-2">⚠️</div>
      <p className="text-sm text-gray-600 text-center">
        Failed to load 3D model
        <br />
        <span className="text-xs text-gray-400">{error}</span>
      </p>
    </div>
  </Html>
);

// 3D Model component
const Model3D = ({ 
  url, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  autoRotate = false,
  selectedColor = '#FFFFFF' 
}) => {
  const meshRef = useRef();
  const [error, setError] = useState(null);
  const [gltf, setGltf] = useState(null);

  // Load the model
  useEffect(() => {
    if (url) {
      const loader = new GLTFLoader();
      loader.load(
        url,
        (loadedGltf) => {
          setGltf(loadedGltf);
          setError(null);
        },
        (progress) => {
          console.log('Loading progress:', progress);
        },
        (err) => {
          console.error('Error loading model:', err);
          setError(err.message || 'Failed to load model');
        }
      );
    }
  }, [url]);

  // Auto rotate animation
  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Update material color when selectedColor changes
  useEffect(() => {
    if (gltf && selectedColor) {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (child.material.map) {
            // If there's a texture, modulate it with the color
            child.material.color.setHex(selectedColor.replace('#', '0x'));
          } else {
            // If no texture, set the color directly
            child.material.color.setHex(selectedColor.replace('#', '0x'));
          }
        }
      });
    }
  }, [gltf, selectedColor]);

  if (error) {
    return <ModelError error={error} />;
  }

  if (!gltf) {
    return <ModelLoader />;
  }

  return (
    <primitive
      ref={meshRef}
      object={gltf.scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
};

// Main 3D Viewer component
const Model3DViewer = ({ 
  product, 
  selectedColor = '#FFFFFF',
  className = 'w-full h-96',
  autoRotate = true,
  showControls = true,
  environment = 'city' 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasModel, setHasModel] = useState(false);

  useEffect(() => {
    if (product?.model3D?.url) {
      setHasModel(true);
      setIsLoading(false);
    } else {
      setHasModel(false);
      setIsLoading(false);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-sm text-gray-600">Initializing 3D Viewer...</p>
        </div>
      </div>
    );
  }

  if (!hasModel) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="flex flex-col items-center text-center p-4">
          <div className="text-4xl mb-2">👕</div>
          <p className="text-sm text-gray-600">3D Model Not Available</p>
          <p className="text-xs text-gray-400 mt-1">
            Showing product image instead
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-gray-50 rounded-lg overflow-hidden relative`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        {/* Environment */}
        <Suspense fallback={null}>
          <Environment preset={environment} background={false} />
        </Suspense>
        
        {/* 3D Model */}
        <Suspense fallback={<ModelLoader />}>
          <Model3D
            url={product.model3D.url}
            scale={product.model3D.scale || 1}
            position={[
              product.model3D.position?.x || 0,
              product.model3D.position?.y || 0,
              product.model3D.position?.z || 0
            ]}
            rotation={[
              product.model3D.rotation?.x || 0,
              product.model3D.rotation?.y || 0,
              product.model3D.rotation?.z || 0
            ]}
            autoRotate={autoRotate}
            selectedColor={selectedColor}
          />
        </Suspense>
        
        {/* Controls */}
        {showControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
          />
        )}
      </Canvas>
      
      {/* Control Panel */}
      {showControls && (
        <div className="absolute bottom-2 left-2 flex flex-col space-y-1">
          <div className="bg-white bg-opacity-80 rounded px-2 py-1 text-xs text-gray-600">
            <p>🖱️ Drag to rotate</p>
            <p>🔍 Scroll to zoom</p>
          </div>
        </div>
      )}
      
      {/* Model Info */}
      {product.model3D && (
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded px-2 py-1 text-xs text-gray-600">
          <p>{product.model3D.format?.toUpperCase() || 'GLB'} Model</p>
          {product.model3D.animations?.length > 0 && (
            <p>🎬 {product.model3D.animations.length} animations</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Model3DViewer;
