import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile } from '../common/ismobile';

gsap.registerPlugin(ScrollTrigger);

const root = document.getElementById('vortex-root');
const section = document.getElementById('vortex');

function createLogoCard(result) {
  const wrapper = document.createElement('div');
  wrapper.className = 'logo-vortex';

  const media = document.createElement('div');
  const img = document.createElement('img');
  img.src = result.src;
  img.alt = 'logo_vortex';
  img.width = 100;
  img.height = 100;
  img.loading = 'lazy';
  media.appendChild(img);

  const info = document.createElement('div');
  info.className = 'info';

  const number = document.createElement('span');
  number.textContent = result.number;

  const data = document.createElement('p');
  data.textContent = result.data;

  info.append(number, data);

  const layer = document.createElement('span');
  layer.className = 'layer';

  wrapper.append(media, info, layer);

  return { wrapper, layer };
}

if (root && section) {
  window.__ottVortexDispose?.();

  const radius = Number.parseFloat(section.querySelector('.hidden-radius')?.textContent || '3.25');
  const reversed = section.querySelector('.hidden-reversed')?.textContent === 'true';
  const resultsData = Array.from(section.querySelectorAll('.hidden-result'))
    .map((result) => ({
      src: result.children[0]?.dataset?.src || '',
      number: result.children[1]?.textContent || '',
      data: result.children[2]?.textContent || ''
    }))
    .filter((result) => result.src);

  if (reversed) resultsData.reverse();

  root.innerHTML = '';

  const stage = document.createElement('div');
  stage.style.position = 'relative';
  stage.style.width = '100%';
  stage.style.height = '100%';
  stage.style.overflow = 'visible';

  const canvasLayer = document.createElement('div');
  canvasLayer.style.position = 'absolute';
  canvasLayer.style.inset = '0';
  canvasLayer.style.pointerEvents = 'none';
  canvasLayer.style.overflow = 'visible';

  const htmlLayer = document.createElement('div');
  htmlLayer.style.position = 'absolute';
  htmlLayer.style.inset = '0';
  htmlLayer.style.pointerEvents = 'none';
  htmlLayer.style.overflow = 'visible';

  stage.append(canvasLayer, htmlLayer);
  root.appendChild(stage);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  const group = new THREE.Group();
  const resultsGroup = new THREE.Group();
  const anchorNodes = [];
  const ringResources = [];
  const tmpWorld = new THREE.Vector3();
  const tmpProjected = new THREE.Vector3();
  const timelines = [];
  let renderer = null;
  let raf = 0;
  let vortexRotationSpeed = 0.005;
  let width = 0;
  let height = 0;

  scene.add(group);
  group.add(resultsGroup);

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    canvasLayer.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(4, 4, 6);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const rings = [
      new THREE.Mesh(
        new THREE.TorusGeometry(1.85, isMobile() ? 0.015 : 0.002125, 6, 48),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      ),
      new THREE.Mesh(
        new THREE.TorusGeometry(2.35, isMobile() ? 0.015 : 0.002125, 6, 48),
        new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
      ),
      new THREE.Mesh(
        new THREE.TorusGeometry(2.75, isMobile() ? 0.015 : 0.002125, 6, 48),
        new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
      )
    ];

    rings.forEach((ring, index) => {
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = index === 0 ? (isMobile() ? -4 : -2.5) : index === 1 ? (isMobile() ? -1.5 : -1) : 0;
      group.add(ring);
      ringResources.push(ring);
    });
  } catch (error) {
    console.warn('OTT vortex WebGL disabled:', error);
  }

  resultsData.forEach((result, index) => {
    const anchor = new THREE.Object3D();
    anchor.position.set(
      radius * Math.cos((2 * index * Math.PI) / resultsData.length),
      0,
      radius * Math.sin((2 * index * Math.PI) / resultsData.length)
    );
    resultsGroup.add(anchor);

    const card = createLogoCard(result);
    htmlLayer.appendChild(card.wrapper);

    anchorNodes.push({
      anchor,
      wrapper: card.wrapper,
      layer: card.layer
    });
  });

  camera.position.set(isMobile() ? 15 : 6, isMobile() ? 6 : 2.4, 0);
  camera.lookAt(0, 0, 0);

  function updateCards() {
    anchorNodes.forEach(({ anchor, wrapper, layer }) => {
      anchor.getWorldPosition(tmpWorld);
      tmpProjected.copy(tmpWorld).project(camera);

      const isVisible = Number.isFinite(tmpProjected.x) && Number.isFinite(tmpProjected.y) && tmpProjected.z > -1.25 && tmpProjected.z < 1.25;

      if (!isVisible) {
        wrapper.style.display = 'none';
        return;
      }

      wrapper.style.display = 'flex';
      wrapper.style.left = `${(tmpProjected.x * 0.5 + 0.5) * width}px`;
      wrapper.style.top = `${(-tmpProjected.y * 0.5 + 0.5) * height}px`;
      wrapper.style.zIndex = `${Math.round((1 - tmpProjected.z) * 1000)}`;

      const scale = isMobile() ? 0.85 : 1;
      wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;

      const layerOpacity = Math.max(1 - (tmpWorld.x / (radius * 2) + 0.5), 0);
      layer.style.opacity = `${layerOpacity}`;
    });
  }

  function resize() {
    width = root.clientWidth || window.innerWidth;
    height = root.clientHeight || Math.max(window.innerHeight * 0.7, 480);

    if (renderer) {
      renderer.setSize(width, height, false);
    }

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    updateCards();
  }

  function animate() {
    group.rotation.y += vortexRotationSpeed;

    if (renderer) {
      renderer.render(scene, camera);
    }

    updateCards();
    raf = requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener('resize', resize);

  timelines.push(
    gsap.timeline({
      scrollTrigger: {
        trigger: '#vortex',
        start: 'top top',
        end: 'bottom top',
        pin: isMobile() ? false : true,
        anticipatePin: 1,
        pinSpacing: true
      }
    })
  );

  timelines.push(
    gsap.timeline({
      scrollTrigger: {
        trigger: '#vortex',
        start: 'top bottom',
        end: 'top+=200% top',
        onEnter: () => renderer?.setAnimationLoop?.(null),
        onEnterBack: () => renderer?.setAnimationLoop?.(null)
      }
    })
  );

  timelines.push(
    gsap.timeline({
      scrollTrigger: {
        trigger: '#vortex',
        start: 'top bottom',
        end: 'top top',
        scrub: true
      }
    }).from('.results', {
      yPercent: isMobile() ? 0 : 800
    })
  );

  timelines.push(
    gsap.timeline({
      scrollTrigger: {
        trigger: '#vortex',
        start: 'top bottom',
        end: 'bottom top-=150%',
        scrub: true,
        onUpdate: (self) => {
          vortexRotationSpeed = self.direction > 0 ? -0.005 : 0.005;
        }
      }
    }).to(group.position, {
      y: isMobile() ? 0 : 1.5
    })
  );

  timelines.push(
    gsap.timeline({
      scrollTrigger: {
        trigger: '#vortex',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }).to(resultsGroup.rotation, {
      y: isMobile() ? -17.5 : -5
    })
  );

  timelines.push(
    gsap.timeline({
      scrollTrigger: {
        trigger: '#vortex',
        start: 'bottom-=33% bottom',
        end: 'bottom top',
        scrub: true
      }
    }).to(resultsGroup.position, {
      y: isMobile() ? 0 : -3
    })
  );

  window.__ottVortexDispose = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);

    timelines.forEach((timeline) => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    });

    renderer?.dispose();

    ringResources.forEach((ring) => {
      ring.geometry.dispose();
      ring.material.dispose();
    });

    root.innerHTML = '';
  };
}
