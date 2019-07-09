document.addEventListener("DOMContentLoaded", function(){

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




});
