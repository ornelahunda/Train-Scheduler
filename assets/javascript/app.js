
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
var database= firebase.database();
var name="";
var destination="";
var time="";
var frequency=0;

// when we click the submit button 
// this gets the user input and saves it in different variables
$("#addButton").on("click", function(){
name=$("#name").val().trim();
destination=$("#destination").val().trim();
time=$("#time").val().trim();
frequency=$("#frequency").val().trim();


database.ref().set({
    name:name,
    destination:destination,
    time:time,
    frequency:frequency

});
$("#displayName").html(name);
return false;
});

database.ref().on("value",function(snapshot){

});