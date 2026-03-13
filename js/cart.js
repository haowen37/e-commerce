const favGrid = document.querySelector(".product-grid");

function renderFavorites() {
  // get favorites from localStorage
  const favoritesData = localStorage.getItem("favorites");
  let favoriteArr = [];
  if (favoritesData) {
    favoriteArr = JSON.parse(favoritesData);
  }

  // Clear the grid before rendering
  favGrid.innerHTML = "";

  //check if there are any favorites, if not show a message
  if (favoriteArr.length === 0) {
    favGrid.innerHTML =
      '<p style="grid-column: 1/-1; text-align: center;">Your wishlist is empty.</p>';
    return;
  }

  // Loop through the favorites array and create a card for each item, using the same structure as the Shop page
  for (let i = 0; i < favoriteArr.length; i++) {
    const item = favoriteArr[i];

    // Create a card element
    const card = document.createElement("div");
    card.className = "product-card";

    // Set the inner HTML of the card with the item details
    card.innerHTML = `
      <img src="${item.img}" alt="Saved Item">
      <img src="img/heart-solid.png" class="heart-outline" onclick="deleteItem(${i})">
      <div class="card-details">
        <p class="price">$120.00</p>
      </div>
    `;

    favGrid.appendChild(card);
  }
}
// Function to delete an item from favorites
function deleteItem(index) {
  const favoritesData = localStorage.getItem("favorites");
  let favoriteArr = JSON.parse(favoritesData);

  // Remove the item from the array
  favoriteArr.splice(index, 1);

  // Update localStorage and re-render the favorites
  localStorage.setItem("favorites", JSON.stringify(favoriteArr));
  renderFavorites();
}

// Initial render of favorites on page load
renderFavorites();
