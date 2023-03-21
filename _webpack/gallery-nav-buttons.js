let galleryButtonHover = document.getElementsByClassName('gallery-button');

for (let i = 0; i < galleryButtonHover.length; i++) {
    galleryButtonHover[i].onmouseenter = function() {
        console.log(galleryButtonHover[i].id)
    }
}