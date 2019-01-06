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

  }
  updatePhoto() {

  }
}


// REFERENCE

// function replaceLastPizza(pizzas, pizza) {
//   // pizzas.pop();
//   // pizzas.push(pizza);
//   pizzas.splice(pizzas.length - 1, 1, pizza);
//   return pizzas;
// }