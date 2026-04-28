'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MarsScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030508, 1);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    Object.assign(renderer.domElement.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '0',
      pointerEvents: 'none',
    });
    mount.appendChild(renderer.domElement);

    // --- Scene ---
    const scene = new THREE.Scene();

    // --- Camera ---
    const aspect = mount.clientWidth / mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 100);
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, -1.5, -2);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x1a0a05, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffddaa, 0.9);
    dirLight.position.set(8, 6, 4);
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0xe8651a, 0x2a1008, 0.3);
    scene.add(hemiLight);

    // --- Mars Surface (primary plane) ---
    const surfaceGeometry = new THREE.PlaneGeometry(24, 24, 50, 50);
    const positions = surfaceGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const displacement =
        Math.sin(x * 1.3) * Math.cos(z * 0.9) * 0.3 +
        Math.sin(x * 3.1 + 1) * 0.12 +
        (Math.random() - 0.5) * 0.08;
      positions.setY(i, displacement - 2.5);
    }
    (positions as THREE.BufferAttribute).needsUpdate = true;
    surfaceGeometry.computeVertexNormals();

    const surfaceMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b3a0f,
      shininess: 5,
    });
    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    surface.rotation.x = -Math.PI / 2;
    surface.position.y = -2.5;
    scene.add(surface);

    // --- Mars Surface (far background plane) ---
    const bgSurfaceGeometry = new THREE.PlaneGeometry(14, 8, 10, 10);
    const bgSurfaceMaterial = new THREE.MeshPhongMaterial({
      color: 0x6b2a08,
      shininess: 2,
    });
    const bgSurface = new THREE.Mesh(bgSurfaceGeometry, bgSurfaceMaterial);
    bgSurface.rotation.x = -Math.PI / 2;
    bgSurface.position.set(0, -2.8, -14);
    scene.add(bgSurface);

    // --- Mars Atmosphere Horizon Band ---
    const atmoGeometry = new THREE.PlaneGeometry(24, 2);
    const atmoMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8651a,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const atmo = new THREE.Mesh(atmoGeometry, atmoMaterial);
    atmo.position.set(0, -1.5, -8);
    atmo.rotation.x = -0.08;
    scene.add(atmo);

    // --- Rover ---
    const rover = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.4, 0.2, 0.3);
    const bodyMat = new THREE.MeshPhongMaterial({
      color: 0xc0a882,
      emissive: 0x1a0f05,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    rover.add(body);

    // Solar panel
    const panelGeo = new THREE.BoxGeometry(0.7, 0.02, 0.22);
    const panelMat = new THREE.MeshPhongMaterial({
      color: 0x1a3a6a,
      emissive: 0x0a1a3a,
    });
    const panel = new THREE.Mesh(panelGeo, panelMat);
    panel.position.y = 0.14;
    rover.add(panel);

    // Camera mast
    const mastGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 6);
    const mastMat = new THREE.MeshPhongMaterial({ color: 0xb0a080 });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.set(0.15, 0.22, 0);
    rover.add(mast);

    // Mast head
    const mastHeadGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const mastHeadMat = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const mastHead = new THREE.Mesh(mastHeadGeo, mastHeadMat);
    mastHead.position.set(0.15, 0.22 + 0.125 + 0.035, 0);
    rover.add(mastHead);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.06, 12);
    const wheelMat = new THREE.MeshPhongMaterial({ color: 0x2a2a2a });

    const wheelPositions = [
      { x: -0.22, y: -0.12, z: 0.18 },  // FL
      { x:  0.22, y: -0.12, z: 0.18 },  // FR
      { x: -0.22, y: -0.12, z: 0    },  // ML
      { x:  0.22, y: -0.12, z: 0    },  // MR
      { x: -0.22, y: -0.12, z: -0.18 }, // BL
      { x:  0.22, y: -0.12, z: -0.18 }, // BR
    ];

    const wheelMeshes: THREE.Mesh[] = [];
    for (const wp of wheelPositions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(wp.x, wp.y, wp.z);
      wheel.rotation.z = Math.PI / 2;
      rover.add(wheel);
      wheelMeshes.push(wheel);
    }

    rover.position.set(-8, -2.1, 0);
    scene.add(rover);

    // --- Dust Particles ---
    const dustCount = 200;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3]     = (Math.random() - 0.5) * 24; // x: -12 to 12
      dustPositions[i * 3 + 1] = -2 + Math.random() * 1;     // y: -2 to -1
      dustPositions[i * 3 + 2] = -4 + Math.random() * 4;     // z: -4 to 0
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xe8651a,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // --- Resize handler ---
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Animation ---
    let rafId: number;
    let wheelRotation = 0;
    let paused = false;

    const animate = () => {
      if (paused) return;
      rafId = requestAnimationFrame(animate);

      // Rover movement
      rover.position.x += 0.004;
      if (rover.position.x > 9) rover.position.x = -9;

      // Wheel rotation
      wheelRotation += 0.05;
      for (const wheel of wheelMeshes) {
        wheel.rotation.x += 0.05;
      }

      // Dust animation
      const dp = dustGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < dustCount; i++) {
        let x = dp.getX(i);
        let y = dp.getY(i);
        x += 0.015;
        if (x > 12) x = -12;
        // slight oscillation
        y += Math.sin(Date.now() * 0.001 + i) * 0.0005;
        dp.setX(i, x);
        dp.setY(i, y);
      }
      dp.needsUpdate = true;

      renderer.render(scene, camera);
    };

    // --- Visibility pause ---
    const handleVisibility = () => {
      paused = document.hidden;
      if (!paused) animate();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });

      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'relative', height: '320px', overflow: 'hidden' }}
    >
      {/* Canvas is injected by Three.js */}
      {/* Label overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 10,
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: '#FFD97D',
          opacity: 0.7,
          padding: '12px 16px',
          pointerEvents: 'none',
        }}
      >
        Perseverance · Sol 1,147 · Jezero Crater
      </div>
    </div>
  );
}
