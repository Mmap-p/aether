'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AsteroidData {
  mesh: THREE.Mesh;
  angle: number;
  speed: number;
  orbitRadius: number;
  inclination: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
}

export default function SpaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const issTrailRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    const getAspect = () => canvas.clientWidth / canvas.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, getAspect(), 0.1, 1000);
    camera.position.set(0, 0.5, 8);

    // Mouse parallax state
    const mouse = { x: 0, y: 0 };
    const targetCamPos = { x: 0, y: 0.5, z: 8 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCamPos.x = mouse.x * 0.5;
      targetCamPos.y = mouse.y * 0.3 + 0.5;
      targetCamPos.z = 8;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Lighting ──────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0a0a2e, 0.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff8e7, 1.2);
    dirLight.position.set(10, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x7fecdc, 0.5);
    pointLight.position.set(-5, 3, 2);
    scene.add(pointLight);

    // ── Earth ─────────────────────────────────────────────────────────────────
    const earthGeo = new THREE.SphereGeometry(2.5, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x1a6b9a,
      emissive: 0x0a2a3a,
      specular: 0x4fc3f7,
      shininess: 80,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.position.set(2, 0, 0);
    scene.add(earth);

    // ── Continent Overlay ─────────────────────────────────────────────────────
    const continentGeo = new THREE.SphereGeometry(2.52, 64, 64);
    const continentMat = new THREE.MeshPhongMaterial({
      color: 0x2d5a1b,
      transparent: true,
      opacity: 0.35,
      wireframe: false,
    });
    const continents = new THREE.Mesh(continentGeo, continentMat);
    continents.position.set(2, 0, 0);
    scene.add(continents);

    // ── Atmosphere Glow ───────────────────────────────────────────────────────
    const atmosphereGeo = new THREE.SphereGeometry(2.72, 64, 64);
    const atmosphereMat = new THREE.MeshPhongMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    atmosphere.position.set(2, 0, 0);
    scene.add(atmosphere);

    // ── Clouds ────────────────────────────────────────────────────────────────
    const cloudGeo = new THREE.SphereGeometry(2.57, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    clouds.position.set(2, 0, 0);
    scene.add(clouds);

    // ── Moon ─────────────────────────────────────────────────────────────────
    const moonGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const moonMat = new THREE.MeshPhongMaterial({
      color: 0x9e9e9e,
      emissive: 0x1a1a1a,
    });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moon);
    const moonAngleRef = { value: 0 };

    // ── ISS ───────────────────────────────────────────────────────────────────
    const issGroup = new THREE.Group();

    // Main truss
    const trussGeo = new THREE.BoxGeometry(1.2, 0.05, 0.05);
    const trussMat = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 });
    const truss = new THREE.Mesh(trussGeo, trussMat);
    issGroup.add(truss);

    // Solar panels (4)
    const panelOffsets = [-0.65, -0.35, 0.35, 0.65];
    const panelGeo = new THREE.BoxGeometry(0.55, 0.02, 0.22);
    const panelMat = new THREE.MeshPhongMaterial({ color: 0x1a3a8a });
    for (const xOff of panelOffsets) {
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set(xOff, 0.02, 0);
      issGroup.add(panel);
    }

    // Habitat module
    const habitatGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.25, 12);
    const habitatMat = new THREE.MeshPhongMaterial({ color: 0xd0d0d0 });
    const habitat = new THREE.Mesh(habitatGeo, habitatMat);
    habitat.position.set(0, 0, 0);
    issGroup.add(habitat);

    scene.add(issGroup);

    const issAngleRef = { value: 1.5 };

    // ISS trail
    const issTrailPositions: THREE.Vector3[] = [];

    // ── Saturn ────────────────────────────────────────────────────────────────
    const saturnGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const saturnMat = new THREE.MeshPhongMaterial({
      color: 0xc8a96e,
      emissive: 0x2a1f0a,
    });
    const saturn = new THREE.Mesh(saturnGeo, saturnMat);
    saturn.position.set(-3, -4, -2);
    scene.add(saturn);

    const ringGeo = new THREE.TorusGeometry(3.2, 0.5, 2, 100);
    const ringMat = new THREE.MeshPhongMaterial({
      color: 0xb8935a,
      transparent: true,
      opacity: 0.65,
    });
    const rings = new THREE.Mesh(ringGeo, ringMat);
    rings.rotation.x = Math.PI / 3;
    rings.position.set(-3, -4, -2);
    scene.add(rings);

    // ── Asteroid Belt ─────────────────────────────────────────────────────────
    const asteroids: AsteroidData[] = [];
    for (let i = 0; i < 80; i++) {
      const size = Math.random() * (0.08 - 0.02) + 0.02;
      const astGeo = new THREE.IcosahedronGeometry(size, 0);
      const astMat = new THREE.MeshPhongMaterial({
        color: 0x5a4a3a,
        emissive: 0x1a1210,
      });
      const astMesh = new THREE.Mesh(astGeo, astMat);
      const angle = Math.random() * Math.PI * 2;
      const orbitRadius = Math.random() * (14 - 6) + 6;
      const inclination = (Math.random() - 0.5) * 1.04; // -0.52 to 0.52
      astMesh.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(inclination) * orbitRadius * 0.3,
        Math.sin(angle) * orbitRadius,
      );
      scene.add(astMesh);
      asteroids.push({
        mesh: astMesh,
        angle,
        speed: Math.random() * (0.002 - 0.0003) + 0.0003,
        orbitRadius,
        inclination,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
      });
    }

    // ── Galaxy Smear ──────────────────────────────────────────────────────────
    const galaxyGroup = new THREE.Group();
    const galaxyPositions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      galaxyPositions[i * 3] = (Math.random() - 0.5) * 60; // -30 to 30
      galaxyPositions[i * 3 + 1] = (Math.random() - 0.5) * 16; // -8 to 8
      galaxyPositions[i * 3 + 2] = Math.random() * (-5 - -20) + -20; // -20 to -5
    }
    const galaxyGeo = new THREE.BufferGeometry();
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
    const galaxyMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.03,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
    galaxyGroup.add(galaxyPoints);
    scene.add(galaxyGroup);

    // ── Resize Observer ───────────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(canvas);

    // Initial size
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    // ── Visibility pause ──────────────────────────────────────────────────────
    let paused = false;
    const onVisibilityChange = () => {
      paused = document.visibilityState !== 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ── Animation Loop ────────────────────────────────────────────────────────
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (paused) return;

      // Earth + continents rotation
      earth.rotation.y += 0.001;
      continents.rotation.y += 0.001;
      clouds.rotation.y += 0.0013;

      // Moon orbit
      moonAngleRef.value += 0.003;
      moon.position.set(
        2 + Math.cos(moonAngleRef.value) * 5,
        Math.sin(moonAngleRef.value) * 1.5,
        Math.sin(moonAngleRef.value) * 3,
      );

      // ISS orbit
      issAngleRef.value += 0.013;
      const ia = issAngleRef.value;
      issGroup.position.set(
        2 + Math.cos(ia) * 3.8,
        Math.sin(ia * 0.3) * 0.8,
        Math.sin(ia) * 3.8,
      );

      // ISS lookAt next position
      const nextAngle = ia + 0.013;
      const nextPos = new THREE.Vector3(
        2 + Math.cos(nextAngle) * 3.8,
        Math.sin(nextAngle * 0.3) * 0.8,
        Math.sin(nextAngle) * 3.8,
      );
      issGroup.lookAt(nextPos);

      // ISS trail
      issTrailPositions.push(issGroup.position.clone());
      if (issTrailPositions.length > 10) {
        issTrailPositions.shift();
      }
      // Remove old trail points object
      if (issTrailRef.current) {
        scene.remove(issTrailRef.current);
        issTrailRef.current.geometry.dispose();
        issTrailRef.current = null;
      }
      if (issTrailPositions.length > 0) {
        const trailArr = new Float32Array(issTrailPositions.length * 3);
        issTrailPositions.forEach((pos, idx) => {
          trailArr[idx * 3] = pos.x;
          trailArr[idx * 3 + 1] = pos.y;
          trailArr[idx * 3 + 2] = pos.z;
        });
        const trailGeo = new THREE.BufferGeometry();
        trailGeo.setAttribute('position', new THREE.BufferAttribute(trailArr, 3));
        const trailMat = new THREE.PointsMaterial({
          color: 0x7fecdc,
          size: 0.04,
          transparent: true,
          opacity: 0.6,
        });
        const trailPoints = new THREE.Points(trailGeo, trailMat);
        issTrailRef.current = trailPoints;
        scene.add(trailPoints);
      }

      // Saturn rotation
      saturn.rotation.y += 0.0008;

      // Asteroids
      for (const ast of asteroids) {
        ast.angle += ast.speed;
        ast.mesh.position.set(
          Math.cos(ast.angle) * ast.orbitRadius,
          Math.sin(ast.inclination) * ast.orbitRadius * 0.3,
          Math.sin(ast.angle) * ast.orbitRadius,
        );
        ast.mesh.rotation.x += ast.rotSpeedX;
        ast.mesh.rotation.y += ast.rotSpeedY;
        ast.mesh.rotation.z += ast.rotSpeedZ;
      }

      // Galaxy rotation
      galaxyGroup.rotation.y += 0.0001;

      // Camera parallax
      camera.position.x = lerp(camera.position.x, targetCamPos.x, 0.02);
      camera.position.y = lerp(camera.position.y, targetCamPos.y, 0.02);
      camera.lookAt(2, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserver.disconnect();

      // Dispose geometries and materials
      [
        earthGeo, earthMat,
        continentGeo, continentMat,
        atmosphereGeo, atmosphereMat,
        cloudGeo, cloudMat,
        moonGeo, moonMat,
        trussGeo, trussMat,
        panelGeo, panelMat,
        habitatGeo, habitatMat,
        saturnGeo, saturnMat,
        ringGeo, ringMat,
        galaxyGeo, galaxyMat,
      ].forEach((obj) => {
        if ('dispose' in obj) (obj as THREE.BufferGeometry | THREE.Material).dispose();
      });

      for (const ast of asteroids) {
        ast.mesh.geometry.dispose();
        (ast.mesh.material as THREE.Material).dispose();
      }

      if (issTrailRef.current) {
        issTrailRef.current.geometry.dispose();
        (issTrailRef.current.material as THREE.Material).dispose();
      }

      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '60%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
