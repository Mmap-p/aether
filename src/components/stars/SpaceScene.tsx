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

const EARTH_TEX   = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg';
const EARTH_NRM   = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg';
const EARTH_SPEC  = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg';
const CLOUD_TEX   = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png';
const MOON_TEX    = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg';
const SATURN_TEX  = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/saturn.jpg';
const JUPITER_TEX = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/jupiter.jpg';

function buildRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const bands: Array<{ stop: number; r: number; g: number; b: number; a: number }> = [
    { stop: 0.00, r: 180, g: 140, b:  80, a: 0.0 },
    { stop: 0.05, r: 194, g: 164, b: 110, a: 0.5 },
    { stop: 0.14, r: 160, g: 120, b:  70, a: 0.75 },
    { stop: 0.22, r: 210, g: 175, b: 115, a: 0.85 },
    { stop: 0.30, r: 140, g: 105, b:  60, a: 0.6 },
    { stop: 0.38, r: 200, g: 165, b: 100, a: 0.8 },
    { stop: 0.48, r: 120, g:  90, b:  50, a: 0.4 },
    { stop: 0.56, r: 195, g: 158, b:  95, a: 0.78 },
    { stop: 0.65, r: 155, g: 118, b:  65, a: 0.65 },
    { stop: 0.76, r: 185, g: 148, b:  88, a: 0.72 },
    { stop: 0.87, r: 130, g:  98, b:  55, a: 0.45 },
    { stop: 0.94, r: 175, g: 140, b:  82, a: 0.55 },
    { stop: 1.00, r: 160, g: 130, b:  75, a: 0.0 },
  ];

  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  for (const b of bands) {
    grad.addColorStop(b.stop, `rgba(${b.r},${b.g},${b.b},${b.a})`);
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 64);

  return new THREE.CanvasTexture(canvas);
}

