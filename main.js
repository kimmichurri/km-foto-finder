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
    photoGallery.innerHTML += `<img src=${photo.file} />`
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
  fotoGallery.innerHTML += `${title.value} <img src=${e.target.result} /> ${caption.value}`;
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





























// IBOX Reference

// function createNewIdea(e) {
//   // e.preventDefault();
//   // var ideaTitleInput = document.querySelector('#title-input').value;
//   // var ideaBodyInput = document.querySelector('#body-input').value;
//   // var ideaObject = new Idea(ideaTitleInput, ideaBodyInput);
//   generateIdeaCard(ideaObject);
//   cardArray.push(ideaObject);
//   ideaObject.saveToStorage(cardArray);
//   clearTextFields();
// }

// function generateIdeaCard(ideaObject) {
//   var card = document.createElement('section');
//   card.className = 'idea-card';
//   card.innerHTML = 
//   `<section class='card-container' id='${ideaObject.id}'>
//     <h2 contenteditable = true class='card-title'>
//       ${ideaObject.title}
//     </h2>  
//     <article contenteditable = true class='card-body'>
//       ${ideaObject.body}
//     </article>
//     <article class='idea-card-footer'>
//       <section class='arrow-buttons-quality-container'>
//         <img class='downvote-button' src='downvote.svg' onclick='updateIdeaQuality(event, "downvote")'>
//         <img class='upvote-button' src='upvote.svg' onclick='updateIdeaQuality(event, "upvote")'>
//         <span class='quality-category'>
//         Quality: 
//         ${ideaObject.qualityArray[ideaObject.qualityIndex]}
//         </span>
//       </section>
//       <section class='delete-button-container'>
//         <img class='delete-button' src='delete.svg' onclick='deleteIdea(${ideaObject.id})'>
//       </section>
//     </article>
//   </section>
//   `
//   cardWrapper.prepend(card);
// }