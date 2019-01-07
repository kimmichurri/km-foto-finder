class Photo {
  constructor(id, file, title, caption) {
    this.id = id || Date.now();
    this.file = file;
    this.title = title;
    this.caption = caption;
    // this.favorite = favorite || false;
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
    // find the index of the photo of the card I want removed using the same process as update photo method
    // once we have the index we will use that to remove the item from storage, so instead of .setItem we will use .removeItem()... or I can just splice it out of the array? let me go access what i need from the dom now
  updatePhoto() {
    var photoIndex = imagesArr.findIndex(function(photoObj) {
      return photoObj.id === this.id;
    }, this); 
    imagesArr.splice(photoIndex, 1, this);
    this.saveToStorage();
   }
}


    // access the images array
    // find the index of the object we are trying to replace
    // run the splice method on the images array with the new index we found- splice will specify which index number we need, it will state that we are splicing one element, and it will pass in the new thing (foto object) to be in that spliced place
    // we will save that to storage... is this already saving to storage?
    // we will wash our hands clean of the old one, never to think of that fauhef again

// REFERENCE
