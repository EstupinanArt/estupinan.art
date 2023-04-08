const backwardGalleryButton = document.getElementById("backward-gallery");
const forwardGalleryButton = document.getElementById("forward-gallery");
const backwardPictureButton = document.getElementById("backward-picture");
const forwardPictureButton = document.getElementById("forward-picture");

backwardGalleryButton.addEventListener("click", selectGallery);
forwardGalleryButton.addEventListener("click", selectGallery);

const galleries = [
    "COL-TAB-2014",
    "ESPA-TAB",
    "EVENTOS INORGÁNICOS",
    "HK TAB",
    "PARIS NOIRE",
    "PARIS TAB 91",
    "PARIS TAB 95",
    "PARIS TAB 99",
    "PEQUÍN 87",
    "SHANSHUEI HUA",
];

let currentGalleryIndex = 0;
function selectGallery(direction) {
    if (direction === 'back'){
        if (currentGalleryIndex <= 0) {
            currentGalleryIndex = galleries.length - 1;
        } else {
            currentGalleryIndex -= 1;
        }
    } else {
        if (currentGalleryIndex >= galleries.length-1) {
            currentGalleryIndex = 0;
        } else {
            currentGalleryIndex += 1;
        }
    }

    document.getElementById('gallery-title').innerHTML = galleries[currentGalleryIndex];
}

const colTab2014 = {
    COLTAB01: {
        title: "COL-TAB-01",
        description: "Acrylic, size 102,36 / 230,32 in. 260/585 cm.",
        photo: "/assets/images/galleries/SERIE_COL_TAB_2014_IMG_XIAO/COL_TAB-2014-01.jpg"
    },
    COLTAB02: {
        title: "COL-TAB-02",
        description: "Acrylic, size 102,36 / 230,32 in. 260/585 cm.",
        photo: "/assets/images/galleries/COL-TAB-2014-02.jpg"
    }
};

let gallery = colTab2014;
function selectPicture() {
    document.getElementById('picture').src = gallery.COLTAB01.photo;
}
backwardPictureButton.addEventListener("click", selectPicture);