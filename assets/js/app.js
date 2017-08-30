
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdCPcAnRFj7Un9fz7VjJWChkgr1vmolFY",
    authDomain: "trainscheduler-426f5.firebaseapp.com",
    databaseURL: "https://trainscheduler-426f5.firebaseio.com",
    projectId: "trainscheduler-426f5",
    storageBucket: "",
    messagingSenderId: "864589888392"
  };
  firebase.initializeApp(config);
//   <script>
//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyBP0Str_or0SRs1lLHZdNvzuYrwRVz_5wA",
//     authDomain: "omgwtf-f54d3.firebaseapp.com",
//     databaseURL: "https://omgwtf-f54d3.firebaseio.com",
//     projectId: "omgwtf-f54d3",
//     storageBucket: "omgwtf-f54d3.appspot.com",
//     messagingSenderId: "26676665903"
//   };
//   firebase.initializeApp(config);

  // var config = {
  //   apiKey: "AIzaSyDo_0cvdj19e-Df1YwatBitSVTT1k0M0vc",
  //   authDomain: "employeerecords-4cf52.firebaseapp.com",
  //   databaseURL: "https://employeerecords-4cf52.firebaseio.com",
  //   projectId: "employeerecords-4cf52",
  //   storageBucket: "employeerecords-4cf52.appspot.com",
  //   messagingSenderId: "757613702597"
  // };
  // firebase.initializeApp(config);
// </script>
    function Train(trainName, destination, startTime, frequency, dateAdded) {
      this.trainName = trainName;
      this.destination = destination;
      this.startTime = startTime;
      this.frequency = frequency;
      this.dateAdded = dateAdded;
    };

    
    // Create a variable to reference the database.
    var database = firebase.database();
    // Initial Values
    var trainName = "";
    var destination = "";
    var startTime = "";
    var frequency = "";
    var tableBody = $("#data-info");
    // var trains    = new Array();
    // trains.push(new Object());
    var train1 = {
        trainName: "Trenton Express",
        destination: "Trenton",
        startTime: "05:35 PM",
        frequency: 25,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      };
    var train2 = {
        trainName: "Oregon Trail",
        destination: "Salem, Oregon",
        startTime: "01:39 PM",
        frequency: 3600,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      };
      var trains = [train1, train2];
      console.log(train1);
      console.log(train2);
      console.log(trains);
    
    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
      // Grabbed values from text boxes
      trainName   = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      frequency   = $("#frequency").val().trim();
      startTime   = $("#start-time").val().trim();

      // console.log("I got " + trainName + ", " + destination + ", " + frequency + ", " + startTime);
      // Code for handling the push
      var train = {
        trainName: trainName,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      };

      console.log(train);
      console.log(trains);

      trains.push(train);
      database.ref().set(trains);
    });
    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      // Console.loging the last user's data
      console.log(sv.trainName);
      console.log(sv.destination);
      console.log(sv.frequency);
      console.log(sv.startTime);


      var tableRow = $("<tr>");

      var trainNameTD = $("<td>");
      trainNameTD.text(sv.trainName);

      var destinationTD = $("<td>");
      destinationTD.text(sv.destination);

      var frequencyTD = $("<td>");
      frequencyTD.text(sv.frequency);

      var startTimeTD = $("<td>");
      startTimeTD.text(sv.startTime);

      tableRow.append(trainNameTD);
      tableRow.append(destinationTD);
      tableRow.append(frequencyTD);
      tableRow.append(startTimeTD);

      $("#data-info").append(tableRow);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



    $(document).ready(function(snapshot){

        database.ref().on("value", function(snapshot){
          trains = snapshot.val();

        });
    });

    function displayTrains() {
      $("#data-info").empty();

      for(var i = 0; i < trains.length; i++) {
        var tableRow = $("<tr>");

        var trainNameTD = $("<td>");
        trainNameTD.text(trains[i].trainName);

        var destinationTD = $("<td>");
        destinationTD.text(trains[i].destination);

        var frequencyTD = $("<td>");
        frequencyTD.text(trains[i].frequency);

        var startTimeTD = $("<td>");
        startTimeTD.text(trains[i].startTime);

        tableRow.append(trainNameTD);
        tableRow.append(destinationTD);
        tableRow.append(frequencyTD);
        tableRow.append(startTimeTD);

        $("#data-info").append(tableRow);
      }

    };
