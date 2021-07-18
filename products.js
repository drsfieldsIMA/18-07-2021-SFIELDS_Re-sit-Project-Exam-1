import { getExistingFavs } from "./components/common/favFunctions.js";
import  displayMessage  from "./components/common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import createMenu from "./components/common/createMenu.js"
import searchProducts from "./utils/searchProducts.js"
import { clickFunctions } from "./components/common/clickFunctions.js";
/////////////////////////////////////////////////////////////////////////////
// 1st part of this function  renders the HTML blocks for the wishlist (favourites) array

const token = getToken();


createMenu();
const productsUrl = "http://localhost:1337/" + "products";

async function getProducts(productsUrl) {

    try{

       const response = await fetch("http://localhost:1337/products");
        const json = await response.json(); 
//        console.log(json)    
        const productContainer = document.querySelector(".product-container");
         productContainer.innerHTML="";
// Check that the user has selected her/his favourite products
if (json.length === 0) {
    displayMessage("error", "No products yet", ".product-container");
}

json.forEach(function(product) {

//console.log(product)
 const variable = !product.image_url ? dummy_car.svg : product.image_url;

 const favourites = getExistingFavs();
 let cssClass = "far";

// does the product id exist in the favs array
const doesObjectExist = favourites.find(function (fav) {

return parseInt(fav.id) === product.id;
})

// if there is in the array, change the style of the i element
if (doesObjectExist) {
cssClass = "fa";
}

productContainer.innerHTML += ` <div class="col-md-6 col-lg-4">
                                         <div class="card">
                                                 <div class="card-body">
                                                 <i class="fas fa-cart-plus ${cssClass}" data-id="${product.id}" data-url="${variable}" data-title="${product.title}" data-manufacturer="${product.manufacturer}" data-price="${product.price}""></i>
                                                 <div class="embed-responsive embed-responsive-4by3" style="background-image: url(./public/uploads/${product.image_url}); background-size: cover;"></div>
                                                    <h5 class="card-title">${product.title}</h5>
                                                    <div class="card-bottom">
                                                    <p class="card-text">${product.description}</p>
                                                    </div>
                                                     <a href="detail.html?$ID=${product.id}" class="btn btn-primary">Details</a>
                                                    </div>
                                                </div>
                                            </div>`
});
                                    const container = document.querySelector(".product-container");
                                    const search = document.querySelector(".search");
                                    
                                    const favourites = getExistingFavs(); 
                                    searchProducts(json, favourites, productContainer);
                                }
    catch  (error) {
 //       console.log(error);
        displayMessage("error", error, ".product-container");
        }

        const favButtons = document.querySelectorAll("i");
        //  Allow user interation for the user to put the items in a wishlist
        clickFunctions(favButtons);

}

getProducts(productsUrl);

// document.querySelector(".reset").addEventListener("click", (event) => {getProducts(productsUrl); });
// After clicking reset clear the local storage
// After clicking reset change the placeholder//
document.querySelector(".reset").addEventListener("click", (event) => document.getElementById("search").value = 'Input a car');
// After clicking reset (back to the starting array) re-do the HTML rendering from the beginning 
document.querySelector(".reset").addEventListener("click", (event) => { getProducts(productsUrl); });