export default function SpaceScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const issTrailRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const getAspect = () => canvas.clientWidth / canvas.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, getAspect(), 0.1, 1000);
    camera.position.set(0, 0.5, 8);

    const mouse = { x: 0, y: 0 };
    const targetCamPos = { x: 0, y: 0.5, z: 8 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCamPos.x = mouse.x * 0.5;
      targetCamPos.y = mouse.y * 0.3 + 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Lighting ──────────────────────────────────────────────────────────────
    // Deep space ambient
    scene.add(new THREE.AmbientLight(0x050a1a, 0.4));

    // Sun — primary directional
    const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.5);
    sunLight.position.set(15, 5, 8);
    scene.add(sunLight);

    // Earth rim light — atmospheric glow on dark side
    const rimLight = new THREE.PointLight(0x1a3a6a, 1.5, 20);
    rimLight.position.set(-8, 0, -5);
    scene.add(rimLight);

    // ÆTHER teal fill
    const tealFill = new THREE.PointLight(0x7fecdc, 0.3, 30);
    tealFill.position.set(0, 8, 5);
    scene.add(tealFill);

    // ── Texture loader ────────────────────────────────────────────────────────
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    const earthTex   = loader.load(EARTH_TEX);
    const earthNrm   = loader.load(EARTH_NRM);
    const earthSpec  = loader.load(EARTH_SPEC);
    const cloudTex   = loader.load(CLOUD_TEX);
    const moonTex    = loader.load(MOON_TEX);
    const saturnTex  = loader.load(SATURN_TEX);
    const jupiterTex = loader.load(JUPITER_TEX);

    // ── Earth ─────────────────────────────────────────────────────────────────
    const earthGeo = new THREE.SphereGeometry(2.5, 64, 64);
    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTex,
      normalMap: earthNrm,
      specularMap: earthSpec,
      specular: new THREE.Color(0x4fc3f7),
      shininess: 25,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    earth.position.set(2, 0, 0);
    scene.add(earth);

    // ── Clouds ────────────────────────────────────────────────────────────────
    const cloudGeo = new THREE.SphereGeometry(2.57, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    clouds.position.set(2, 0, 0);
    scene.add(clouds);

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

    // ── Moon ─────────────────────────────────────────────────────────────────
    const moonGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const moonMat = new THREE.MeshPhongMaterial({ map: moonTex, shininess: 5 });
    const moon = new THREE.Mesh(moonGeo, moonMat);
    scene.add(moon);
    const moonAngleRef = { value: 0 };

    // ── ISS ───────────────────────────────────────────────────────────────────
    const issGroup = new THREE.Group();
    const trussMat = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 });
    const truss = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.05), trussMat);
    issGroup.add(truss);

    const panelMat = new THREE.MeshPhongMaterial({ color: 0x1a3a8a });
    for (const xOff of [-0.65, -0.35, 0.35, 0.65]) {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.02, 0.22), panelMat);
      panel.position.set(xOff, 0.02, 0);
      issGroup.add(panel);
    }
    const habitatMat = new THREE.MeshPhongMaterial({ color: 0xd0d0d0 });
    const habitat = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.25, 12), habitatMat);
    issGroup.add(habitat);
    scene.add(issGroup);

    const issAngleRef = { value: 1.5 };
    const issTrailPositions: THREE.Vector3[] = [];

    // ── Saturn ────────────────────────────────────────────────────────────────
    const saturnGeo = new THREE.SphereGeometry(1.8, 64, 64);
    const saturnMat = new THREE.MeshPhongMaterial({ map: saturnTex, shininess: 10 });
    const saturn = new THREE.Mesh(saturnGeo, saturnMat);
    saturn.position.set(-3, -4, -2);
    scene.add(saturn);

    // Saturn rings — RingGeometry with canvas texture
    const ringTex = buildRingTexture();
    const ringGeo = new THREE.RingGeometry(2.8, 4.5, 64);

    // UV-remap the ring geometry so the texture maps radially
    const ringPos = ringGeo.attributes.position;
    const ringUV  = ringGeo.attributes.uv;
    const innerR = 2.8, outerR = 4.5;
    for (let i = 0; i < ringPos.count; i++) {
      const x = ringPos.getX(i);
      const y = ringPos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      ringUV.setXY(i, (r - innerR) / (outerR - innerR), 0.5);
    }
    ringUV.needsUpdate = true;

    const ringMat = new THREE.MeshBasicMaterial({
      map: ringTex,
      color: 0xc2a46e,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });
    const rings = new THREE.Mesh(ringGeo, ringMat);
    rings.rotation.x = Math.PI / 2.5;
    rings.position.set(-3, -4, -2);
    scene.add(rings);

    // ── Jupiter ───────────────────────────────────────────────────────────────
    const jupiterGeo = new THREE.SphereGeometry(2, 64, 64);
    const jupiterMat = new THREE.MeshPhongMaterial({ map: jupiterTex, shininess: 8 });
    const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
    jupiter.position.set(-5, -6, -3);
    scene.add(jupiter);

    // ── Asteroid Belt ─────────────────────────────────────────────────────────
    const asteroids: AsteroidData[] = [];
    for (let i = 0; i < 80; i++) {
      const size = Math.random() * (0.08 - 0.02) + 0.02;
      const astGeo = new THREE.IcosahedronGeometry(size, 0);
      // Vary hue slightly so asteroids aren't identical
      const hueShift = (Math.random() - 0.5) * 0.2;
      const r = Math.round(0x6b + hueShift * 0x30);
      const g = Math.round(0x5a + hueShift * 0x20);
      const b = Math.round(0x45 + hueShift * 0x15);
      const astMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`rgb(${r},${g},${b})`),
        emissive: 0x1a1008,
        specular: 0x222222,
        shininess: 5,
        flatShading: true,
      });
      const astMesh = new THREE.Mesh(astGeo, astMat);
      const angle = Math.random() * Math.PI * 2;
      const orbitRadius = Math.random() * (14 - 6) + 6;
      const inclination = (Math.random() - 0.5) * 1.04;
      astMesh.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(inclination) * orbitRadius * 0.3,
        Math.sin(angle) * orbitRadius,
      );
      scene.add(astMesh);
      asteroids.push({
        mesh: astMesh, angle,
        speed: Math.random() * (0.002 - 0.0003) + 0.0003,
        orbitRadius, inclination,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
      });
    }

    // ── Starfield (3000 pts + Milky Way band) ─────────────────────────────────
    const STAR_COUNT = 3000;
    const MW_COUNT   = 2000;
    const TOTAL_STARS = STAR_COUNT + MW_COUNT;

    const starPositions = new Float32Array(TOTAL_STARS * 3);
    const starColors    = new Float32Array(TOTAL_STARS * 3);

    // Scattered stars in a sphere of radius 100
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 60 + Math.random() * 40;
      starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const roll = Math.random();
      if (roll < 0.70) {
        // pure white
        starColors[i * 3] = 1; starColors[i * 3 + 1] = 1; starColors[i * 3 + 2] = 1;
      } else if (roll < 0.85) {
        // blue-white
        starColors[i * 3] = 0.69; starColors[i * 3 + 1] = 0.77; starColors[i * 3 + 2] = 0.87;
      } else {
        // warm amber
        starColors[i * 3] = 1; starColors[i * 3 + 1] = 0.82; starColors[i * 3 + 2] = 0.56;
      }
    }

    // Milky Way band — concentrated diagonal smear
    for (let i = 0; i < MW_COUNT; i++) {
      const vi = (STAR_COUNT + i) * 3;
      const t  = (Math.random() - 0.5) * 160; // along the band axis
      const spread = (Math.random() - 0.5) * 18;
      starPositions[vi]     = t * 0.7 + spread;
      starPositions[vi + 1] = t * 0.3 + spread * 0.4;
      starPositions[vi + 2] = -40 + (Math.random() - 0.5) * 30;
      // soft violet-white
      const dim = 0.5 + Math.random() * 0.5;
      starColors[vi]     = 0.78 * dim;
      starColors[vi + 1] = 0.71 * dim;
      starColors[vi + 2] = 1.00 * dim;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color',    new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Resize Observer ───────────────────────────────────────────────────────
    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(canvas);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    // ── Visibility pause ──────────────────────────────────────────────────────
    let paused = false;
    const onVisibilityChange = () => { paused = document.visibilityState !== 'visible'; };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // ── Animation Loop ────────────────────────────────────────────────────────
    let rafId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (paused) return;

      earth.rotation.y  += 0.001;
      clouds.rotation.y += 0.0013;

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
      const nextAngle = ia + 0.013;
      issGroup.lookAt(
        2 + Math.cos(nextAngle) * 3.8,
        Math.sin(nextAngle * 0.3) * 0.8,
        Math.sin(nextAngle) * 3.8,
      );

      // ISS trail
      issTrailPositions.push(issGroup.position.clone());
      if (issTrailPositions.length > 10) issTrailPositions.shift();
      if (issTrailRef.current) {
        scene.remove(issTrailRef.current);
        issTrailRef.current.geometry.dispose();
        issTrailRef.current = null;
      }
      if (issTrailPositions.length > 0) {
        const trailArr = new Float32Array(issTrailPositions.length * 3);
        issTrailPositions.forEach((pos, idx) => {
          trailArr[idx * 3] = pos.x; trailArr[idx * 3 + 1] = pos.y; trailArr[idx * 3 + 2] = pos.z;
        });
        const trailGeo = new THREE.BufferGeometry();
        trailGeo.setAttribute('position', new THREE.BufferAttribute(trailArr, 3));
        const trailPts = new THREE.Points(trailGeo, new THREE.PointsMaterial({
          color: 0x7fecdc, size: 0.04, transparent: true, opacity: 0.6,
        }));
        issTrailRef.current = trailPts;
        scene.add(trailPts);
      }

      saturn.rotation.y  += 0.0008;
      jupiter.rotation.y += 0.003;

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

      [
        earthGeo, earthMat, cloudGeo, cloudMat, atmosphereGeo, atmosphereMat,
        moonGeo, moonMat, saturnGeo, saturnMat, ringGeo, ringMat, ringTex,
        jupiterGeo, jupiterMat, starGeo, starMat,
        earthTex, earthNrm, earthSpec, cloudTex, moonTex, saturnTex, jupiterTex,
      ].forEach((obj) => {
        if ('dispose' in obj) (obj as THREE.BufferGeometry | THREE.Material | THREE.Texture).dispose();
      });

      for (const ast of asteroids) {
        ast.mesh.geometry.dispose();
        (ast.mesh.material as THREE.Material).dispose();
      }
      // ISS materials
      [trussMat, panelMat, habitatMat].forEach(m => m.dispose());

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
