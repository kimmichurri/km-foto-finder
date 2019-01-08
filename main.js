var chooseFotoFile = document.querySelector('#choose-file-button');
var addToAlbum = document.querySelector('#add-to-album').addEventListener('click', addFotoToAlbum);
var fotoGallery = document.querySelector('.foto-display');
var imagesArr = JSON.parse(localStorage.getItem('imagesLocalStorage')) || [];
var reader = new FileReader();
var title = document.getElementById('foto-title');
var caption = document.getElementById('foto-caption');
var searchInput = document.querySelector('.search');


window.addEventListener('load', appendPhotos);
searchInput.addEventListener('input', searchFilter);
// fotoGallery.addEventListener('click', removeOrFavorite);


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
  var postTitleArray = document.querySelectorAll(".post-title");
  var postCaptionArray = document.querySelectorAll(".post-caption");
  for (i = 0; i < postTitleArray.length; i++){
  postTitleArray[i].onchange = editTitle;
  postCaptionArray[i].onchange = editCaption;
  }
}

function appendPhotos() {
  imagesArr.forEach(function(photo) {
  displayFotos(photo.id, photo.file, photo.title, photo.caption); 
 })
  for (var i = 0; i < imagesArr.length; i++) {
    imagesArr[i] = new Photo(imagesArr[i].id, imagesArr[i].file, imagesArr[i].title, imagesArr[i].caption);
  }
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
}

function editFotoPost(e) {
  var uniqueID = parseInt(e.target.closest('.foto-post').getAttribute('id'));
  var postContainer = document.getElementById(uniqueID);
  var uniquePostTitle = postContainer.children[0];
  var uniquePostFile = postContainer.children[1].children[0];
  var uniquePostCaption = postContainer.children[2];
  var editedFoto = new Photo(uniqueID, uniquePostFile.src, uniquePostTitle.value, uniquePostCaption.value);
  editedFoto.updatePhoto();
// Unset the defaults from the main title and caption fields
  uniquePostTitle.setAttribute("value", uniquePostTitle.value);
  uniquePostCaption.setAttribute("value", uniquePostCaption.value);

}

function editTitle(e) {
  editFotoPost(e);
}

function editCaption(e) {
  editFotoPost(e);
}

function removeAllPosts() {
  fotoGallery.innerHTML = '';
}

function searchFilter() {
  removeAllPosts();
  var currentSearchText = searchInput.value;
  console.log(currentSearchText)
  var returnedCards = imagesArr.filter(function(photo){
    return photo.title.includes(currentSearchText) || photo.caption.includes(currentSearchText);
  });
  returnedCards.forEach(function(photo){
    displayFotos(photo.id, photo.file, photo.title, photo.caption);
  });
}

// function removeOrFavorite(e) {
//   e.preventDefault();
//   var selectedPost = e.target.closest('foto-interactive-container');
//   console.log(e.target);
// }


