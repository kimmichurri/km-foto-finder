var chooseFotoFile = document.querySelector('#choose-file-button');
var addToAlbum = document.querySelector('#add-to-album').addEventListener('click', addFotoToAlbum);
var fotoGallery = document.querySelector('.foto-display');
//var imagesArr = JSON.parse(localStorage.getItem('photo')) || [];
var imagesArr = JSON.parse(localStorage.getItem('imagesArr')) || [];
// var imagesArr = [];
var reader = new FileReader();
var title = document.getElementById('foto-title');
var caption = document.getElementById('foto-caption');
// var favorite = document.querySelector('.heart-button');

window.addEventListener('load', appendPhotos);

function displayFotos(title, image, caption) {
  fotoGallery.innerHTML +=
   `
   <section class="foto-post"
    <h2 class="post-title" contenteditable="true">${title}</h2>
    <section class="post-image"><img src=${image} /></section>
    <section class="post-caption" contenteditable="true">${caption}</section>
    <section class="foto-interactive-container">
      <img class="trash-button" src="assets/delete.svg">
      <img class="heart-button" src="assets/favorite.svg">
    </section>
  </section>
  `
}

function appendPhotos() {
  imagesArr.forEach(function(photo) {
  displayFotos(photo.title, photo.file, photo.caption)  
 })
}

function addFotoToAlbum(e) {
  e.preventDefault();
  if (chooseFotoFile.files[0]) {
    reader.readAsDataURL(chooseFotoFile.files[0]); 
    reader.onload = addPhoto;
  }
}

function addPhoto(e) {
  var newPhoto = new Photo(Date.now(), e.target.result, title.value, caption.value);
  displayFotos(newPhoto.title, newPhoto.file, newPhoto.caption); 
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
}

// deleteFoto() {

// }

// favorFoto() {

// }

