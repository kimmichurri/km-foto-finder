var chooseFotoFile = document.querySelector('#choose-file-button');
var addToAlbum = document.querySelector('#add-to-album').addEventListener('click', addFotoToAlbum);
var fotoGallery = document.querySelector('.photo-display');
var imagesArr = JSON.parse(localStorage.getItem('photo')) || [];
var reader = new FileReader();
var title = document.getElementById('foto-title');
var caption = document.getElementById('foto-caption');

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
  var newPhoto = new Photo(Date.now(), e.target.result);
  fotoGallery.innerHTML += 
  `
  <section class="foto-post"
    <h2 class="post-title">${title.value}</h2>
    <section class="post-image"><img src=${e.target.result} /></section>
    <section class="post-caption">${caption.value}</section>
  </section>
  `;
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  // generateFotoPost(newPhoto);
}

// function generateFotoPost(photoObject) {
//   var foto = document.createElement('section');
//   foto.className = 'foto-post';
//   foto.innerHTML = 
//   `<section class='foto-post-container' id='${photoObject.id}'>
//     <h2 class='post-title'>${photoObject.title}</h2>  
//     <article class='post-caption'>${photoObject.caption}</article>
//     <article class='foto-interactive-container'>
//       <img class='trash-button' src='assets/delete.svg' onclick='deleteFoto(${photoObject.id})'>
//       <img class='heart-button' src='assets/favorite.svg' onclick='favorFoto(event)'>
//     </article>
//   </section>
//   `
//   addPhoto();
//   // addPhoto(photoObject);
//   // cardWrapper.prepend(card);
// }

// deleteFoto() {

// }

// favorFoto() {

// }

