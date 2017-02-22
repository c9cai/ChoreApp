//firebase
var firebaseModule = require('../routes/firebase');
var firebase = firebaseModule.firebase;

//temporary reset database for testing
var ref = firebase.database().ref();
ref.set(
    {
        "users": {
            "brianchao@gmailcom": {
                "firstName": "brian",
                "lastName": "chao",
                "password": "chao",
                "rating": 61,
                "email": "brianchao@gmail.com",
                "homeName": "testHome",
                "overdue": [
                    {
                        "chorename": "Wash Dishes",
                        "duedate": "2/4/2016"
                    },
                    {
                        "chorename": "Sweep Patio",
                        "duedate": "2/5/2016"
                    }
                ],
                "today": [
                    {
                        "chorename": "Take Out Trash",
                        "duedate": "2/9/2016"
                    },
                    {
                        "chorename": "Check Mail",
                        "duedate": "2/9/2016"
                    }
                ],
                "upcoming": [
                    {
                        "chorename": "Wash Dishes",
                        "duedate": "2/13/2016"
                    },
                    {
                        "chorename": "Sweep Patio",
                        "duedate": "2/14/2016"
                    }
                ],
                "completed": [
                    {
                        "chorename": "Take Out Trash",
                        "duedate": "2/1/2016"
                    },
                    {
                        "chorename": "Check Mail",
                        "duedate": "2/2/2016"
                    }
                ]
            },
            "noahlee@gmailcom": {
                "firstName": "noah",
                "lastName": "lee",
                "password": "lee",
                "rating": 61,
                "email": "noahlee@gmail.com",
                "homeName": "testHome",
                "overdue": [
                    {
                        "chorename": "Wash Dishes",
                        "duedate": "2/4/2016"
                    },
                    {
                        "chorename": "Sweep Patio",
                        "duedate": "2/5/2016"
                    }
                ],
                "today": [
                    {
                        "chorename": "Take Out Trash",
                        "duedate": "2/9/2016"
                    },
                    {
                        "chorename": "Check Mail",
                        "duedate": "2/9/2016"
                    }
                ],
                "upcoming": [
                    {
                        "chorename": "Wash Dishes",
                        "duedate": "2/13/2016"
                    },
                    {
                        "chorename": "Sweep Patio",
                        "duedate": "2/14/2016"
                    }
                ],
                "completed": [
                    {
                        "chorename": "Take Out Trash",
                        "duedate": "2/1/2016"
                    },
                    {
                        "chorename": "Check Mail",
                        "duedate": "2/2/2016"
                    }
                ]
            },
            "aliaawni@gmailcom": {
                "firstName": "alia",
                "lastName": "awni",
                "password": "awni",
                "rating": 61,
                "email": "aliaawni@gmail.com",
                "homeName": "testHome",
                "overdue": [
                    {
                        "chorename": "Wash Dishes",
                        "duedate": "2/4/2016"
                    },
                    {
                        "chorename": "Sweep Patio",
                        "duedate": "2/5/2016"
                    }
                ],
                "today": [
                    {
                        "chorename": "Take Out Trash",
                        "duedate": "2/9/2016"
                    },
                    {
                        "chorename": "Check Mail",
                        "duedate": "2/9/2016"
                    }
                ],
                "upcoming": [
                    {
                        "chorename": "Wash Dishes",
                        "duedate": "2/13/2016"
                    },
                    {
                        "chorename": "Sweep Patio",
                        "duedate": "2/14/2016"
                    }
                ],
                "completed": [
                    {
                        "chorename": "Take Out Trash",
                        "duedate": "2/1/2016"
                    },
                    {
                        "chorename": "Check Mail",
                        "duedate": "2/2/2016"
                    }
                ]
            },
            "chriscai@gmailcom": {
                "firstName": "chris",
                "lastName": "cai",
                "password": "cai",
                "rating": 61,
                "email": "chriscai@gmail.com",
                "homeName": "testHome",
                "overdue": [
                    {
                        "chorename": "Wash Dishes",
                        "duedate": "2/4/2016"
                    },
                    {
                        "chorename": "Sweep Patio",
                        "duedate": "2/5/2016"
                    }
                ],
                "today": [
                    {
                        "chorename": "Take Out Trash",
                        "duedate": "2/9/2016"
                    },
                    {
                        "chorename": "Check Mail",
                        "duedate": "2/9/2016"
                    }
                ],
                "upcoming": [
                    {
                        "chorename": "Wash Dishes",
                        "duedate": "2/13/2016"
                    },
                    {
                        "chorename": "Sweep Patio",
                        "duedate": "2/14/2016"
                    }
                ],
                "completed": [
                    {
                        "chorename": "Take Out Trash",
                        "duedate": "2/1/2016"
                    },
                    {
                        "chorename": "Check Mail",
                        "duedate": "2/2/2016"
                    }
                ]
            }
        },
        //contains chore information and helps create chore schedule in "users"
        "chores": {
            "testHome": {
                "Wash Dishes": {
                    "choreName": "Wash Dishes",
                    "description": "Wash all the dishes and utensils in sink.",
                    "last_date": "2/21/2016",
                    "frequency": "1",
                    "1": "brianchao@gmail.com",
                    "2": "aliaawni@gmail.com",
                    "3": "noahlee@gmail.com",
                    "4": "chriscai@gmail.com"
                },
                "Sweep Patio": {
                    "choreName": "Sweep Patio",
                    "description": "Sweep off all leaves and throw away trash on patio",
                    "last_date": "2/21/2016",
                    "frequency": "7",
                    "1": "brianchao@gmail.com",
                    "2": "aliaawni@gmail.com",
                    "3": "noahlee@gmail.com",
                    "4": "chriscai@gmail.com"
                },
                "Take Out Trash": {
                    "choreName": "Take Out Trash",
                    "description": "Take out trash from kitchen garbage can",
                    "last_date": "2/21/2016",
                    "frequency": "2",
                    "1": "brianchao@gmail.com",
                    "2": "aliaawni@gmail.com",
                    "3": "noahlee@gmail.com",
                    "4": "chriscai@gmail.com"
                },
                "Check Mail": {
                    "choreName": "Check Mail",
                    "description": "Get mail from leasing office/mailbox",
                    "last_date": "2/21/2016",
                    "frequency": "3",
                    "1": "brianchao@gmail.com",
                    "2": "aliaawni@gmail.com",
                    "3": "noahlee@gmail.com",
                    "4": "chriscai@gmail.com"
                }
            }
        },
        "homes": {
            "testHome": [
                "brianchao@gmail.com",
                "aliaawni@gmail.com",
                "noahlee@gmail.com",
                "chriscai@gmail.com"
            ]
        }
    }
);

var userRef = firebase.database().ref("users");

//local files
var current_user = require("../json/current_user.json");

exports.checkLogin = function(req, res) {
    var username = req.body.username.replace(".","");
    var password = req.body.password;
    var check = false;

    userRef.once("value", function(snapshot) {
        var user_data = snapshot.val();

        if (user_data[username] != null) {
            if (user_data[username]['password'] == password) {
                check = true;
                current_user['current_user'] = user_data[username];
                res.redirect("/home");
            } else
                res.render('login');
        } else
            res.render('login');
    });
};