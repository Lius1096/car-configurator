import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const normalize = (s) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

export default function CarViewer({ color = "#ff0000", selectedWheel = null, options = {} }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const carRef = useRef(null);

  const wheelsMapRef = useRef({ front: [], rear: [] });
  const optionsMapRef = useRef({});
  const bodyMeshesRef = useRef([]);

  // ----------------------------
  // INIT SCENE / CAMERA / RENDERER
  // ----------------------------
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f5f5f5");

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3, 1.5, 4);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.9);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Floor shadow
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(3, 64),
      new THREE.ShadowMaterial({ opacity: 0.25 })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // ----------------------------
    // LOAD CAR MODEL
    // ----------------------------
    const loader = new GLTFLoader();
    loader.load(
      "/models/car.glb",
      (gltf) => {
        const car = gltf.scene;

        // DEBUG : log all objects
        console.group("GLTF Scene Objects");
        car.traverse((obj) => console.log("OBJ name:", obj.name, "isMesh:", obj.isMesh));
        console.groupEnd();

        // Reset references
        wheelsMapRef.current = { front: [], rear: [] };
        optionsMapRef.current = {};
        bodyMeshesRef.current = [];

        // Traverse all meshes
        car.traverse((obj) => {
          if (!obj.isMesh) return;

          obj.castShadow = true;
          obj.receiveShadow = true;

          const name = (obj.name || "").toLowerCase();

          // Body / paint / chassis / bumper / boot / underbody
          if (
            ["body", "paint", "carpaint", "chassis", "boot", "bumper", "underbody"].some((k) =>
              name.includes(k)
            )
          ) {
            bodyMeshesRef.current.push(obj);
          }

          // Wheels
          if (name.startsWith("cylinder000")) wheelsMapRef.current.front.push(obj);
          if (name.startsWith("cylinder001")) wheelsMapRef.current.rear.push(obj);

          // Options (option_sunroof, option_sportpackage...)
          if (name.startsWith("option_")) {
            const key = name.replace("option_", "");
            if (!optionsMapRef.current[key]) optionsMapRef.current[key] = [];
            optionsMapRef.current[key].push(obj);
          }
        });

        // Attach car to scene
        car.position.set(0, 0, 0);
        car.scale.set(1.05, 1.05, 1.05);
        scene.add(car);
        carRef.current = car;

        // Apply initial config
        applyColor(color);
        applyWheel(selectedWheel);
        applyOptions(options);
      },
      undefined,
      (err) => console.error("Erreur chargement GLB :", err)
    );

    // ----------------------------
    // CONTROLS
    // ----------------------------
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minPolarAngle = Math.PI / 3.8;
    controls.target.set(0, 0.5, 0);
    controls.update();

    // ----------------------------
    // ANIMATION LOOP
    // ----------------------------
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ----------------------------
    // RESIZE HANDLER
    // ----------------------------
    const onResize = () => {
      const w = mount.clientWidth;
      const h = 420;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (renderer && renderer.domElement && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // ----------------------------
  // HELPERS
  // ----------------------------
  const applyColor = (hex) => {
    if (!carRef.current) return;
    const threeColor = new THREE.Color(hex || "#ffffff");
    bodyMeshesRef.current.forEach((mesh) => {
      if (!mesh.material) return;
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => {
          if (m.color) m.color.set(threeColor);
          m.needsUpdate = true;
        });
      } else {
        if (mesh.material.color) mesh.material.color.set(threeColor);
        mesh.material.needsUpdate = true;
      }
    });
  };

  const applyWheel = (wheelId) => {
    if (!carRef.current) return;
    const map = wheelsMapRef.current;

    Object.values(map).forEach((group) => group.forEach((m) => (m.visible = false)));

    if (wheelId === "front") map.front.forEach((m) => (m.visible = true));
    if (wheelId === "rear") map.rear.forEach((m) => (m.visible = true));
  };

  const applyOptions = (opts = {}) => {
    const map = optionsMapRef.current || {};
    const incoming = new Set(Object.keys(opts).map((k) => normalize(k)));

    Object.keys(map).forEach((key) => {
      const meshes = map[key];
      const enabled = incoming.has(normalize(key)) || Boolean(opts[key]);
      meshes.forEach((mesh) => {
        if (mesh && mesh.visible !== undefined) mesh.visible = enabled;
      });
    });
  };

  // ----------------------------
  // EFFECTS
  // ----------------------------
  useEffect(() => applyColor(color), [color]);
  useEffect(() => applyWheel(selectedWheel), [selectedWheel]);
  useEffect(() => applyOptions(options), [options]);

  return (
    <div
      ref={mountRef}
      className="w-full h-[420px] rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-200"
    />
  );
}
