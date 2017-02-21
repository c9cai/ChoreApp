var firebase = require('firebase').initializeApp({
		serviceAccount: "./ChoreApp-d6f6f8302527.json",
		databaseURL: "https://choreapp-ed3c0.firebaseio.com"
});

var ref = firebase.database().ref();
var usersRef = ref.child('users');

usersRef.push({
	userName:'c9cai',
	firstName:'chris',
	lastName:'cai'
});