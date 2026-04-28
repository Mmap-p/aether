'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function JWSTPanel() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.right = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    canvas.style.borderRadius = '0 16px 16px 0';
    container.appendChild(canvas);
    rendererRef.current = renderer;

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
    camera.position.z = 6;
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0x1a0a2e, 1.0));

    // ── Build particle positions & colors ─────────────────────────────────────
    const PILLAR_COUNT = 3000;
    const BRIGHT_COUNT = 50;
    const BG_COUNT = 500;
    const TOTAL = PILLAR_COUNT + BRIGHT_COUNT + BG_COUNT;

    const positions = new Float32Array(TOTAL * 3);
    const colors = new Float32Array(TOTAL * 3);

    const rng = () => Math.random();

    // helper: gaussian-ish spread via summing two randoms
    const jitter = (spread: number) => (rng() - 0.5 + rng() - 0.5) * spread;

    // Color palette
    const hotGas    = new THREE.Color(0xff6b35);
    const nebula    = new THREE.Color(0xc084fc);
    const ionO2     = new THREE.Color(0x7fecdc);
    const nursery   = new THREE.Color(0xffd97d);

    // Pillar definitions: [centerX, yMin, yMax, xSpread, primary, secondary]
    type PillarDef = { cx: number; yMin: number; yMax: number; xs: number; c1: THREE.Color; c2: THREE.Color };
    const pillars: PillarDef[] = [
      { cx: -1.5, yMin: -3,   yMax: 3,   xs: 0.4,  c1: hotGas,  c2: nursery },
      { cx:  0.0, yMin: -4,   yMax: 4,   xs: 0.5,  c1: nebula,  c2: nebula  },
      { cx:  1.8, yMin: -3.5, yMax: 3.5, xs: 0.35, c1: ionO2,   c2: ionO2   },
    ];

    const pillarParticlesEach = Math.floor(PILLAR_COUNT / pillars.length);

    let idx = 0;
    for (let p = 0; p < pillars.length; p++) {
      const { cx, yMin, yMax, xs, c1, c2 } = pillars[p];
      const count = p === pillars.length - 1 ? PILLAR_COUNT - idx : pillarParticlesEach;
      for (let i = 0; i < count; i++) {
        const vi = idx * 3;
        positions[vi]     = cx + jitter(xs);
        positions[vi + 1] = yMin + rng() * (yMax - yMin) + jitter(0.3);
        positions[vi + 2] = (rng() - 0.5) * 1.0;

        // blend c1/c2 with slight random tint
        const t = rng();
        const col = t < 0.6 ? c1 : c2;
        const brightness = 0.7 + rng() * 0.3;
        colors[vi]     = col.r * brightness;
        colors[vi + 1] = col.g * brightness;
        colors[vi + 2] = col.b * brightness;
        idx++;
      }
    }

    // Bright star particles
    const brightStart = idx;
    for (let i = 0; i < BRIGHT_COUNT; i++) {
      const vi = idx * 3;
      // scatter inside pillar region
      const pillar = pillars[Math.floor(rng() * pillars.length)];
      positions[vi]     = pillar.cx + jitter(pillar.xs * 0.8);
      positions[vi + 1] = pillar.yMin + rng() * (pillar.yMax - pillar.yMin);
      positions[vi + 2] = (rng() - 0.5) * 0.8;
      // white to warm yellow
      const warmth = rng();
      colors[vi]     = 1.0;
      colors[vi + 1] = 0.9 + warmth * 0.1;
      colors[vi + 2] = 0.7 + warmth * 0.3;
      idx++;
    }

    // Background scatter
    const bgStart = idx;
    const bgColors = [hotGas, nebula, ionO2, nursery];
    for (let i = 0; i < BG_COUNT; i++) {
      const vi = idx * 3;
      positions[vi]     = (rng() - 0.5) * 8;
      positions[vi + 1] = (rng() - 0.5) * 8;
      positions[vi + 2] = (rng() - 0.5) * 4;
      const col = bgColors[Math.floor(rng() * bgColors.length)];
      const dim = 0.3 + rng() * 0.4;
      colors[vi]     = col.r * dim;
      colors[vi + 1] = col.g * dim;
      colors[vi + 2] = col.b * dim;
      idx++;
    }

    // ── Pillar geometry (small particles) ────────────────────────────────────
    const pillarGeo = new THREE.BufferGeometry();
    const pillarPos = positions.slice(0, (brightStart) * 3);
    const pillarCol = colors.slice(0, (brightStart) * 3);
    pillarGeo.setAttribute('position', new THREE.BufferAttribute(pillarPos, 3));
    pillarGeo.setAttribute('color',    new THREE.BufferAttribute(pillarCol, 3));

    const pillarMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const pillarPoints = new THREE.Points(pillarGeo, pillarMat);

    // ── Bright star geometry ──────────────────────────────────────────────────
    const brightGeo = new THREE.BufferGeometry();
    const brightPos = positions.slice(brightStart * 3, bgStart * 3);
    const brightCol = colors.slice(brightStart * 3, bgStart * 3);
    brightGeo.setAttribute('position', new THREE.BufferAttribute(brightPos, 3));
    brightGeo.setAttribute('color',    new THREE.BufferAttribute(brightCol, 3));

    const brightMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.15,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const brightPoints = new THREE.Points(brightGeo, brightMat);

    // ── Background scatter geometry ───────────────────────────────────────────
    const bgGeo = new THREE.BufferGeometry();
    const bgPos = positions.slice(bgStart * 3);
    const bgCol = colors.slice(bgStart * 3);
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    bgGeo.setAttribute('color',    new THREE.BufferAttribute(bgCol, 3));

    const bgMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const bgPoints = new THREE.Points(bgGeo, bgMat);

    // ── Group everything for rotation ─────────────────────────────────────────
    const group = new THREE.Group();
    group.add(pillarPoints, brightPoints, bgPoints);
    scene.add(group);

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ── Visibility pause ──────────────────────────────────────────────────────
    const onVisibility = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    // ── Animation loop ────────────────────────────────────────────────────────
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (pausedRef.current) return;

      // Drift pillar particles upward
      const pillarBuf = pillarGeo.attributes.position as THREE.BufferAttribute;
      const arr = pillarBuf.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 1] += 0.0003;          // y drift upward
        arr[i]     += (Math.random() - 0.5) * 0.00015; // tiny x wobble
        if (arr[i + 1] > 4) {
          arr[i + 1] = -4 + Math.random() * 0.5;
        }
      }
      pillarBuf.needsUpdate = true;

      // Slow Y rotation of entire group
      group.rotation.y += 0.0002;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);

      pillarGeo.dispose();
      brightGeo.dispose();
      bgGeo.dispose();
      pillarMat.dispose();
      brightMat.dispose();
      bgMat.dispose();
      renderer.dispose();

      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      rendererRef.current = null;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        height: '400px',
        marginTop: '2px',
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(127,236,220,0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
      }}
    >
      {/* LEFT TEXT HALF — 40% */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '40%',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '40px 36px',
          gap: '16px',
        }}
      >
        {/* Eyebrow label */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#7FECDC',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          PILLARS OF CREATION
        </span>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 300,
            color: '#E8F0FF',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          As seen by JWST
        </h2>

        {/* Body text */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'rgba(232,240,255,0.45)',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          The James Webb Space Telescope revealed never-before-seen details of
          this stellar nursery. On ÆTHER, researchers discussed 47 papers about
          this image within 24 hours of release.
        </p>

        {/* Discussion pill */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: '#C084FC',
            border: '1px solid rgba(192,132,252,0.3)',
            background: 'rgba(192,132,252,0.06)',
            borderRadius: '99px',
            padding: '3px 10px',
            display: 'inline-block',
            alignSelf: 'flex-start',
            letterSpacing: '0.05em',
          }}
        >
          47 Discussions
        </span>
      </div>

      {/* RIGHT CANVAS HALF — 60% */}
      <div
        ref={canvasRef}
        style={{
          position: 'relative',
          flex: 1,
          overflow: 'hidden',
        }}
      />
    </motion.div>
  );
}
