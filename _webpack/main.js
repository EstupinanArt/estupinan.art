import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const raycaster = new THREE.Raycaster();
const windowHeight = window.innerHeight - window.innerHeight * 0.2;
const aspect = window.innerWidth / windowHeight;
const fov = 50;
const screenWidth = fov * aspect - 8;
const screenMidWidth = screenWidth / 2;
const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 2000);

// Configure text
const allMeshText = [];
const loader = new FontLoader();

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
  r: 4,
  w: 35,
  h: 35,
  faces: 1,
};
const allParamsForTriangleGroup = [
  tetrahedronParams,
  icosahedronParams,
  octahedronParams,
];
const allParamsForPentagonGroup = [dodecahedronParams];

// Basic figures configuration
const allMeshGeo = [];
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
allParamsForTriangleGroup.forEach((param) => {
  for (let i = 0; i < param.faces; i++) {
    param.geo.addGroup(i * 3, 3, i);
  }
});
allParamsForPentagonGroup.forEach((param) => {
  for (let i = 0; i < param.faces; i++) {
    param.geo.addGroup(i * 9, 9, i);
  }
});

// Series names (folders), number of paints (to be displayed in landing) and order
const seriesArt = [
  {
    folder: "colombia_2014",
    file: "col_tab_2014_",
    number: 19,
    params: dodecahedronParams,
    name: "Colombia 2014",
  },
  {
    folder: "espana_2002_2005",
    file: "espa_tab_",
    number: 18,
    params: dodecahedronParams,
    name: "España 2002",
  },
  {
    folder: "eventos_inorganicos",
    file: "evento_inorganico_",
    number: 23,
    params: icosahedronParams,
    name: "Eventos inorgánicos",
  },
  {
    folder: "hong_kong",
    file: "hk_tab_89_",
    number: 8,
    params: octahedronParams,
    name: "Honk Kong",
  },
  {
    folder: "negra_paris_1999",
    file: "paris_noire_99_",
    number: 10,
    params: octahedronParams,
    name: "Negra París",
  },
  {
    folder: "paris_tab_91",
    file: "paris_tab_91_",
    number: 1,
    params: sphereParams,
    name: "París 1991",
  },
  {
    folder: "paris_tab_93",
    file: "paris_tab_93_",
    number: 8,
    params: octahedronParams,
    name: "París 1993",
  },
  {
    folder: "paris_tab_95",
    file: "paris_tab_95_",
    number: 22,
    params: icosahedronParams,
    start: 8,
    name: "París 1995",
  },
  {
    folder: "paris_tab_99",
    file: "paris_tab_99_",
    number: 12,
    params: dodecahedronParams,
    name: "París 1999",
  },
  {
    folder: "pekin",
    file: "pekin_87_",
    number: 17,
    params: dodecahedronParams,
    name: "Pekín",
  },
  {
    folder: "shanshuei_hua",
    file: "shanshuei_hua_",
    number: 11,
    params: octahedronParams,
    name: "Shanshuei Hua",
  },
];

// Texture base
const textureLoaderBase = new THREE.TextureLoader().setPath(
  "assets/images/series/landing/"
);

// ROWS CONFIG

// Number of columns on each row
let rows = [2, 2];

if (window.innerWidth > 760) {
  rows = [6, 5];
}

