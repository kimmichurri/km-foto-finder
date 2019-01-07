var chooseFotoFile = document.querySelector('#choose-file-button');
var addToAlbum = document.querySelector('#add-to-album').addEventListener('click', addFotoToAlbum);
var fotoGallery = document.querySelector('.foto-display');
//var imagesArr = JSON.parse(localStorage.getItem('photo')) || [];
var imagesArr = JSON.parse(localStorage.getItem('imagesArr')) || [];
// var imagesArr = [];
var reader = new FileReader();
var title = document.getElementById('foto-title');
var caption = document.getElementById('foto-caption');
// var postTitle = document.querySelector('.post-title').addEventListener();
// var postCaption = document.querySelector('.post-caption').addEventListener('input', editCaption);
// var favorite = document.querySelector('.heart-button');

window.addEventListener('load', appendPhotos);

function addFotoToAlbum(e) {
  e.preventDefault();
  if (chooseFotoFile.files[0]) {
    reader.readAsDataURL(chooseFotoFile.files[0]); 
    reader.onload = addPhoto;
  }
}

function displayFotos(id, file, title, caption) {
  fotoGallery.innerHTML +=
   `
   <section class="foto-post" id="${id}">
    <input class="post-title" type="text" value="${title}">
    <section class="post-image"><img src=${file} /></section>
    <input class="post-caption" type="text" value="${caption}">
    <section class="foto-interactive-container">
      <img class="trash-button" src="assets/delete.svg">
      <img class="heart-button" src="assets/favorite.svg">
    </section>
  </section>
  `
  var postTitle = document.querySelector(".post-title");
  var postCaption = document.querySelector(".post-caption");
  postTitle.onchange = editTitle;
  postCaption.onchange = editCaption;

  // var postTitle = document.querySelector(".post-title").addEventListener('input.onchange', editTitle);
  // var postCaption = document.querySelector(".post-caption").addEventListener('input.onchange', editCaption);
}

function appendPhotos() {
  imagesArr.forEach(function(photo) {
  displayFotos(photo.id, photo.file, photo.title, photo.caption);  
 })
}


function addPhoto(e) {
  var newPhoto = new Photo(Date.now(), e.target.result, title.value, caption.value);
  displayFotos(newPhoto.id, newPhoto.file, newPhoto.title, newPhoto.caption); 
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  clearInputFields();
}

function clearInputFields() {
  title.value = '';
  caption.value = '';
  // chooseFotoFile.innerText = 'TEST';
}

function editTitle() {
  console.log('AEHFIU');
}

function editCaption(e) {
  console.log('HHHIIIII');
}


// deleteFoto() {

// }

// favorFoto() {

// }

