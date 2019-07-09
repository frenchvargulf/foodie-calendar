var user = document.querySelector(".user")
user.innerText = localStorage.savedName;

// Wypisuje wszystkie plany

  function renderAllPlans() {
    
    var allPlams = JSON.parse( localStorage.getItem("plans") );
    console.log(allPlams)
    var newList = document.querySelector(".all-plans__list");

    allPlams.forEach(function(singlePlan) {
      var newLi = document.createElement("LI");
      newLi.classList.add("app-show");

      var newId = document.createElement('div');
      newId.innerHTML = `${singlePlan.id}`;
      newId.classList.add("id");
      newLi.appendChild(newId);

      var newTitle = document.createElement('div');
      newTitle.innerHTML = singlePlan.titlePlan;
      newTitle.classList.add("title");
      newLi.appendChild(newTitle);

      var newDescription = document.createElement("DIV");
      newDescription.innerHTML = `${singlePlan.descriptionPlan}`;
      newDescription.classList.add("description");
      newLi.appendChild(newDescription);

      var newWeek= document.createElement("DIV");
      newWeek.innerHTML = `${singlePlan.weekNumber}`;
      newWeek.classList.add("week")
      newLi.appendChild(newWeek);

      var newActions = document.createElement('div');
      newActions.classList.add("action");

      var newEditBtn = document.createElement("i");
      newEditBtn.classList.add("fas");
      newEditBtn.classList.add("fa-edit");

      var newDeleteBtn = document.createElement("i");
      newDeleteBtn.classList.add("far");
      newDeleteBtn.classList.add("fa-trash-alt");

      // Delete ingredient from ingredient list
      newDeleteBtn.addEventListener("click", function(){
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      })

      newActions.appendChild(newEditBtn);
      newActions.appendChild(newDeleteBtn);

      newLi.appendChild(newActions);

      // singleRecipe.ingredients.forEach(function(ingredient) {
      //   var newRecipeLi = document.createElement("LI");
      //   newRecipeLi.innerHTML = ingredient;
      //   ingredientsUl.appendChild(newRecipeLi);
      // });

      // singleRecipe.instructions.forEach(function(instruction) {
      //   var newRecipeLi = document.createElement("LI");
      //   newRecipeLi.innerHTML = instruction;
      //   instructionsUl.appendChild(newRecipeLi);
      // });

      newList.appendChild(newLi);
      
    });
  }
  

  renderAllPlans() ;


// Toggle visible class when adding plan
const btnPlan = document.querySelector(".icon-show-plan");
const addPlan = document.querySelector(".app-add-plan");
const showPlan = document.querySelector(".app-show-plan");
btnPlan.addEventListener("click", function(){
  addPlan.classList.remove("visible");
  showPlan.classList.add("visible");
})


