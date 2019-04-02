

// 1. Initialize Firebase
var config = {
  apiKey: 
  authDomain: 
  databaseURL: 
  storageBucket: 
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destCity = $("#destCity-input").val().trim();
  var firstTrain = moment($("#first-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    city: destCity,
    first: firstTrain,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.city);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destCity-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when admin adds a train
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destCity = childSnapshot.val().city;
  var firstTrain = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;

  // Employee Info
  console.log(trainName);
  console.log(destCity);
  console.log(firstTrain);
  console.log(trainFreq);

  // Prettify the first train
  var firstTrainPretty = moment.unix(firstTrain).format("MM/DD/YYYY");

  

  // Calculate the other departure times
 

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empRole),
    $("<td>").text(empStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(empRate),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});


