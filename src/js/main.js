import { setLocalStorage } from "./utils.mjs";
import { findProductByName } from "./productData.mjs";

function getCurrentProductName(event){
    let productNameElements = event.currentTarget.getElementsByClassName("card__name");
    let productName = productNameElements[0].innerHTML;
    return productName;
}

async function openGenericProductPage(event) {
    try{
        let productName = getCurrentProductName(event);
        let product = await findProductByName(productName);

        setLocalStorage("ls-productDetails", product);

        // simulate a mouse click to redirect to generic product page
        window.location.href = "../product_pages/generic-product.html";
    }catch (error) {
        alert(`Error Name: ${error.name} \nError Message: ${error.message}`);
    }
}

// add listener to product cards
const productCards = document.querySelectorAll('li.product-card > a');

productCards.forEach(productCard => {
    productCard.addEventListener('click', openGenericProductPage);
});