import { clickFunctions } from "../components/common/clickFunctions.js";
import { getExistingFavs } from "../components/common/favFunctions.js";
import  displayMessage  from "../components/common/displayMessage.js";
import renderCarCards from "./renderCarCards.js";
/////////////////////////////////////////////////////////////////////////////
// 1st part of this function filters out the items above the maximum price value inputted by the user 
export default  function searchProducts(items, favourites, productContainer) {
    const search = document.querySelector(".search");

    search.onkeyup = function (event) {
        console.log(event.value)
        console.log("yes")
        productContainer.innerHTML = "";
        //       const searchValue = event.target.value.trim().toLowerCase();
        //        Extract the numerical value from the string in the users search field
        const searchTerm = event.target.value.trim().toLowerCase();
         
        const n = searchTerm;
        console.log("n", n)
        console.log("items",items)
        let i=0;
        const filteredProducts=items.filter(function(items){
             console.log(items.title)
             let str_1=items.title.trim().toLowerCase();
             console.log(str_1)
             let str_2 = str_1.replace(/\./g,"");
             console.log(str_2)
             let str_3 = str_2.replace(/ /g,"");
             let str_4 = str_1.replace(/ /g,"");
             if ((str_1.indexOf(n) >= 0) || (str_2.indexOf(n) >= 0) || (str_3.indexOf(n) >= 0) || (str_4.indexOf(n) >= 0) ) {
                 return true
        }});

             console.log(filteredProducts)

        //        filter the items of the full array from the api call to become a new array of filtered
        //        products  
        // const filteredProducts = items.filter(function (items) {

        //     //         Boolean statement to make sure the items are less than the upper limit
        //     if (items.price < upLimit) {
        //         //                console.log(items.price);
        //         return true;
        //     }
        // });

        if (filteredProducts.length < 1){
            displayMessage("message", "Dratt no products where found at this price. Press Reset.", ".product-container");
        }
        else{
        /////////////////////////////////////////////////////////////////////////////
        // 2nd Part of this function allows us to perform the wish list selection after rendering the new filtered array with HTML         

        const productContainer = document.querySelector(".product-container");

        productContainer.innerHTML = ""; 

        renderCarCards(filteredProducts,favourites,productContainer)

        const favButtons = document.querySelectorAll("i");

        clickFunctions(favButtons);
        }

    };
}


// After clicking reset change the placeholder//
document.querySelector(".reset").addEventListener("click", (event) => document.getElementById("search").value = 'Input a car');
// After clicking reset (back to the starting array) re-do the HTML rendering from the beginning 