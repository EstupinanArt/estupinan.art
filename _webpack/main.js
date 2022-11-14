import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const raycaster = new THREE.Raycaster();
const windowHeight = window.innerHeight - window.innerHeight * 0.2;
const aspect = window.innerWidth / windowHeight;
const fov = 50;
const screenWidth = fov * aspect - 8;
const screenMidWidth = screenWidth / 2;
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 2000);

// Series names (folders), number of paints (to be displayed in landing) and order
const seriesEstupinan = [
  { name: "colombia_2014", number: 19 },
  { name: "espana_2002_2005", number: 18 },
  { name: "eventos_inorganicos", number: 23 },
  { name: "hong_kong", number: 8 },
  { name: "negra_paris_1999", number: 10 },
  { name: "paris_tab_91", number: 1 },
  { name: "paris_tab_93", number: 8 },
  { name: "paris_tab_95", number: 22 },
  { name: "paris_tab_99", number: 12 },
  { name: "pekin", number: 17 },
  { name: "shanshuei_hua", number: 11 },
];

// Params for geo figures
const cubeParams = {
  w: 6,
  h: 6,
  d: 6,
  faces: 6,
  geo: undefined,
};
const tetrahedronParams = {
  r: 5,
  faces: 4,
  geo: undefined,
};

// Renderer configuration
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, windowHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Orbit control to move the camera
new OrbitControls(camera, renderer.domElement);
camera.position.z = 50;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(14, 21, 29)");

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const lightDown = new THREE.DirectionalLight(0xffffff, 1);
lightDown.position.set(1, -1, 1);
scene.add(lightDown);

const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
backLight.position.set(-1, -1, -1);
scene.add(backLight);

// Mouse position
const mouse = {
  x: undefined,
  y: undefined,
};

// Basic figure configuration
const cubesMesh = [];
const tetrahedronsMesh = [];

const cubeGeo = new THREE.BoxGeometry(cubeParams.w, cubeParams.h, cubeParams.d);
cubeParams.geo = cubeGeo;
const tetrahedronGeo = new THREE.TetrahedronGeometry(tetrahedronParams.r);
tetrahedronParams.geo = tetrahedronGeo;

// First line figures
const figsFirstLine = { number: 6, figures: [cubeParams, tetrahedronParams] };

// Texture base
const textureLoaderBase = new THREE.TextureLoader().setPath(
  "assets/images/series/landing/eventos_inorganicos/"
);

for (let i = -3; i < 3; i++) {
  let meshForPosition;
  let addY = 0;
  if (i % 2 == 0) {
    addY = 2.5;

    const textures = [];
    for (let j = 0; j < cubeParams.faces; j++) {
      const texture = textureLoaderBase.load(`evento_inorganico_${j + 1}.jpeg`);
      textures.push(new THREE.MeshPhongMaterial({ map: texture }));
    }

    const cubeMesh = new THREE.Mesh(cubeParams.geo, textures);
    meshForPosition = cubeMesh;
    scene.add(cubeMesh); // add cube
    cubesMesh.push(cubeMesh);
  } else {
    addY = -2.5;
    tetrahedronGeo.addGroup(0, 3, 0);
    tetrahedronGeo.addGroup(3, 3, 1);
    tetrahedronGeo.addGroup(6, 3, 2);
    tetrahedronGeo.addGroup(9, 3, 3);

    const textures = [];

    for (let j = 0; j < tetrahedronParams.faces; j++) {
      const texture = textureLoaderBase.load(`evento_inorganico_${j + 1}.jpeg`);
      textures.push(new THREE.MeshPhongMaterial({ map: texture }));
    }

    const tetrahedronMesh = new THREE.Mesh(tetrahedronParams.geo, textures);
    meshForPosition = tetrahedronMesh;
    scene.add(tetrahedronMesh); // add tetrahedron
    tetrahedronsMesh.push(tetrahedronMesh);
  }

  meshForPosition.position.set(
    (screenWidth * i) / 6 + screenMidWidth / 6,
    fov / 5 + addY,
    0
  );
}

for (let i = -2; i < 3; i++) {
  const tetrahedronGeo = new THREE.TetrahedronGeometry(tetrahedronParams.r);
  tetrahedronGeo.addGroup(0, 3, 0);
  tetrahedronGeo.addGroup(3, 3, 1);
  tetrahedronGeo.addGroup(6, 3, 2);
  tetrahedronGeo.addGroup(9, 3, 3);

  const textures = [];

  for (let j = 0; j < tetrahedronParams.faces; j++) {
    const texture = textureLoaderBase.load(`evento_inorganico_${j + 1}.jpeg`);
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
  cubesMesh.forEach((cube, index) => {
    let rand1 = Math.random();
    let rand2 = Math.random();
    let rand3 = Math.random();
    const sign = index % 2 === 0 ? 1 : -1;
    cube.rotation.x += 0.0008 * rand1 * sign;
    cube.rotation.y += 0.0009 * rand2 * sign;
    cube.rotation.z += 0.0007 * rand3 * sign;
  });
  tetrahedronsMesh.forEach((tetrahedron, index) => {
    const rand1 = Math.random();
    const rand2 = Math.random();
    const rand3 = Math.random();
    const sign = index % 2 === 0 ? 1 : -1;
    tetrahedron.rotation.x += 0.0008 * rand1 * sign;
    tetrahedron.rotation.y += 0.0009 * rand2 * sign;
    tetrahedron.rotation.z += 0.0007 * rand3 * sign;
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
