document.addEventListener("DOMContentLoaded", function(){
  var user = document.querySelector(".user")
  user.innerText = localStorage.savedName;

  // pola input
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  var ingredient = document.getElementById("ingredient");
  var instruction = document.getElementById("instruction");

  // lista nowych składników
  var newIngredientsList = document.getElementById("newIngredients");
  // lista nowych instruckji
  var newInstructionsList = document.getElementById("newInstructions");

  // div zawierający wszystkie przepisy
  var allRecipesContainer = document.getElementById("allRecipes");

  // przyciski
  var addIngredientBtn = document.getElementById("addIngredient");
  var addInstructionBtn = document.getElementById("addInstruction");
  var saveRecipeBtn = document.getElementById("saveRecipe");
  var clearAllBtn = document.getElementById("clearAll");
  var renderRecipesBtn = document.getElementById("renderRecipes");

  // obiekt przepisu
  var newRecipe = {
    title: "", // nazwa przepisu
    description: "", // opis przepisu
    ingredients: [], // składniki przepisu
    instructions: [],
  };

  clearAllBtn.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    allRecipesContainer.innerHTML = "";
    alert("localStorage wyczyszczone");
  });

  renderRecipesBtn.addEventListener("click", renderAllRecipes);

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
    e.preventDefault();
    newRecipe.title = title.value;
    newRecipe.description = description.value;
    saveRecipeToLocalStorage(newRecipe);
    title.value = "";
    description.value = "";
    instruction.value = "";
    ingredient.value = "";
  });

  function renderSingleIngredient(ingredient) {
    var newLi = document.createElement("LI");

    var span = document.createElement("span");
    span.innerText = ingredient;

    var newEditBtn = document.createElement("i");
    newEditBtn.classList.add("fas");
    newEditBtn.classList.add("fa-edit");

    var newDeleteBtn = document.createElement("i");
    newDeleteBtn.classList.add("far");
    newDeleteBtn.classList.add("fa-trash-alt");
    
    // var newCloneBtn = document.createElement("i");
    // newCloneBtn.classList.add("far");
    // newCloneBtn.classList.add("fa-clone");
    newLi.appendChild(span);
    newLi.appendChild(newEditBtn);
    newLi.appendChild(newDeleteBtn);
    // newLi.appendChild(newCloneBtn);
    
    newIngredientsList.appendChild(newLi);
  }


  function renderSingleInstruction(instruction) {
    var newLi = document.createElement("li");


    var newEditBtn = document.createElement("i");
    newEditBtn.classList.add("fas");
    newEditBtn.classList.add("fa-edit");

    var newDeleteBtn = document.createElement("i");
    newDeleteBtn.classList.add("far");
    newDeleteBtn.classList.add("fa-trash-alt");

    var span = document.createElement("span");
    span.innerText = instruction;
    // var newCloneBtn = document.createElement("i");
    // newCloneBtn.classList.add("far");
    // newCloneBtn.classList.add("fa-clone");
    newLi.appendChild(span);
    newLi.appendChild(newEditBtn);
    newLi.appendChild(newDeleteBtn);

    

    newInstructionsList.appendChild(newLi);
  }

  function saveRecipeToLocalStorage(newObject) {
    var dataFromLocalStorage = [];
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

  function renderAllRecipes() {
    allRecipesContainer.innerHTML = "";
    var allRecipes = JSON.parse(localStorage.getItem("recipes"));
    var newList = document.createElement("oL");

    allRecipes.forEach(function(singleRecipe) {
      var newLi = document.createElement("LI");
      
      newLi.innerHTML = singleRecipe.title;

      var newDescription = document.createElement("DIV");
      newDescription.innerHTML = `${singleRecipe.description}`;
      newLi.appendChild(newDescription);

      var ingredientsUl = document.createElement("UL");
      newLi.appendChild(ingredientsUl);

      var instructionsUl = document.createElement("UL");
      newLi.appendChild(instructionsUl);

      var newEditBtn = document.createElement("i");
      newEditBtn.classList.add("fas");
      newEditBtn.classList.add("fa-edit");

      var newDeleteBtn = document.createElement("i");
      newDeleteBtn.classList.add("far");
      newDeleteBtn.classList.add("fa-trash-alt");

      

      singleRecipe.ingredients.forEach(function(ingredient) {
        var newRecipeLi = document.createElement("LI");
        newRecipeLi.innerHTML = ingredient;
        ingredientsUl.appendChild(newRecipeLi);
      });

      singleRecipe.instructions.forEach(function(instruction) {
        var newRecipeLi = document.createElement("LI");
        newRecipeLi.innerHTML = instruction;
        instructionsUl.appendChild(newRecipeLi);
      });

      newLi.appendChild(newEditBtn);
      newLi.appendChild(newDeleteBtn);
      
      newList.appendChild(newLi);
      allRecipesContainer.appendChild(newList);
    });
  }


  $("#newIngredients").on("click", ".fa-trash-alt",  function() {

        $(this).parent("li").slideUp(function() { //zwijamy LI

            $(this).remove(); //po czym to LI usuwamy

        });
    
  });

  $("#newInstructions").on("click", ".fa-trash-alt",  function() {

    $(this).parent("li").slideUp(function() { //zwijamy LI

        $(this).remove(); //po czym to LI usuwamy

    });

  });

  $("#newIngredients").on("click", ".fa-trash-alt",  function() {

    $(this).parent("li").slideUp(function() { //zwijamy LI

        $(this).remove(); //po czym to LI usuwamy

    });

  });

  $("#newInstructions").on("click", ".fa-edit",  function(e) {
    $input = $("input#instruction:text")
    console.log($input.val())
    
    $(this).parent("li").val(function() { 
      console.log($(this).find("span").text());
      $(this).find("span").text(`${$input.val()}`);
    });


  });

  $("#newIngredients").on("click", ".fa-edit",  function(e) {
    $input = $("input#ingredient:text")
    console.log($input.val())
    
    $(this).parent("li").val(function() { 
      console.log($(this).find("span").text());
      $(this).find("span").text(`${$input.val()}`);
    });


  });

});