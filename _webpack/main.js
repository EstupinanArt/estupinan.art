import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const raycaster = new THREE.Raycaster();
const windowHeight = window.innerHeight - window.innerHeight * 0.2;
const aspect = window.innerWidth / windowHeight;
const fov = 50;
const screenWidth = fov * aspect - 8;
const screenMidWidth = screenWidth / 2;
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 2000);

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

// GEO FIGURES

// Params for geo figures
const cubeParams = {
  w: 6,
  h: 6,
  d: 6,
  faces: 6,
};
const tetrahedronParams = {
  r: 5,
  faces: 4,
};
const dodecahedronParams = {
  r: 5,
  faces: 12,
};
const icosahedronParams = {
  r: 5,
  faces: 20,
};
const octahedronParams = {
  r: 5,
  faces: 8,
};
const sphereParams = {
  r: 5,
  w: 6,
  h: 6,
  faces: 1,
};
const allParamsForGroup = [
  tetrahedronParams,
  dodecahedronParams,
  icosahedronParams,
  octahedronParams,
];

// Basic figures configuration
const cubesMesh = [];
const tetrahedronsMesh = [];

const cubeGeo = new THREE.BoxGeometry(cubeParams.w, cubeParams.h, cubeParams.d);
cubeParams.geo = cubeGeo;

const tetrahedronGeo = new THREE.TetrahedronGeometry(tetrahedronParams.r);
tetrahedronParams.geo = tetrahedronGeo;

const dodecahedronGeo = new THREE.DodecahedronGeometry(dodecahedronParams.r);
dodecahedronParams.geo = dodecahedronGeo;

const icosahedronGeo = new THREE.IcosahedronGeometry(icosahedronParams.r);
icosahedronParams.geo = icosahedronGeo;

const octahedronGeo = new THREE.OctahedronGeometry(octahedronParams.r);
octahedronParams.geo = octahedronGeo;

const sphereGeo = new THREE.SphereGeometry(
  sphereParams.r,
  sphereParams.w,
  sphereParams.h
);
sphereParams.geo = sphereGeo;

// Set groups to necessary geometries
allParamsForGroup.forEach((param) => {
  for (let i = 0; i < param.faces; i++) {
    param.geo.addGroup(i * 3, 3, i);
  }
});

// Series names (folders), number of paints (to be displayed in landing) and order
const seriesEstupinan = [
  {
    folder: "colombia_2014",
    file: "col_tab_2014_",
    number: 19,
    params: dodecahedronParams,
  },
  {
    folder: "espana_2002_2005",
    file: "espa_tab_",
    number: 18,
    params: dodecahedronParams,
  },
  {
    folder: "eventos_inorganicos",
    file: "evento_inorganico_",
    number: 23,
    params: icosahedronParams,
  },
  {
    folder: "hong_kong",
    file: "hk_tab_89_",
    number: 8,
    params: octahedronParams,
  },
  {
    folder: "negra_paris_1999",
    file: "paris_noire_99_",
    number: 10,
    params: octahedronParams,
  },
  {
    folder: "paris_tab_91",
    file: "paris_tab_91_",
    number: 1,
    params: sphereParams,
  },
  {
    folder: "paris_tab_93",
    file: "paris_tab_93_",
    number: 8,
    params: octahedronParams,
  },
  {
    folder: "paris_tab_95",
    file: "paris_tab_95_",
    number: 22,
    params: icosahedronParams,
  },
  {
    folder: "paris_tab_99",
    file: "paris_tab_99_",
    number: 12,
    params: dodecahedronParams,
  },
  {
    folder: "pekin",
    file: "pekin_87_",
    number: 17,
    params: dodecahedronParams,
  },
  {
    folder: "shanshuei_hua",
    file: "shanshuei_hua_",
    number: 11,
    params: octahedronParams,
  },
];

// Texture base
const textureLoaderBase = new THREE.TextureLoader().setPath(
  "assets/images/series/landing/eventos_inorganicos/"
);

// Number of columns in the first row
let firstRowColumnsNumber = 2;
let secondRowColumnsNumber = 2;

if (window.innerWidth > 760) {
  firstRowColumnsNumber = 6;
  secondRowColumnsNumber = 5;
}

const halfFirstRowColumnsNumber = firstRowColumnsNumber / 2;
const halfSecondRowColumnsNumber = secondRowColumnsNumber / 2;

for (let i = -halfFirstRowColumnsNumber; i < halfFirstRowColumnsNumber; i++) {
  let meshForPosition;
  let addY = i % 2 == 0 ? 2.5 : -2.5;

  if (i % 2 == 0) {
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