const rowsNum = rows.length;
const halfRowsNum = Math.floor(rowsNum / 2);
// Iterate for each row
for (let indexRow = 0; indexRow < rows.length; indexRow++) {
  const columnsNum = rows[indexRow];
  const addForRange = columnsNum % 2 === 0 ? 0 : 1;
  const halfColumnsNum = Math.floor(columnsNum / 2);
  // Iterate for each colum
  for (
    let column = -halfColumnsNum;
    column < halfColumnsNum + addForRange;
    column++
  ) {
    let addY = column % 2 === 0 ? 2.5 : -2.5;

    const textures = [];
    const serie =
      indexRow === 0
        ? seriesArt[column + halfColumnsNum]
        : seriesArt[indexRow * rows[indexRow - 1] + (column + halfColumnsNum)];
    const facesNumber = serie.params.faces;
    for (let j = 0; j < facesNumber; j++) {
      let start = 0;
      if (serie.start) start = j + serie.start;
      const texture = textureLoaderBase.load(
        `/${serie.folder}/${serie.file}${start + 1}.jpeg`
      );
      textures.push(new THREE.MeshPhongMaterial({ map: texture }));
    }

    const mesh =
      facesNumber === 1
        ? new THREE.Mesh(serie.params.geo, textures[0])
        : new THREE.Mesh(serie.params.geo, textures);

    const oddColumAdd = columnsNum % 2 ? 0 : screenMidWidth / columnsNum;
    const locationY = halfRowsNum - indexRow;
    const oddRowAdd = rowsNum % 2 === 0 && locationY <= 0 ? -fov / 5 : 0;

    const xPositionGeo = (screenWidth * column) / columnsNum + oddColumAdd;
    const yPositionGeo = (locationY * fov) / 5 + oddRowAdd + addY;
    const zPositionGeo = 0;

    mesh.position.set(xPositionGeo, yPositionGeo, zPositionGeo);

    scene.add(mesh); // add mesh figure
    allMeshGeo.push(mesh); // include in the array of all geo meshes

    // Load text
    let meshText;
    let addYMeshText = column % 2 === 0 ? -7 : 7;
    loader.load("assets/fonts/Josefin_Sans_Light.json", function (font) {
      const geometry = new TextGeometry(serie.name, {
        font: font,
        size: 1.4,
        height: 0.05,
        curveSegments: 4,
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 3,
      });
      geometry.center();
      const material = new THREE.MeshBasicMaterial({
        color: "#dbe4eb",
        specular: "#dbe4eb",
      });
      meshText = new THREE.Mesh(geometry, material);
      meshText.quaternion.copy(camera.quaternion);
      meshText.position.set(
        xPositionGeo,
        yPositionGeo + addYMeshText,
        zPositionGeo
      );
      scene.add(meshText);
      allMeshText.push(meshText);
    });
  }
}
// First row

// for (let i = -2; i < 3; i++) {
//   const tetrahedronGeo = new THREE.TetrahedronGeometry(tetrahedronParams.r);
//   tetrahedronGeo.addGroup(0, 3, 0);
//   tetrahedronGeo.addGroup(3, 3, 1);
//   tetrahedronGeo.addGroup(6, 3, 2);
//   tetrahedronGeo.addGroup(9, 3, 3);

//   const textures = [];

//   for (let j = 0; j < tetrahedronParams.faces; j++) {
//     const texture = textureLoaderBase.load(`evento_inorganico_${j + 1}.jpeg`);
//     textures.push(new THREE.MeshPhongMaterial({ map: texture }));
//   }

//   const tetrahedronMesh = new THREE.Mesh(tetrahedronGeo, textures);
//   tetrahedronMesh.position.set((screenWidth * i) / 5, -fov / 5, 0);
//   scene.add(tetrahedronMesh); // add tetrahedron
//   tetrahedronsMesh.push(tetrahedronMesh);
// }

const geometry = new THREE.BoxGeometry(screenWidth, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);
  allMeshGeo.forEach((mesh, index) => {
    let rand1 = Math.random();
    let rand2 = Math.random();
    let rand3 = Math.random();
    const sign = index % 2 === 0 ? 1 : -1;
    mesh.rotation.x += 0.001 * rand1 * sign;
    mesh.rotation.y += 0.0012 * rand2 * sign;
    mesh.rotation.z += 0.0014 * rand3 * sign;
  });
  allMeshText.forEach((mesh) => {
    if (mesh) mesh.quaternion.copy(camera.quaternion);
  });
  // tetrahedronsMesh.forEach((tetrahedron, index) => {
  //   const rand1 = Math.random();
  //   const rand2 = Math.random();
  //   const rand3 = Math.random();
  //   const sign = index % 2 === 0 ? 1 : -1;
  //   tetrahedron.rotation.x += 0.0008 * rand1 * sign;
  //   tetrahedron.rotation.y += 0.0009 * rand2 * sign;
  //   tetrahedron.rotation.z += 0.0007 * rand3 * sign;
  // });
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
