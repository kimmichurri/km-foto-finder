class Photo {
  constructor(id, file, title, caption) {
    this.id = id || Date.now();
    this.file = file;
    this.title = title;
    this.caption = caption;
    this.favorite = false;
  }
  static saveToStorage(imagesArr) {
    localStorage.setItem('imagesLocalStorage', JSON.stringify(imagesArr));
  }
  static deleteFromStorage(selectedPostId, imagesArr) {
    var selectedPostIdIndex = imagesArr.findIndex(function(photo) {
    return photo.id === selectedPostId;
  });
  imagesArr.splice(selectedPostIdIndex, 1);
  Photo.saveToStorage(imagesArr);
  }
  updatePhoto() {
    var photoIndex = imagesArr.findIndex(function(photoObj) {
      return photoObj.id === this.id;
    }, this); 
    imagesArr.splice(photoIndex, 1, this);
    this.saveToStorage();
  }
}
