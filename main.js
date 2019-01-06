var chooseFotoFile = document.querySelector('#choose-file-button');
var addToAlbum = document.querySelector('#add-to-album').addEventListener('click', addFotoToAlbum);
var fotoGallery = document.querySelector('.photo-display');
var imagesArr = JSON.parse(localStorage.getItem('photo')) || [];
var reader = new FileReader();
var fotoTitle = document.querySelector('.foto-title');
var fotoCaption = document.querySelector('.foto-caption');

window.addEventListener('load', appendPhotos);

function addFotoToAlbum(e) {
  e.preventDefault();
  // console.log(input.files[0])
  if (chooseFotoFile.files[0]) {
    reader.readAsDataURL(chooseFotoFile.files[0]); 
    reader.onload = addPhoto
  }
}

function appendPhotos() {
  imagesArr.forEach(function (photo) {
    photoGallery.innerHTML += `<img src=${photo.file} />`
  })
}

function addPhoto(e) {
  // console.log(e.target.result);
  var newPhoto = new Photo(Date.now(), e.target.result);
  fotoGallery.innerHTML += `<img src=${e.target.result} />`;
  imagesArr.push(newPhoto)
  newPhoto.saveToStorage(imagesArr)
}



// TRAVIS CODE

// var input = document.querySelector('input');
// var create = document.querySelector('button');
// var photoGallery = document.querySelector('.images');
// var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
// var reader = new FileReader();
// window.addEventListener('load', appendPhotos);
// create.addEventListener('click', createElement);

// function appendPhotos() {
//   imagesArr.forEach(function (photo) {
//     photoGallery.innerHTML += `<img src=${photo.file} />`
//   })
// }

// function createElement() {
//   // console.log(input.files[0])
//   if (input.files[0]) {
//     reader.readAsDataURL(input.files[0]); 
//     reader.onload = addPhoto
//   }
// }

// function addPhoto(e) {
//   // console.log(e.target.result);
//   var newPhoto = new Photo(Date.now(), e.target.result);
//   photoGallery.innerHTML += `<img src=${e.target.result} />`;
//   imagesArr.push(newPhoto)
//   newPhoto.saveToStorage(imagesArr)
// }
