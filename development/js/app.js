document.addEventListener("DOMContentLoaded", function(){

// Close alerts on main desktop
const btnClose = document.querySelectorAll(".btn-edit");

btnClose.forEach(function(btn){

  btn.addEventListener("click", function(){

    this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
  
  });

})

// Toggle visible class when adding recipe
const addRecipe = document.querySelector(".app-add-recipe");
const btnRecipe = document.querySelector(".btn-add-recipe");
btnRecipe.addEventListener("click", function(){
  addRecipe.classList.remove("visible");
  dashboard.classList.add("visible");
})

// Toggle visible class when adding plan
const btnPlan = document.querySelector(".btn-add-plan");
const addPlan = document.querySelector(".app-add-plan");
btnPlan.addEventListener("click", function(){
  addPlan.classList.remove("visible");
  dashboard.classList.add("visible");
})

// Toggle klasy visible żeby dodać planu
const savePlan = document.querySelector("#savePlan");
savePlan.addEventListener("click", function (){
  addPlan.classList.add("visible");
  dashboard.classList.remove("visible");
})

// Toggle klasy visible po dodaniu planu
const saveRecipe = document.querySelector("#saveRecipe");
saveRecipe.addEventListener("click", function (){
  addRecipe.classList.add("visible");
  dashboard.classList.remove("visible");
})

// Set variables for first-entry
const form = document.querySelector(".welcome-section__form");
const user = document.querySelector(".user");
const input = form.querySelector(".welcome-section__form--input");
const dashboard = document.querySelector(".dashboard-section");
const errorMessage = document.querySelector(`.error-message`);
const welcome = document.querySelector(".welcome-section");

if (localStorage.getItem("savedName") === null) {
  // Default: Submit event on first-entry - validate form, save name to localStorage
  form.addEventListener('submit', function(e){
    e.preventDefault()
    const userName = `${input.value}`;  
    if (  userName.match("^[0-9]*$") || userName == "" ) {  
      errorMessage.innerText = "Twoje imię jest za krótkie lub jest liczbą";
      
      return;
    }

    localStorage.setItem('savedName', userName);
    user.innerText = localStorage.savedName;
    form.parentElement.parentElement.removeChild(form.parentElement);
    dashboard.classList.remove('visible');
  });

} else {
  console.log(localStorage.getItem("savedName"));
  welcome.classList.add("visible");
  dashboard.classList.remove("visible");
  user.innerText = localStorage.savedName;
}

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

// const renderRecipesBtn = document.getElementById("renderRecipes");

const allRecipes = [];


// obiekt przepisu
const newRecipe = {
  title: "", // nazwa przepisu
  description: "", // opis przepisu
  ingredients: [], // składniki przepisu
  instructions: [],
};

clearAllBtn.addEventListener("click", function(e) {
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
  // newRecipe.id = allRecipes.length++;

  let countR = 2;

  if (localStorage.getItem("recipes") != null) {
      
    allRecipies.forEach( function(){
      newRecipe.id = countR++; // id planu
    })
  
  } else {
    newRecipe.id = 1; // id planu
  }

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

// // Delete ingredient from ingredient list
$("#newIngredients").on("click", ".fa-trash-alt",  function() {

  $(this).parent("li").slideUp(function() { // slide up li

    $(this).remove(); // delete li

  });

});

// // Delete instruction from ingredient list
$("#newInstructions").on("click", ".fa-trash-alt",  function() {

  $(this).parent("li").slideUp(function() { 
    $(this).remove(); 
  });

});




// Edit ingredient from ingredients list
$("#newIngredients").on("click", ".fa-edit",  function(e) {
  $input = $("input#ingredient:text")
 
  $(this).parent("li").val(function() { 
    $(this).find("span").text(`${$input.val()}`);
  });

});

// Edit instruction from instructions list
$("#newIngredients").on("click", ".fa-edit",  function(e) {
  $input = $("#insgredient")
    
  $(this).parent("li").val(function() { 
    $(this).find("span").text(`${$input.val()}`);
  });

});

// Edit ingredient from ingredients list
$("#newInstructions").on("click", ".fa-edit",  function(e) {
  $input = $("#instruction")
 
  $(this).parent("li").val(function() { 
    $(this).find("span").text(`${$input.val()}`);
  });

});
// // Set variables for plans

// Plan title
const titlePlan = document.getElementById("titlePlan");
// Description title
const descriptionPlan = document.getElementById("descriptionPlan");
// Week number
const weekNumber = document.getElementById("weekNumber");
const allPlans = document.getElementById("allPlans");
const renderPlans = document.querySelector("#renderPlans");


// Save plan
var planForm = document.querySelector(".planForm");


Schedule.prototype.saveToLocalStorage = function(newObject) {

    let plansFromLocalStorage = [];
    if (localStorage.getItem("plans") != null) {
      plansFromLocalStorage = JSON.parse(localStorage.getItem("plans"));
      plansFromLocalStorage.push(newObject);
      localStorage.setItem("plans", JSON.stringify(plansFromLocalStorage));
    } else {
      plansFromLocalStorage.push(newObject);
      localStorage.setItem("plans", JSON.stringify(plansFromLocalStorage));
    }
  alert("Plan zapisany do localStorage");
  return;
}



const selectRecipe = document.querySelectorAll(".selectionFood");
const allRecipies = JSON.parse(localStorage.getItem('recipes'));
// Add recipies as options in select
selectRecipe.forEach( function(f){
  const newSelect= document.createElement("select");

  allRecipies.forEach(function(singleRecipe) {
      const newOption = document.createElement("option");
      newOption.innerHTML = singleRecipe.title;
      newOption.value = singleRecipe.title;
      newSelect.appendChild(newOption);
  });

  f.appendChild(newSelect); 
});

// przygotowanie globalnej zmiennej przechowującej wszystkie plany
var allPlanns = [];

// Pobiera wartości z localStorage
var localPlans = JSON.parse( localStorage.getItem("plans") );
// console.log(localPlans);


// Konstruktor Schedule
function Schedule(id, weekNumber, title, description) {

  this.titlePlan = ""; // nazwa planu
  this.descriptionPlan = ""; // opis planu
  this.weekNumber = 0; // numer tygodnia do którego przypisany jest plan
  this.monday = []; // plan na poniedzialek
	this.tuesday = []; // plan na wtorek
	this.wednesday = []; // plan na środę
  this.thursday = []; // plan na czwartek
	this.friday = []; // plan na piątek
	this.saturday = []; // plan na sobotę
	this.sunday = []; // plan na niedzielę	
}

// Pobiera wartości selekt
var newMonday = document.querySelectorAll(".selectFood.monday .selectionFood select");
var newTuesday = document.querySelectorAll(".selectFood.tuesday .selectionFood select");
var newWednesday = document.querySelectorAll(".selectFood.wednesday .selectionFood select");
var newThursday = document.querySelectorAll(".selectFood.thursday .selectionFood select");
var newFriday = document.querySelectorAll(".selectFood.friday .selectionFood select");
var newSaturday = document.querySelectorAll(".selectFood.saturday .selectionFood select");
var newSunday = document.querySelectorAll(".selectFood.sunday .selectionFood select");

// Zapisuje plan i tworzy nowy 
planForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  var newSchedule = new Schedule(); 

  let count = 2;

  if (localStorage.getItem("plans") != null) {
      
    localPlans.forEach( function(){
      newSchedule.id = count++; // id planu
    })
  
  } else {
    newSchedule.id = 1; // id planu
  }

  newSchedule.titlePlan = titlePlan.value;
  newSchedule.descriptionPlan = descriptionPlan.value;
  newSchedule.weekNumber = weekNumber.value;

  newMonday.forEach(function(el){
    newSchedule.monday.push(el.value);
  })
  newTuesday.forEach(function(el){
    newSchedule.tuesday.push(el.value);
  })
  newWednesday.forEach(function(el){
    newSchedule.wednesday.push(el.value);
  })
  newThursday.forEach(function(el){
    newSchedule.thursday.push(el.value);
  })
  newFriday.forEach(function(el){
    newSchedule.friday.push(el.value);
  })
  newSaturday.forEach(function(el){
    newSchedule.saturday.push(el.value);
  })
  newSunday.forEach(function(el){
    newSchedule.sunday.push(el.value);
  })

  newSchedule.saveToLocalStorage(newSchedule);
  allPlanns.push(newSchedule);

  location.reload();

  titlePlan.value = "";
  descriptionPlan.value = "";
  weekNumber.value = "";



});

  var currentWeek = document.querySelector("#currentWeekNumber");
  // Pobiera wartości td do tabelki
  var nMonday = document.querySelectorAll(".displayFood .display__monday span");
  var nTuesday = document.querySelectorAll(".displayFood .display__tuesday span");
  var nWednesday = document.querySelectorAll(".displayFood .display__wednesday span");
  var nThursday = document.querySelectorAll(".displayFood .display__thursday span");
  var nFriday = document.querySelectorAll(".displayFood .display__friday span");
  var nSaturday = document.querySelectorAll(".displayFood .display__saturday span");
  var nSunday = document.querySelectorAll(".displayFood .display__sunday span");

  function displayPlan (counter) {
    
    // Przpisuje  wartości z tablicy monday do tabelki
    nMonday.forEach(function(el, index){
      el.innerText = localPlans[counter].monday[index];
      console.log(localPlans[counter].weekNumber)
    })
    // Przpisuje  wartości z tablicy tuesdayy do tabelki
    nTuesday.forEach(function(el, index){
      el.innerText = localPlans[counter].tuesday[index];
    })
    nWednesday.forEach(function(el, index){
      el.innerText = localPlans[counter].wednesday[index];
    })
    nThursday.forEach(function(el, index){
      el.innerText = localPlans[counter].thursday[index];
    })
    nFriday.forEach(function(el,index){
      el.innerText = localPlans[counter].friday[index];
    })
    nSaturday.forEach(function(el,index){
      el.innerText = localPlans[counter].saturday[index];
    })
    nSunday.forEach(function(el,index){
      el.innerText = localPlans[counter].sunday[index];
    })

  }

  var allWeeks = [];
  localPlans.forEach( function(el, index){
    console.log(el.weekNumber);
    allWeeks.push(el.weekNumber);
  })

  let counter = 0;
  let week = allWeeks[counter];
  displayPlan(counter);
  currentWeek.innerText = allWeeks[counter];

  const prevPlan = document.querySelector('.prevPlan');
  const nextPlan = document.querySelector('.nextPlan');
  
  prevPlan.addEventListener("click", function(){
    counter--;
    week = allWeeks[counter];
    displayPlan(counter);
    currentWeek.innerText = week;

  })
  
  nextPlan.addEventListener("click", function(){
    counter++;
    week = allWeeks[counter];
    displayPlan(counter);
    currentWeek.innerText = week;
  })



  var recipiesCount = document.querySelector(".recipiesCount");


  recipiesCount.innerText = allRecipies.length;

});


