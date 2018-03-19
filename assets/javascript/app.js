        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyCgzWoqOlrRg11uM0uqJXXA7IS8kI8vgPw",
            authDomain: "train-schedule-16ac2.firebaseapp.com",
            databaseURL: "https://train-schedule-16ac2.firebaseio.com",
            projectId: "train-schedule-16ac2",
            storageBucket: "train-schedule-16ac2.appspot.com",
            messagingSenderId: "974441390295"
        };
        firebase.initializeApp(config);

        // Create a variable to reference the database
        var database = firebase.database();


        $(document).ready(function () {
                event.preventDefault();

                // when we click the submit button 
                // this gets the user input and stores it
                $("#addButton").on("click", function () {
                    // Initial values 
                    var name = $("#name").val().trim();
                    var destination = $("#destination").val().trim();
                    var time = moment($("#time").val().trim(), "HH:mm").subtract(10, "years").format("X");
                    var frequency = $("#frequency").val().trim();


                    // Create local object to temporary hold the train data
                    database.ref().push({
                        name: name,
                        destination: destination,
                        time: time,
                        frequency: frequency,
                        dateAdded: firebase.database.ServerValue.TIMESTAMP
                    });
                    // Push the data to the database


                    // Empty text areas
                    $("#name").val("");
                    $("#destination").val("");
                    $("#time").val("");
                    $("#frequency").val("");

                    // Prevents refreshing
                    return false;
                });




                database.ref().on("child_added", function (snapshot) {


                    // Change the HTML to reflect

                    var databaseName = (snapshot.val().name);

                    var databaseDestination = (snapshot.val().destination);

                    var databaseFrequency = (snapshot.val().frequency);

                    var databaseTime = (snapshot.val().time);



                    var diffTime = moment().diff(moment.unix(databaseTime), "minutes");
                    var timeRemainder = moment().diff(moment.unix(databaseTime), "minutes") % databaseFrequency;
                    var minutes = databaseFrequency - timeRemainder;
                    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");


                    $("#table").append("<td>");
                    $("#displayName").append("<br>" + databaseName);
                    $("#displayDestination").append("<br>" + databaseDestination);
                    $("#displayFrequency").append("<br>" + databaseFrequency);
                    $("#displayArrival").append("<br>" + nextTrainArrival);
                    $("#displayMin").append("<br>" + minutes);
                    // + "</td><td>" + firebaseLine + "</td><td>"+ 
                    // firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "
                    // </td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");




                });

            },
            function (errorObject) {

                console.log("Errors handled: " + errorObject.code);

            });