var user = document.querySelector(".user")
user.innerText = localStorage.savedName;

function renderAllRecipes() {
   
    var allRecipes = JSON.parse(localStorage.getItem("recipes"));
    var newList = document.querySelector(".all-recipes__list");

    allRecipes.forEach(function (singleRecipe) {
        var newLi = document.createElement("LI");

        // newLi.innerHTML = singleRecipe.title;

        var newID = document.createElement("DIV");
        newID.innerHTML = `${singleRecipe.id}`;
        newLi.appendChild(newID);
        newID.classList.add("id");

        var newTitle = document.createElement("DIV");
        newTitle.innerHTML = `${singleRecipe.title}`;
        newLi.appendChild(newTitle);
        newTitle.classList.add("title");

        var newDescription = document.createElement("DIV");
        newDescription.innerHTML = `${singleRecipe.description}`;
        newLi.appendChild(newDescription);
        newDescription.classList.add("description");

        // var ingredientsUl = document.createElement("UL");
        // newLi.appendChild(ingredientsUl);

        // var instructionsUl = document.createElement("UL");
        // newLi.appendChild(instructionsUl);

        var actionBox = document.createElement("DIV");
        newLi.appendChild(actionBox);
        actionBox.classList.add("action");


        var newEditBtn = document.createElement("i");
        newEditBtn.classList.add("fas");
        newEditBtn.classList.add("fa-edit");

        var newDeleteBtn = document.createElement("i");
        newDeleteBtn.classList.add("far");
        newDeleteBtn.classList.add("fa-trash-alt");

        actionBox.appendChild(newEditBtn);
        actionBox.appendChild(newDeleteBtn);

        newDeleteBtn.addEventListener("click", function () {


            $(this).parent(actionBox).parent(newLi).remove(); 

        });



        // singleRecipe.ingredients.forEach(function (ingredient) {
        //     var newRecipeLi = document.createElement("LI");
        //     newRecipeLi.innerHTML = ingredient;
        //     ingredientsUl.appendChild(newRecipeLi);
        // });

        // singleRecipe.instructions.forEach(function (instruction) {
        //     var newRecipeLi = document.createElement("LI");
        //     newRecipeLi.innerHTML = instruction;
        //     instructionsUl.appendChild(newRecipeLi);
        // });


        newList.appendChild(newLi);
        
    });
    
};

renderAllRecipes();


// Toggle visible class when adding recipe
const addRecipe = document.querySelector(".app-add-recipe");
const btnRecipe = document.querySelector(".btn-add-recipe");
const display = document.querySelector(".app-show-recipe")

// addRecipe.classList.add("visible");

btnRecipe.addEventListener("click", function(e){
    e.preventDefault()
    addRecipe.classList.remove("visible");
    display.classList.add("visible");
  
})