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

function appendPhotos() {
 imagesArr.forEach(function (photo) {
   fotoGallery.innerHTML += `<img src=${photo.file} />`
 })
}

function addFotoToAlbum(e) {
  e.preventDefault();
  // console.log(input.files[0])
  if (chooseFotoFile.files[0]) {
    reader.readAsDataURL(chooseFotoFile.files[0]); 
    reader.onload = addPhoto;
  }
}

function addPhoto(e) {
  // console.log(e.target.result);
  var newPhoto = new Photo(Date.now(), e.target.result, title.value, caption.value);
  //add favorite later
  fotoGallery.innerHTML += 
  `
  <section class="foto-post"
    <h2 class="post-title">${title.value}</h2>
    <section class="post-image"><img src=${e.target.result} /></section>
    <section class="post-caption">${caption.value}</section>
    <section class="foto-interactive-container">
      <img class="trash-button" src="assets/delete.svg">
      <img class="heart-button" src="assets/favorite.svg"
  </section>
  `;
  imagesArr.push(newPhoto);
  // console.log(imagesArr);
  newPhoto.saveToStorage(imagesArr);
}

// deleteFoto() {

// }

// favorFoto() {

// }

