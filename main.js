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
fotoGallery.addEventListener('click', manipulatePost);
fotoGallery.addEventListener('keyup', manipulatePost);


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
  var postContainer = e.target.closest('.foto-post');
  var uniqueID = parseInt(postContainer.dataset.id);
  var uniquePostTitle = postContainer.children[0];
  var uniquePostFile = postContainer.children[1].children[0];
  var uniquePostCaption = postContainer.children[2];
  var editedFoto = new Photo(uniqueID, uniquePostFile.src, uniquePostTitle.value, uniquePostCaption.value);
  editedFoto.updatePhoto();
// Reassign the defaults from the main title and caption fields
  uniquePostTitle.setAttribute("value", uniquePostTitle.value);
  uniquePostCaption.setAttribute("value", uniquePostCaption.value);

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

function manipulatePost(e) {
  if (e.target.classList.contains('trash-button')) {
    deletePost(e);
  }
  if (e.target.classList.contains('post-title' || 'post-caption')) {
    editFotoPost(e);
  }
  if (e.target.classList.contains('heart-button')) {
    favorPost(e);
  }
}

function deletePost(e) {
  e.preventDefault();
  var selectedPost = e.target.closest('.foto-post');
  var selectedPostId = parseInt(selectedPost.dataset.id);
  var selectedPostIdIndex = imagesArr.findIndex(function(photo){
    return photo.id === selectedPostId;
  });
  imagesArr[selectedPostIdIndex].deleteFromStorage();
  selectedPost.remove();
}

function favorPost(e) {
  var heartButton = e.target;
  var selectedPost = e.target.closest('.foto-post');
  var selectedPostId = parseInt(selectedPost.dataset.id);
  var selectedPostIdIndex = imagesArr.findIndex(function(photo){
    return photo.id === selectedPostId;
  });
  var post = imagesArr[selectedPostIdIndex];
  post.favorite = !post.favorite;
  post.saveToStorage();
  if(post.favorite === true) {
    heartButton.setAttribute("src", "assets/favorite-active.svg");
  } else {
    heartButton.setAttribute("src", "assets/favorite.svg");
  }
}
