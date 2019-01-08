var chooseFotoFile = document.querySelector('#choose-file-button');
var addToAlbum = document.querySelector('#add-to-album').addEventListener('click', addFotoToAlbum);
var fotoGallery = document.querySelector('.foto-display');
var imagesArr = JSON.parse(localStorage.getItem('imagesArr')) || [];
var reader = new FileReader();
var title = document.getElementById('foto-title');
var caption = document.getElementById('foto-caption');

window.addEventListener('load', appendPhotos);
fotoGallery.addEventListener('click', clickPostButtons);

function addFotoToAlbum(e) {
  e.preventDefault();
  if (chooseFotoFile.files[0]) {
    reader.readAsDataURL(chooseFotoFile.files[0]); 
    reader.onload = addPhoto;
  }
}

function addPhoto(e) {
  var newPhoto = new Photo(Date.now(), e.target.result, title.value, caption.value);
  displayFotos(newPhoto.id, newPhoto.file, newPhoto.title, newPhoto.caption); 
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  clearInputFields();
}

function appendPhotos(imagesArr) {
  imagesArr = [];
  imagesArr.forEach(function(photo) {
  var newPhoto = new Photo(photo.id, photo.file, photo.title, photo.caption);
  imagesArr.push(newPhoto);
  displayFotos(newPhoto);  
 });
}

function displayFotos(id, file, title, caption) {
  fotoGallery.innerHTML +=
   `
   <section class="foto-post" data-id="${id}">
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

function clearInputFields() {
  title.value = '';
  caption.value = '';
}

function editTitle(e) {
  editFotoPost(e);
}

function editCaption(e) {
  editFotoPost(e);
}

function editFotoPost(e) {
  var postContainer = event.target.closest('section');
  var uniqueID = parseInt(postContainer.dataset.id);
  console.log(uniqueID);
  var uniquePostTitle = postContainer.children[0];
  var uniquePostFile = postContainer.children[1].children[0];
  var uniquePostCaption = postContainer.children[2];
  var editedFoto = new Photo(uniqueID, uniquePostFile.src, uniquePostTitle.value, uniquePostCaption.value);
  editedFoto.updatePhoto();
// Updates the default values of the .post-title and .post-caption input fields in the innerHTML in the displayFotos function with .setAttribute
  uniquePostTitle.setAttribute("value", uniquePostTitle.value);
  uniquePostCaption.setAttribute("value", uniquePostCaption.value);

}

function clickPostButtons(e) {
  var postContainer = event.target.parentElement.parentElement;
  var uniqueID = parseInt(event.target.parentElement.parentElement.dataset.id);
  console.log(uniqueID);
  var photoIndex = imagesArr.findIndex(function(image) {
      return image.id === uniqueID;
    });
  var clickedButton = e.target.className;
  if (clickedButton === 'trash-button') {
    imagesArr[photoIndex].deleteFromStorage();
  postContainer.remove();
  }
  // if (clickedButton === 'heart-button') {

  // }
}

// deleteFoto() {
//   var uniqueID = parseInt(e.target.closest('.foto-post').getAttribute('id'));
//   var postContainer = document.getElementById(uniqueID);
//   postContainer.deleteFromStorage();
  // here I want to access the correct post by its id using the same method that I did in editFotoPost function. Once I have that ID I can grab the container and say postContainer.deleteFromStorage(); within the delete from storage method I will splice it from the array in local storage. 
  // Then I have to re-save the array to local storage
// }

// favorFoto() {

// }



// I DUNNO

// var postTitle = document.querySelector('.post-title').addEventListener();
// var postCaption = document.querySelector('.post-caption').addEventListener('input', editCaption);
// var favorite = document.querySelector('.heart-button');

// this used to be in the displayfotos function:
// var postTitle = document.querySelector(".post-title").addEventListener('input.onchange', editTitle);  
// var postCaption = document.querySelector(".post-caption").addEventListener('input.onchange', editCaption);
