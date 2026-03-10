const favGrid = document.querySelector(".product-grid");
//get the favorite container

function renderFavorites() {
  const favoritesData = localStorage.getItem("favorites"); //get the favorites from localStorage
  let favoriteArr;

  if (favoritesData) {
    favoriteArr = JSON.parse(favoritesData); //turn the string back into an array
  } else {
    favoriteArr = [];
  }

  favGrid.innerHTML = ""; //clear the grid before adding new items

  if (favoriteArr.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.innerText = "Your gallery is currently empty.";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.gridColumn = "1/-1";
    favGrid.appendChild(emptyMessage);
    return;
    //return early if there are no favorites
  }

  for (let i = 0; i < favoriteArr.length; i++) {
    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = favoriteArr[i].img;
    img.alt = "Saved Artwork";

    const removeIcon = document.createElement("img");
    removeIcon.src = "img/heart-solid.png";
    removeIcon.className = "heart-outline"; // Using the same CSS class for position

    removeIcon.onclick = function () {
      favoriteArr.splice(i, 1);

      const jsonString = JSON.stringify(favoriteArr);
      localStorage.setItem("favorites", jsonString);

      renderFavorites();
    };

    card.appendChild(img);
    card.appendChild(removeIcon);
    favGrid.appendChild(card);
  }
}

renderFavorites();
