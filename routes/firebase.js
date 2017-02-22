var firebase = require('firebase').initializeApp({
		serviceAccount: "./ChoreApp-d6f6f8302527.json",
		databaseURL: "https://choreapp-ed3c0.firebaseio.com"
});

exports.firebase = firebase;