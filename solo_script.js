// ! ! !
// Three Bugs

var objectAtticus = {
    name: "Atticus",
    number: "2405",
    salary: "47000",
    rating: 3
};

var objectJem = {
    name: "Jem",
    number: "62347",
    salary: "63500",
    rating: 4};

var objectBoo = {
    name: "Boo",
    number: "11435",
    salary: "54000",
    rating: 3};

var objectScout = {
    name: "Scout",
    number: "6243",
    salary: "74750",
    rating: 5};

var array = [objectAtticus, objectJem, objectBoo, objectScout];

//Create variables used to write to the DOM
var newEl, newText, position;

//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
    //console.log("first loop: " + array[i]);
  	array[i] = calculateSTI(array[i]);          // Bug 1: need to add index so only sending in a 1D array
    //console.log("first loop: " + array[i]);
   	newEl = document.createElement('li');
    //add some space between array elements
    array[i] = array[i].join(", ")
    console.log(array[i]);
  	newText = document.createTextNode(array[i]);
  	newEl.appendChild(newText);
  	position.appendChild(newEl);
}

function calculateSTI(personObject){
    var newArray = [];

    newArray[0] = personObject.name;

    var employeeNumber = personObject.number;
    var baseSalary = personObject.salary;
    var reviewScore = parseInt(personObject.rating);
  //console.log("top of CalcSTI: " + newArray[0] + " " + employeeNumber + " " + baseSalary + " " + reviewScore);

    var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
    if(bonus > 0.13){
        bonus = 0.13;
    }

    newArray[1] = bonus;
    newArray[2] = Math.round(baseSalary * (1.0 + bonus));       //bug 2: this needs to be an integer 
    newArray[3] = Math.round(baseSalary * bonus);
    //console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);

    return newArray;
}

function getBaseSTI(reviewScore){
    var basePercent;
    switch(reviewScore){
      case 1:
          basePercent = 0;
          break;
      case 2:
          basePercent = 0;
          break;
      case 3:
          basePercent = 0.04;
          break;
      case 4:
          basePercent = 0.06;
          break;
      case 5:
          basePercent = 0.10;
          break;
    }
    return basePercent; //basePercent - 1;    Bug 3: don't subtract 1
}

function getYearAdjustment(employeeNumber){
    var yearAdjustment = 0;
    if(employeeNumber.length == 4){
        yearAdjustment = 0.05;
    }
    return yearAdjustment;
}

function getIncomeAdjustment(salary){
    var incomeAdjustment = 0;
    salary = parseInt(salary);
    if(salary > 65000){
        incomeAdjustment = 0.01;
    }
    return incomeAdjustment;
}