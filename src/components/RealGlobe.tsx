"use client";

import { useEffect, useRef } from "react";

export default function RealGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Dynamically load Three.js from CDN
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;

    script.onload = () => {
      const THREE = (window as any).THREE;

      // ── Scene setup ──
      const W = mount.clientWidth;
      const H = mount.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
      camera.position.z = 2.5;

      // ── Lighting ──
      // Ambient (subtle fill)
      const ambient = new THREE.AmbientLight(0x333355, 0.6);
      scene.add(ambient);

      // Sun directional light (from upper-left)
      const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.2);
      sunLight.position.set(-3, 2, 3);
      scene.add(sunLight);

      // Soft backlight (night side glow tint)
      const backLight = new THREE.DirectionalLight(0x112244, 0.4);
      backLight.position.set(3, -1, -3);
      scene.add(backLight);

      // ── Texture loader ──
      const loader = new THREE.TextureLoader();
      loader.crossOrigin = "anonymous";

      // Using a reliable public domain NASA Blue Marble texture
      const EARTH_DAY =
        "https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/textures/planets/earth_atmos_2048.jpg";
      const EARTH_NORMAL =
        "https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/textures/planets/earth_normal_2048.jpg";
      const EARTH_SPECULAR =
        "https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/textures/planets/earth_specular_2048.jpg";
      const EARTH_CLOUDS =
        "https://raw.githubusercontent.com/mrdoob/three.js/r128/examples/textures/planets/earth_clouds_1024.png";

      // ── Earth sphere ──
      const earthGeo = new THREE.SphereGeometry(1, 64, 64);

      let earthMesh: any;
      let cloudMesh: any;
      let atmMesh: any;

      // Load textures and build earth
      Promise.all([
        new Promise<any>((res) => loader.load(EARTH_DAY, res, undefined, () => res(null))),
        new Promise<any>((res) => loader.load(EARTH_NORMAL, res, undefined, () => res(null))),
        new Promise<any>((res) => loader.load(EARTH_SPECULAR, res, undefined, () => res(null))),
        new Promise<any>((res) => loader.load(EARTH_CLOUDS, res, undefined, () => res(null))),
      ]).then(([dayTex, normalTex, specTex, cloudTex]) => {
        // Earth material
        const earthMat = new THREE.MeshPhongMaterial({
          map: dayTex,
          normalMap: normalTex,
          normalScale: new THREE.Vector2(0.8, 0.8),
          specularMap: specTex,
          specular: new THREE.Color(0x4488bb),
          shininess: 25,
        });
        earthMesh = new THREE.Mesh(earthGeo, earthMat);
        // Start rotated so Indonesia faces front-ish (lng ~107 = ~107/360 * 2π offset)
        earthMesh.rotation.y = -Math.PI * 0.4;
        scene.add(earthMesh);

        // Cloud layer
        if (cloudTex) {
          const cloudGeo = new THREE.SphereGeometry(1.008, 64, 64);
          const cloudMat = new THREE.MeshPhongMaterial({
            map: cloudTex,
            transparent: true,
            opacity: 0.55,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
          cloudMesh.rotation.y = earthMesh.rotation.y;
          scene.add(cloudMesh);
        }

        // Atmosphere glow (Fresnel-like via vertex shader)
        const atmGeo = new THREE.SphereGeometry(1.08, 64, 64);
        const atmMat = new THREE.ShaderMaterial({
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
              gl_FragColor = vec4(0.2, 0.55, 1.0, 1.0) * intensity * 1.4;
            }
          `,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
        });
        atmMesh = new THREE.Mesh(atmGeo, atmMat);
        scene.add(atmMesh);

        // Jakarta marker — add after earth is placed
        addJakartaMarker();
      });

      // ── Jakarta marker ──
      function addJakartaMarker() {
        const jakartaLat = -6.2;
        const jakartaLng = 106.8;
        const phi = (90 - jakartaLat) * (Math.PI / 180);
        const theta = (jakartaLng + 180) * (Math.PI / 180);

        const x = -(Math.sin(phi) * Math.cos(theta));
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);

        // Glowing dot
        const dotGeo = new THREE.SphereGeometry(0.018, 16, 16);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(x, y, z);
        if (earthMesh) earthMesh.add(dot);

        // Pulse ring (torus)
        const ringGeo = new THREE.TorusGeometry(0.04, 0.004, 8, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x22c55e,
          transparent: true,
          opacity: 0.7,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(x, y, z);
        ring.lookAt(new THREE.Vector3(x * 2, y * 2, z * 2));
        if (earthMesh) {
          earthMesh.add(ring);
          // Animate ring scale in render loop
          (ring as any).__pulse = true;
        }

        return { dot, ring };
      }

      // ── Stars background ──
      const starGeo = new THREE.BufferGeometry();
      const starCount = 2000;
      const starPositions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 200;
      }
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.15,
        transparent: true,
        opacity: 0.6,
      });
      const stars = new THREE.Points(starGeo, starMat);
      scene.add(stars);

      // ── Mouse drag interaction ──
      let isDragging = false;
      let prevMouse = { x: 0, y: 0 };
      let autoRotate = true;
      let dragVelocity = { x: 0 };

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        autoRotate = false;
        prevMouse = { x: e.clientX, y: e.clientY };
        dragVelocity.x = 0;
      };
      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging || !earthMesh) return;
        const dx = e.clientX - prevMouse.x;
        earthMesh.rotation.y += dx * 0.005;
        if (cloudMesh) cloudMesh.rotation.y += dx * 0.005;
        dragVelocity.x = dx * 0.005;
        prevMouse = { x: e.clientX, y: e.clientY };
      };
      const onMouseUp = () => {
        isDragging = false;
        // Resume auto rotate after 2s idle
        setTimeout(() => { autoRotate = true; }, 2000);
      };

      // Touch support
      const onTouchStart = (e: TouchEvent) => {
        isDragging = true;
        autoRotate = false;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };
      const onTouchMove = (e: TouchEvent) => {
        if (!isDragging || !earthMesh) return;
        const dx = e.touches[0].clientX - prevMouse.x;
        earthMesh.rotation.y += dx * 0.005;
        if (cloudMesh) cloudMesh.rotation.y += dx * 0.005;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };

      renderer.domElement.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onMouseUp);

      // ── Render loop ──
      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;

        if (earthMesh) {
          if (autoRotate) {
            earthMesh.rotation.y += 0.0015;
          }
          // Tilt axis slightly for realism
          earthMesh.rotation.x = 0.18;
        }
        if (cloudMesh) {
          if (autoRotate) cloudMesh.rotation.y += 0.0018;
          cloudMesh.rotation.x = 0.18;
        }
        if (atmMesh) {
          atmMesh.rotation.y = earthMesh?.rotation.y ?? 0;
          atmMesh.rotation.x = 0.18;
        }

        // Pulse marker rings
        if (earthMesh) {
          earthMesh.children.forEach((child: any) => {
            if (child.__pulse) {
              const p = (Math.sin(t * 2.5) * 0.5 + 0.5);
              child.scale.setScalar(1 + p * 1.8);
              child.material.opacity = (1 - p) * 0.7;
            }
          });
        }

        renderer.render(scene, camera);
      };
      animate();

      // ── Resize handler ──
      const onResize = () => {
        if (!mount) return;
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Cleanup ──
      cleanupRef.current = () => {
        cancelAnimationFrame(frame);
        renderer.domElement.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        renderer.domElement.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onMouseUp);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    };

    document.head.appendChild(script);

    return () => {
      cleanupRef.current();
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        background: "radial-gradient(ellipse at center, #0a0f1e 0%, #020617 70%)",
        borderRadius: "0.75rem",
        overflow: "hidden",
      }}
      onMouseDown={(e) => e.preventDefault()}
    />
  );
}