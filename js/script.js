const favoriteIcons = document.getElementsByClassName("heart-outline");
//get all the heart icons on the page

let favoriteArr;

if (localStorage.favorites) {
  favoriteArr = JSON.parse(localStorage.favorites);
} else {
  favoriteArr = [];
} //check if there is a favorites array in localStorage, if not create an empty one

const productImages = document.querySelectorAll(
  ".product-card img:first-child",
);
if (productImages.length > 0) {
  productImages[0].style.cursor = "pointer";
  productImages[0].onclick = function () {
    window.location.href = "product.html";
  };
}

for (let i = 0; i < favoriteIcons.length; i++) {
  for (let j = 0; j < favoriteArr.length; j++) {
    if (favoriteIcons[i].dataset.id === favoriteArr[j].id) {
      favoriteIcons[i].src = "img/heart-solid.png";
    }
  }
} //loop through the heart icons and the favorites array to set the correct heart image on page load

for (let i = 0; i < favoriteIcons.length; i++) {
  favoriteIcons[i].addEventListener("click", saveFavorite);
} //add a click event listener

function saveFavorite() {
  const favorite = {
    id: this.dataset.id,
    img: this.dataset.img,
  }; //create an object to represent the favorite item, using data attributes from the HTML

  for (let i = 0; i < favoriteArr.length; i++) {
    if (this.dataset.id === favoriteArr[i].id) {
      favoriteArr.splice(i, 1);
    }
  } //check if the item is already in the favorites array, if it is remove it (this handles the case of un-favoriting an item)

  if (this.src.includes("outline")) {
    // If it was an outline, make it solid and add to the array
    this.src = "img/heart-solid.png";
    favoriteArr.push(favorite);
  } else {
    // If it was solid, make it an outline and remove from the array
    this.src = "img/heart-outline.png";
  }

  localStorage.favorites = JSON.stringify(favoriteArr);
}
