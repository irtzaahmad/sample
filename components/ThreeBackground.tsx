"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all floating education / science elements
    const elementsGroup = new THREE.Group();
    scene.add(elementsGroup);

    // Materials - Calm Emerald & Mint educational palette
    const emeraldMaterial = new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.3,
      metalness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const tealMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d9488,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.25,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    // 1. Floating Geometric Shapes (Math & Geometry)
    const icosahedronGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const icosahedron = new THREE.Mesh(icosahedronGeo, emeraldMaterial);
    icosahedron.position.set(-14, 8, -5);
    elementsGroup.add(icosahedron);

    const octahedronGeo = new THREE.OctahedronGeometry(2.8, 0);
    const octahedron = new THREE.Mesh(octahedronGeo, tealMaterial);
    octahedron.position.set(15, -6, -3);
    elementsGroup.add(octahedron);

    const dodecahedronGeo = new THREE.DodecahedronGeometry(2.5, 0);
    const dodecahedron = new THREE.Mesh(dodecahedronGeo, goldMaterial);
    dodecahedron.position.set(-12, -8, -4);
    elementsGroup.add(dodecahedron);

    // 2. Science Atom Model (Nucleus + Electron Orbits)
    const atomGroup = new THREE.Group();
    atomGroup.position.set(14, 8, -6);

    const nucleusGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    atomGroup.add(nucleus);

    // Three atomic orbit rings
    const ringGeo = new THREE.TorusGeometry(3.2, 0.05, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.3,
    });

    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    atomGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    atomGroup.add(ring2);

    const ring3 = new THREE.Mesh(ringGeo, ringMat);
    ring3.rotation.z = Math.PI / 4;
    atomGroup.add(ring3);

    elementsGroup.add(atomGroup);

    // 3. Floating 3D Book Geometry
    const bookGroup = new THREE.Group();
    const coverGeo = new THREE.BoxGeometry(3, 4, 0.4);
    const bookMat = new THREE.MeshStandardMaterial({
      color: 0x047857,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const bookMesh = new THREE.Mesh(coverGeo, bookMat);
    bookGroup.add(bookMesh);
    bookGroup.position.set(0, 12, -10);
    elementsGroup.add(bookGroup);

    // 4. Stardust / Knowledge Particles
    const particlesCount = 120;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 40;
      particlePositions[i + 2] = (Math.random() - 0.5) * 30;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      size: 0.25,
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x34d399, 2, 50);
    pointLight.position.set(0, 10, 15);
    scene.add(pointLight);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0015;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0015;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      camera.position.x = targetX * 12;
      camera.position.y = -targetY * 12;
      camera.lookAt(0, 0, 0);

      // Rotate 3D Education Elements
      icosahedron.rotation.x = elapsedTime * 0.25;
      icosahedron.rotation.y = elapsedTime * 0.35;
      icosahedron.position.y = 8 + Math.sin(elapsedTime * 0.8) * 0.6;

      octahedron.rotation.x = elapsedTime * 0.2;
      octahedron.rotation.z = elapsedTime * 0.3;
      octahedron.position.y = -6 + Math.cos(elapsedTime * 0.7) * 0.5;

      dodecahedron.rotation.y = elapsedTime * 0.2;
      dodecahedron.rotation.x = elapsedTime * 0.15;

      // Atom rotation
      ring1.rotation.x += 0.015;
      ring1.rotation.y += 0.01;
      ring2.rotation.y += 0.015;
      ring2.rotation.z += 0.01;
      ring3.rotation.z += 0.015;
      atomGroup.rotation.y = elapsedTime * 0.15;
      atomGroup.position.y = 8 + Math.sin(elapsedTime * 0.6) * 0.7;

      // Book gentle float
      bookMesh.rotation.y = Math.sin(elapsedTime * 0.4) * 0.4;
      bookMesh.rotation.x = 0.2 + Math.cos(elapsedTime * 0.5) * 0.1;
      bookGroup.position.y = 10 + Math.sin(elapsedTime * 0.9) * 0.5;

      // Subtle particle drift
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
