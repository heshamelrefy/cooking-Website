// let recipesRow = document.getElementById("recipesRow");
// let allRecipes = []; 
// let httpRequ = new XMLHttpRequest();
// httpRequ.open('GET' , 'https://forkify-api.herokuapp.com/api/search?&q=pizza');
// httpRequ.send();
// httpRequ.addEventListener("readystatechange" , function () {
//     if (httpRequ.readyState ==4 && httpRequ.status ==200) {
//         allRecipes = JSON.parse(httpRequ.response).recipes ;
//         displayRequ();
//     }
// })
let recipesRow = document.getElementById("recipesRow");
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let searchResult = document.getElementById("searchResult");
let recipeDetails = document.getElementById("recipeDetails");
let allRecipes = []; 
async function getRecipe(term) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
        apiResponse = await apiResponse.json();
        allRecipes = apiResponse.recipes;
        displayAllRecipes();
}
searchBtn.addEventListener("click" , function () {
    getRecipe(searchInput.value);
})


function displayAllRecipes() {
    cartona = ``;
    for (let i = 0; i < allRecipes.length; i++) {
        let myId = "'"+ allRecipes[i].recipe_id+"'"
        cartona += `<div onclick="allRecipsDetails(${myId})" class="col-md-4">
                 <div class="recipe">
                   <img class="w-100" src="${allRecipes[i].image_url}">
                   <h5 class="color-mine">${allRecipes[i].title}</h5>
                   <p>${allRecipes[i].publisher}</p>
                </div>
              </div>`
        
    }
    searchResult.innerHTML = cartona ;
}

async function allRecipsDetails(id) {
    let allDetails;
    
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    apiResponse = await apiResponse.json();
    allDetails = apiResponse.recipe;
    showRecipes(allDetails);
    
}
function showRecipes(allDetails) {
   let cartona = `
    
    <h4 class = "font-weight-bolder">${allDetails.title}</h4>
    <img src="${allDetails.image_url}" alt="">
    <p>${allDetails.publisher}</p>
    <ul>`
    for (let i = 0; i < allDetails.ingredients.length; i++) {
        cartona +=
        `
        <li class="font-weight-bolder py-2">
        ${allDetails.ingredients[i]}
        </li>
        `
        
    }
    cartona+= `</ul>`;

    recipeDetails.innerHTML = cartona ;
    
    
}






