class Photo {
  constructor(id, file, title, caption) {
    this.id = id || Date.now();
    this.file = file;
    this.title = title;
    this.caption = caption;
    // this.favorite = favorite || false;
  }
  saveToStorage() {
    localStorage.setItem('imagesLocalStorage', JSON.stringify(imagesArr));
  }
  deleteFromStorage() {

  }
  // findPhotoInArray(photoObj){
  //     return photoObj.id === this.id;
  // }
  updatePhoto() {
    var photoIndex = imagesArr.findIndex(function(photoObj) {
      return photoObj.id === this.id;
    }, this); 
    imagesArr.splice(photoIndex, 1, this);
    this.saveToStorage();
  }
}


// function deleteIdea(cardId) {
//   var card = cardArray.find(function(card) {
//     return card.id === cardId
//   });
//   var index = cardArray.indexOf(card);
//   cardArray.splice(index, 1);
//   card.deleteFromStorage(cardArray);
//   var deleteCard = document.getElementById(cardId.toString());
//   deleteCard.closest('.idea-card').remove();
// }

    // access the images array
    // find the index of the object we are trying to replace
    // run the splice method on the images array with the new index we found- splice will specify which index number we need, it will state that we are splicing one element, and it will pass in the new thing (foto object) to be in that spliced place
    // we will save that to storage... is this already saving to storage?
    // we will wash our hands clean of the old one, never to think of that fauhef again

// REFERENCE

// function replaceLastPizza(pizzas, pizza) {
//   pizzas.splice(pizzas.length - 1, 1, pizza);
//   return pizzas;
// }