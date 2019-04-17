 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyARuKSknQ3ocLvc19Xlx80hs7UFLPFn1sk",
  authDomain: "trainscheduler-db122.firebaseapp.com",
  databaseURL: "https://trainscheduler-db122.firebaseio.com",
  projectId: "trainscheduler-db122",
  storageBucket: "trainscheduler-db122.appspot.com",
  messagingSenderId: "749091584905"
};
firebase.initializeApp(config);

var trainData = firebase.database();

// 2. Button for adding trains
$("#addTrainBtn").on("click", function (event) {
  // event.preventDefault();
  event.preventDefault();
  // Grabs user input
  var trainName = $("#nameAdaTrain").val().trim();
  var destination = $("#destInput").val().trim();
  var firstTrain = moment($("#firstTrip").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#freqInput").val().trim();
  
 console.log(firstTrain);

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to the database
  trainData.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#nameAdaTrain").val("");
  $("#destInput").val("");
  $("#firstTrip").val("");
  $("#freqInput").val("");

  });

// 3. Create Firebase event for adding train to the database and a row in the html when admin adds a train
trainData.ref().on("child_added", function (childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;


  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes, "m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

  // Convert first train time
  // var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  // console.log(firstTrainConverted);

  // var currentTime = moment();
  // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime);

  // var tRemainder = diffTime % trainFreq;
  // console.log(tRemainder);

  //  Add minutes until train code
  // var tMinutesToTrain = trainFreq - tRemainder;
  // console.log("MINUTES UNTIL TRAIN: " + tMinutesToTrain);

  // Next Arrival
  // var nextTrain = moment().add(tMinutesToTrain, "minutes");
  // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Calculate the other departure times



  //  Create, populate, and append new row with single line of jQuery

  $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");


  // Create the new row
  
  // $("#trainTable > tbody").append(
  // $("<tr>").append(
  //   $("<td>").text(name),
  //   $("<td>").text(destination),
  //   $("<td>").text(frequency),
  //   $("<td>").text(arrival),
  //   $("<td>").text(minutes),
  // )
  // );

});
