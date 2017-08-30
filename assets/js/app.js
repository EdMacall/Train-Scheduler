
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

    
    // Create a variable to reference the database.
    var database = firebase.database();
    // Initial Values
    var trainName = "";
    var destination = "";
    var startTime = "";
    var frequency = "";
    var tableBody = $("#data-info");
    
    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();
      // Grabbed values from text boxes
      trainName   = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      frequency   = $("#frequency").val().trim();
      startTime   = $("#start-time").val().trim();

      console.log("I got " + trainName + ", " + destination + ", " + frequency + ", " + startTime);
      // Code for handling the push
      database.ref().push({
        trainName:   trainName,
        destination: destination,
        frequency:   frequency,
        startTime:   startTime,
        dateAdded:   firebase.database.ServerValue.TIMESTAMP
      });
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

    var myTrains = [];

    $(document).ready(function(snapshot){
      console.log("I dont know what to do.");

        database.ref().on("value", function(snapshot){
          console.log("This is what I got.");
          console.log(snapshot.numChildren());
          console.log(snapshot);
          console.log(snapshot.val());
          myTrains = snapshot.toJSON();
          console.log(myTrains);
          console.log(snapshot.numChildren());
          console.log(snapshot[0]);
          console.log(snapshot[1]);
          console.log("Thats all there is.  There aint no more."); 
        });


    });
