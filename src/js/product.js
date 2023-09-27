import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getLocalStorage } from "./utils.mjs";

function addProductToCart(product) {
  try {
    // Get the current cart items from local storage or initialize an empty array
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
  } catch (error) {
    alert(`Error Name: ${error.name} \nError Message: ${error.message}`);
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Retrieve the product details from the storage
let productDetails = JSON.parse(localStorage.getItem("ls-productDetails"));

if (productDetails == null || productDetails === 'undefined') {
  document.querySelector(`#current-product-details`).innerHTML = `<h2>Product details empty!</h2>
                                                                  <p>Please contact the support team<\p>`
}else{
  document.querySelector(`#current-product-details`).innerHTML = `<h3>${productDetails.Brand.Name}</h3>
  <h2 class="divider">${productDetails.NameWithoutBrand}</h2>

  <img
    class="divider"
    src=${productDetails.Image}
    alt=${productDetails.NameWithoutBrand}
  />

  <p class="product-card__price">${productDetails.FinalPrice}</p>

  <p class="product__color">${productDetails.Colors[0].ColorName}</p>

  <p class="product__description">${productDetails.DescriptionHtmlSimple}</p>

  <div class="product-detail__add">
    <button id="addToCart" data-id=${productDetails.Id}>Add to Cart</button>
  </div>`
}


// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);