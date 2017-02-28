var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;
var ref = firebase.database().ref();
var userRef = firebase.database().ref("users");

//Assuming that "chores" and "homes" is populated
exports.createSchedule = function (req, res) {
    var current_user = req.session.current_user;

    var todayDate = new Date();
    var choreDate = new Date();
    var homeName = current_user['homeName'];
    var currUser = current_user['email'].split('.').join('');

    if (req.session.current_user['setup'] != null)
        res.redirect(req.session.current_user['setup']);

    if (homeName == null) // user does not have home
        res.redirect('no_home');
    else { //create schedule for user's home
        ref.once("value", function (snapshot) {
            var data = snapshot.val();
            var user_data = data['users'];
            var home_data = data['homes'];
            var chore_data = data['chores'];

            //chore schedule data
            var chore_schedule = {};

            //get every user in home
            var users = home_data[homeName];

            //assign chores to each user
            var num_ppl = users.length;
            var chores = chore_data[homeName];
            for (var chore in chores) { //loop through each chore
                var chore_info = chores[chore];
                var freq = chore_info['frequency'];
                var choreName = chore_info['choreName'];

                console.log("=========" + chore_info['choreName'] + "===========");

                do {
                    console.log("Chore date is: " + choreDate);
                    var timeDiff = Math.abs(choreDate.getTime() - todayDate.getTime());
                    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));

                    //next assignee
                    var next = chore_info[1].split('.').join('');

                    //today's chores
                    if (diffDays == 0)
                        var categoryRef = userRef.child(next + "/today");
                    else //upcoming chores
                        var categoryRef = userRef.child(next + "/upcoming");


                    //add on to chores list
                    categoryRef.once("value", function (snapshot) {
                        var currChores = snapshot.val();
                        if (currChores == null)
                            currChores = [];

                        var toAdd = {};
                        toAdd['chorename'] = choreName;
                        toAdd['duedate'] = (choreDate.getMonth() + 1)
                            + "/" + choreDate.getDate() + "/"
                            + choreDate.getFullYear();
                        currChores.push(toAdd);
                        categoryRef.set(currChores);
                    });

                    //set next user
                    var temp = chore_info[1];
                    for (var i = 1; i < num_ppl; i++) {
                        chore_info[i] = chore_info[i + 1];
                    }
                    chore_info[num_ppl] = temp;

                    //increment chore date by frequency
                    choreDate.setDate(choreDate.getDate() + parseInt(freq));
                    console.log("date diff is: " + diffDays);
                } while (diffDays <= 14)

                choreDate = new Date();
            }
        });
    }

    res.redirect('preferences');
}