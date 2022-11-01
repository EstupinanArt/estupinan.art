import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const raycaster = new THREE.Raycaster();
const aspect = window.innerWidth / window.innerHeight;
const fov = 50;
const screenWidth = fov * aspect - 8;
const screenMidWidth = screenWidth / 2;
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 2000);
const cubeParams = {
  w: 6,
  h: 6,
  d: 6,
  faces: 6,
};
const tetrahedronParams = {
  r: 6.5,
  faces: 4,
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);
camera.position.z = 50;

const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const lightDown = new THREE.DirectionalLight(0xffffff, 1);
lightDown.position.set(1, -1, 1);
scene.add(lightDown);

const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
backLight.position.set(-1, -1, -1);
scene.add(backLight);

const mouse = {
  x: undefined,
  y: undefined,
};

const cubesMesh = [];

for (let i = -3; i < 3; i++) {
  const cubeGeo = new THREE.BoxGeometry(
    cubeParams.w,
    cubeParams.h,
    cubeParams.d
  );

  const textures = [];
  const textureLoaderBase = new THREE.TextureLoader().setPath(
    "assets/images/serie_eventos_inorganicos/"
  );

  for (let j = 0; j < cubeParams.faces; j++) {
    const texture = textureLoaderBase.load(`evento-inorganico-0${j + 1}.jpeg`);
    textures.push(new THREE.MeshPhongMaterial({ map: texture }));
  }

  const cubeMesh = new THREE.Mesh(cubeGeo, textures);
  cubeMesh.position.set((screenWidth * i) / 6 + screenMidWidth / 6, fov / 5, 0);
  scene.add(cubeMesh); // add cube
  cubesMesh.push(cubeMesh);
}

const tetrahedronsMesh = [];

for (let i = -2; i < 3; i++) {
  const tetrahedronGeo = new THREE.TetrahedronGeometry(tetrahedronParams.r);
  tetrahedronGeo.addGroup(0, 3, 0);
  tetrahedronGeo.addGroup(3, 3, 1);
  tetrahedronGeo.addGroup(6, 3, 2);
  tetrahedronGeo.addGroup(9, 3, 3);

  const textures = [];
  const textureLoaderBase = new THREE.TextureLoader().setPath(
    "assets/images/serie_eventos_inorganicos/"
  );

  for (let j = 0; j < tetrahedronParams.faces; j++) {
    const texture = textureLoaderBase.load(`evento-inorganico-0${j + 1}.jpeg`);
    textures.push(new THREE.MeshPhongMaterial({ map: texture }));
  }

  const tetrahedronMesh = new THREE.Mesh(tetrahedronGeo, textures);
  tetrahedronMesh.position.set((screenWidth * i) / 5, -fov / 5, 0);
  scene.add(tetrahedronMesh); // add tetrahedron
  tetrahedronsMesh.push(tetrahedronMesh);
}

const geometry = new THREE.BoxGeometry(screenWidth, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  cubesMesh.forEach((cube) => {
    cube.rotation.x += 0.002;
    cube.rotation.y += 0.003;
    cube.rotation.z += 0.001;
  });
  tetrahedronsMesh.forEach((tetrahedron) => {
    tetrahedron.rotation.x += 0.001;
    tetrahedron.rotation.y += 0.002;
    tetrahedron.rotation.z += 0.003;
  });
  // cubeMesh.rotation.x += 0.002;
  // cubeMesh.rotation.y += 0.003;
  // cubeMesh.rotation.z += 0.001;
  // planeMesh.rotation.x += 0.01;
  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse, camera);

  // const positions = planeMesh.geometry.attributes.position;

  // for (let i = 0; i < positions.count; i++) {
  //   positions.setX(
  //     i,
  //     positions.originalPosition[i * 3] +
  //       Math.cos(frame + positions.randomValues[i * 3]) * 0.01
  //   );

  //   positions.setY(
  //     i,
  //     positions.originalPosition[i * 3 + 1] +
  //       Math.sin(frame + positions.randomValues[i * 3 + 1]) * 0.01
  //   );
  // }
  // positions.needsUpdate = true;

  // const intersects = raycaster.intersectObject(planeMesh);
  // const intersectsCube = raycaster.intersectObject(cubeMesh);
}
animate();

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
});

addEventListener("click", () => {
  raycaster.setFromCamera(mouse, camera);
  // const intersectsCube = raycaster.intersectObject(cubeMesh);

  // if (intersectsCube.length) {
  //   console.log("hi");
  // }
});
