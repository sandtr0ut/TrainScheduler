

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyARuKSknQ3ocLvc19Xlx80hs7UFLPFn1sk",
  authDomain: "trainscheduler-db122.firebaseapp.com",
  databaseURL: "https://trainscheduler-db122.firebaseio.com",
  projectId: "trainscheduler-db122",
  storageBucket: "trainscheduler-db122.appspot.com",
  messagingSenderId: "749091584905"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destCity = $("#destCity-input").val().trim();
  var firstTrain = moment($("#firstTime-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#freq-input").val().trim();

  var now = moment();
  console.log(now);
  
  
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
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when admin adds a train
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destCity = childSnapshot.val().city;
  var firstTrain = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(destCity);
  console.log(firstTrain);
  console.log(trainFreq);

  // Convert first train time
  var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  console.log(firstTrainConverted);
  
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  
  var tRemainder = diffTime % trainFreq;
  console.log(tRemainder);
  
  //  Add minutes until train code
  var tMinutesToTrain = trainFreq - tRemainder;
  console.log("MINUTES UNTIL TRAIN: " + tMinutesToTrain);
  
  // Next Arrival
  var nextTrain = moment().add(tMinutesToTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Calculate the other departure times
 

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destCity),
    $("<td>").text(trainFreq),
    $("<td>").text(empMonths),
    $("<td>").text(empRate),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


