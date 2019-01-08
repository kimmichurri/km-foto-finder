class Photo {
  constructor(id, file, title, caption, favorite) {
    this.id = id || Date.now();
    this.file = file;
    this.title = title;
    this.caption = caption;
    this.favorite = favorite || false;
  }
  saveToStorage() {
    localStorage.setItem('imagesArr', JSON.stringify(imagesArr));
  }
  deleteFromStorage() {
    console.log('i am the delete from storage method');
    var photoIndex = imagesArr.findIndex(function(photoObj) {
      return photoObj.id === this.id;
    }, this); 
    imagesArr.splice(photoIndex, 1);
    this.saveToStorage();
  }
  updatePhoto() {
    var photoIndex = imagesArr.findIndex(function(photoObj) {
      return photoObj.id === this.id;
    }, this); 
    imagesArr.splice(photoIndex, 1, this);
    this.saveToStorage();
   }
   favoriteUpdate() {
    this.favorite = !this.favorite;
   }
}
