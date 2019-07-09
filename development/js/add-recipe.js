// // Save recipe to LocalStorage Name

// // Set variables for saving recipies
const title = document.getElementById("title");
const description = document.getElementById("description");
const ingredient = document.getElementById("ingredient");
const instruction = document.getElementById("instruction");
const newIngredientsList = document.getElementById("newIngredients");
const newInstructionsList = document.getElementById("newInstructions");
// const dashboard = document.querySelector(".dashboard-section");

// // przyciski
const addIngredientBtn = document.getElementById("addIngredient");
const addInstructionBtn = document.getElementById("addInstruction");
const saveRecipeBtn = document.getElementById("saveRecipe");
const clearAllBtn = document.getElementById("clearAll");
const renderRecipesBtn = document.getElementById("renderRecipes");

const allRecipes = JSON.parse(localStorage.getItem('recipes'));

// obiekt przepisu
const newRecipe = {
  id: allRecipes.length++,
  title: "", // nazwa przepisu
  description: "", // opis przepisu
  ingredients: [], // składniki przepisu
  instructions: [],
};

clearAllBtn.addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.clear();
  // allRecipesContainer.innerHTML = "";
  alert("localStorage wyczyszczone");
});

addIngredientBtn.addEventListener("click", function(e) {
  e.preventDefault();
  newRecipe.ingredients.push(ingredient.value);
  renderSingleIngredient(ingredient.value);
  ingredient.value = "";
});

addInstructionBtn.addEventListener("click", function(e) {
  e.preventDefault();
  newRecipe.instructions.push(instruction.value);
  renderSingleInstruction(instruction.value);
  instruction.value = "";
});

saveRecipeBtn.addEventListener("click", function(e) {
  newRecipe.title = title.value;
  newRecipe.description = description.value;
  saveRecipeToLocalStorage(newRecipe);
  title.value = "";
  description.value = "";
  instruction.value = "";
  ingredient.value = "";
});


function renderSingleIngredient(ingredient) {
  const newLi = document.createElement("LI");

  const span = document.createElement("span");
  span.classList.add("ingredient-span");
  span.innerText = ingredient;

  const newEditBtn = document.createElement("i");
  newEditBtn.classList.add("fas");
  newEditBtn.classList.add("fa-edit");

  const newDeleteBtn = document.createElement("i");
  newDeleteBtn.classList.add("far");
  newDeleteBtn.classList.add("fa-trash-alt");

  newLi.appendChild(span);
  newLi.appendChild(newEditBtn);
  newLi.appendChild(newDeleteBtn);
    
  newIngredientsList.appendChild(newLi);
  
}

function renderSingleInstruction(instruction) {
  const newLi = document.createElement("li");
  

  const newEditBtn = document.createElement("i");
  newEditBtn.classList.add("fas");
  newEditBtn.classList.add("fa-edit");

  const newDeleteBtn = document.createElement("i");
  newDeleteBtn.classList.add("far");
  newDeleteBtn.classList.add("fa-trash-alt");

  const span = document.createElement("span");
  span.classList.add("instruction-span");
  span.innerText = instruction;

  newLi.appendChild(span);
  newLi.appendChild(newEditBtn);
  newLi.appendChild(newDeleteBtn);
  
  newInstructionsList.appendChild(newLi);
}

function saveRecipeToLocalStorage(newObject) {
  let dataFromLocalStorage = [];
  if (localStorage.getItem("recipes") != null) {
    dataFromLocalStorage = JSON.parse(localStorage.getItem("recipes"));
    dataFromLocalStorage.push(newObject);
    localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
  } else {
    dataFromLocalStorage.push(newObject);
    localStorage.setItem("recipes", JSON.stringify(dataFromLocalStorage));
  }
  alert("Przepis zapisany do localStorage");
  
  
  while (newIngredientsList.firstChild) {

    newIngredientsList.removeChild(newIngredientsList.firstChild);

  }

  while (newInstructionsList.firstChild) {

    newInstructionsList.removeChild(newInstructionsList.firstChild);

  }

}

// Delete ingredient from ingredient list
$("#newIngredients").on("click", ".fa-trash-alt",  function() {

  $(this).parent("li").slideUp(function() { // slide up li

    $(this).remove(); // delete li

  });

});

// Delete instruction from ingredient list
$("#newInstructions").on("click", ".fa-trash-alt",  function() {

  $(this).parent("li").slideUp(function() { 
    $(this).remove(); 
  });

});



// // Edit ingredient from ingredients list
// $("#newIngredients").on("click", ".fa-edit",  function(e) {
//   $input = $("input#ingredient:text")
 
//   $(this).parent("li").val(function() { 
//     $(this).find("span").text(`${$input.focus().val()}`);
//   });

// });

// // Edit instruction from instructions list
// $("#newInstructions").on("click", ".fa-edit",  function(e) {
//   $input = $("input#instruction:text")
    
//   $(this).parent("li").val(function() { 
//     $(this).find("span").text( `${$input.focus().val()}` );
//   });

// });




$("#newInstructions").on("click", ".fa-edit", function() {

      if ($(this).prev().hasClass("instruction-span")) {

          $(this).prev().replaceWith(`<input type="text" value="${$(this).prev()

              .text()}" />`);

      }

      else {

          $(this).prev().replaceWith(`<span class="user-name">${$(this).prev()

              .val()}</span>`);


      }

});



$("#newIngredients").on("click", ".fa-edit", function() {

    if ($(this).prev().hasClass("ingredient-span")) {

        $(this).prev().replaceWith(`<input type="text" value="${$(this).prev()

            .text()}" />`);

    }

    else {

        $(this).prev().replaceWith(`<span class="user-name">${$(this).prev()

            .val()}</span>`);


    }

});