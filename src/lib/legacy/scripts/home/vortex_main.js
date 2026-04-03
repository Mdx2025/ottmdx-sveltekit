import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile } from '../common/ismobile';

gsap.registerPlugin(ScrollTrigger);

const root = document.getElementById('vortex-root');
const section = document.getElementById('vortex');

if (root && section) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  const group = new THREE.Group();
  let raf = 0;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  root.innerHTML = '';
  root.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 2.5);
  light.position.set(4, 4, 6);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));

  const rings = [
    new THREE.Mesh(new THREE.TorusGeometry(1.85, isMobile() ? 0.03 : 0.01, 12, 96), new THREE.MeshBasicMaterial({ color: 0x000000 })),
    new THREE.Mesh(new THREE.TorusGeometry(2.35, isMobile() ? 0.03 : 0.01, 12, 96), new THREE.MeshBasicMaterial({ color: 0x000000 })),
    new THREE.Mesh(new THREE.TorusGeometry(2.75, isMobile() ? 0.03 : 0.01, 12, 96), new THREE.MeshBasicMaterial({ color: 0x000000 }))
  ];

  rings.forEach((ring, index) => {
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = index === 0 ? (isMobile() ? -4 : -2.5) : index === 1 ? (isMobile() ? -1.5 : -1) : 0;
    group.add(ring);
  });

  scene.add(group);
  camera.position.set(isMobile() ? 15 : 6, isMobile() ? 6 : 2.4, 0);
  camera.lookAt(0, 0, 0);

  function resize() {
    const width = root.clientWidth || window.innerWidth;
    const height = root.clientHeight || Math.max(window.innerHeight * 0.7, 480);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function animate() {
    group.rotation.y += 0.005;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener('resize', resize);

  gsap.timeline({
    scrollTrigger: {
      trigger: '#vortex',
      start: 'top top',
      end: 'bottom top',
      pin: isMobile() ? false : true,
      anticipatePin: 1,
      pinSpacing: true
    }
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '#vortex',
      start: 'top bottom',
      end: 'bottom top-=150%',
      scrub: true,
      onUpdate: (self) => {
        group.rotation.y += self.direction > 0 ? -0.025 : 0.025;
      }
    }
  }).to(group.position, { y: isMobile() ? 0 : 1.5 });

  window.__ottVortexDispose?.();
  window.__ottVortexDispose = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    rings.forEach((ring) => {
      ring.geometry.dispose();
      ring.material.dispose();
    });
    root.innerHTML = '';
  };
}
