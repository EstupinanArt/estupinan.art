/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./_webpack/gallery-nav-buttons.js":
/*!*****************************************!*\
  !*** ./_webpack/gallery-nav-buttons.js ***!
  \*****************************************/
/***/ (() => {

eval("const backwardGalleryButton = document.getElementById(\"backward-gallery\");\nconst forwardGalleryButton = document.getElementById(\"forward-gallery\");\nconst backwardPictureButton = document.getElementById(\"backward-picture\");\nconst forwardPictureButton = document.getElementById(\"forward-picture\");\nbackwardGalleryButton.addEventListener(\"click\", selectGallery);\nforwardGalleryButton.addEventListener(\"click\", selectGallery);\nconst galleries = [\"COL-TAB-2014\", \"ESPA-TAB\", \"EVENTOS INORGÁNICOS\", \"HK TAB\", \"PARIS NOIRE\", \"PARIS TAB 91\", \"PARIS TAB 95\", \"PARIS TAB 99\", \"PEQUÍN 87\", \"SHANSHUEI HUA\"];\nlet currentGalleryIndex = 0;\nfunction selectGallery(direction) {\n  if (direction === 'back') {\n    if (currentGalleryIndex <= 0) {\n      currentGalleryIndex = galleries.length - 1;\n    } else {\n      currentGalleryIndex -= 1;\n    }\n  } else {\n    if (currentGalleryIndex >= galleries.length - 1) {\n      currentGalleryIndex = 0;\n    } else {\n      currentGalleryIndex += 1;\n    }\n  }\n  document.getElementById('gallery-title').innerHTML = galleries[currentGalleryIndex];\n}\nconst colTab2014 = {\n  COLTAB01: {\n    title: \"COL-TAB-01\",\n    description: \"Acrylic, size 102,36 / 230,32 in. 260/585 cm.\",\n    photo: \"/assets/images/galleries/SERIE_COL_TAB_2014_IMG_XIAO/COL_TAB-2014-01.jpg\"\n  },\n  COLTAB02: {\n    title: \"COL-TAB-02\",\n    description: \"Acrylic, size 102,36 / 230,32 in. 260/585 cm.\",\n    photo: \"/assets/images/galleries/COL-TAB-2014-02.jpg\"\n  }\n};\nlet gallery = colTab2014;\nfunction selectPicture() {\n  document.getElementById('picture').src = gallery.COLTAB01.photo;\n}\nbackwardPictureButton.addEventListener(\"click\", selectPicture);\n\n//# sourceURL=webpack:///./_webpack/gallery-nav-buttons.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./_webpack/gallery-nav-buttons.js"]();
/******/ 	
/******/ })()
;