var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();

app.use(session({secret: "codingisawesome"}));
app.use(express.static(__dirname + "/survey-app/dist"));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/surveyNg");

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {type: String, required: true},
    polls: [{
        username: {type: String},
        question: {type: String, required: true, minlength: 8},
        option1: {content: {type: String, required: true, minlength: 3}, vote: {type: Number}},
        option2: {content: {type: String, required: true, minlength: 3}, vote: {type: Number}},
        option3: {content: {type: String, required: true, minlength: 3}, vote: {type: Number}},
        option4: {content: {type: String, required: true, minlength: 3}, vote: {type: Number}},
        timestamp: {type: String} 
    }]
    },
    {timestamps: true}
);
mongoose.model("User", userSchema);
var User = mongoose.model("User");
mongoose.Promise = global.Promise;
// getAllUsers()
app.get("/api/users", function(request, response) {
    User.find({}, function(err, users) {
        if (err) {
            response.json(err);
        } else {
            response.json(users);
        };
    });
});
// Login route:
app.post("/api/users", function(request, response) {
    User.findOne({name: request.body.name}, function(err, user) {
        if (err || user == null) {
            console.log("No existing user found with this name");
            var newUser = new User({
                name: request.body.name
            });
            newUser.save(function(err, savedUser) {
                if (err) {
                    response.json(err);
                } else {
                    request.session.userId = savedUser._id;
                    response.json({status: "new user", id: savedUser._id});
                };
            });
        } else {
            request.session.userId = user._id;
            response.json({status: "existing user", user: user});
        };
    });
});
// Get one user
app.get("/api/users/current-user", function(request, response) {
    User.findById({_id: request.session.userId}, function(err, user) {
        if (err) {
            response.json(err);
        } else {
            response.json(user);
        }
    })
})
// Add new poll
app.post("/api/users/:id", function(request, response) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var createdDate = new Date().toLocaleDateString('en-US', options);
    var newPoll = {
        username: request.body.username,
        question: request.body.question,
        option1: {content: request.body.option1, vote: 0},
        option2: {content: request.body.option2, vote: 0},
        option3: {content: request.body.option3, vote: 0},
        option4: {content: request.body.option4, vote: 0},
        timestamp: createdDate
    };
    console.log("New poll about to be saved: ", newPoll);
    User.findOne({_id: request.params.id}, function(err, user) {
        if (err) {
            response.json(err);
        } else {
            user.polls.push(newPoll);
            user.save(function(err) {
                if (err) {
                    response.json(err);
                } else {
                    response.json({message: "New quote added"})
                };
            });
        };
    });
});
app.get("/api/users/poll/:id", function(request, response) {
    User.find({}, function(err, users) {
        if (err) {
            response.json(err);
        } else {
            for (let user of users) {
                for (let poll of user.polls) {
                    if (poll._id == request.params.id) {
                        poll.option1.vote += 1;
                        users.save(function(err) {
                            if (err) {
                                response.json(err)
                            } else {
                                response.json({message: "Quote vote increased by 1"});
                            };
                        });
                    } else {
                        console.log("Quote not found at index ");
                    };
                };
            }
        };
    });
}) 
// Logout user
app.get("/api/users/logout", function(request, response) {
    request.session.destroy(function(err) {
        if (err) {
            response.json(err);
        } else {
            response.json({status: false});
        }
    })
})

// app.put("/api/authors/:id", function(request, response) {
//     var id = request.params.id;
//     Author.update({_id: id}, request.body, {runValidators: true}, function(err) {
//         if (err) {
//             response.json(err);
//         } else {
//             response.json({message: "Update successful!"});
//         };
//     });
// });

// app.put("/api/authors/quotes/:id", function(request, response) {
//     Author.findOne({_id: request.params.id}, function(err, author) {
//         if (err) {
//             response.json(err);
//         } else {
//             for (let i = 0; i < author.quotes.length; i++) {
//                 if (author.quotes[i]._id == request.body._id) {
//                     author.quotes.splice(i, 1);
//                     author.save(function(err) {
//                         if (err) {
//                             response.json(err)
//                         } else {
//                             response.json({message: "Quote deleted!"});
//                         };
//                     });
//                 } else {
//                     console.log("Quote not found at index ", i);
//                 };
//             };
//         };
//     });
// });

// app.put("/api/authors/quotes/:id/voteup", function(request, response) {
//     Author.findOne({_id: request.params.id}, function(err, author) {
//         if (err) {
//             response.json(err);
//         } else {
//             for (let i = 0; i < author.quotes.length; i++) {
//                 if (author.quotes[i]._id == request.body._id) {
//                     author.quotes[i].vote += 1;
//                     author.save(function(err) {
//                         if (err) {
//                             response.json(err)
//                         } else {
//                             response.json({message: "Quote vote increased by 1"});
//                         };
//                     });
//                 } else {
//                     console.log("Quote not found at index ", i);
//                 };
//             };
//         };
//     });
// });

// app.put("/api/authors/quotes/:id/votedown", function(request, response) {
//     Author.findOne({_id: request.params.id}, function(err, author) {
//         if (err) {
//             response.json(err);
//         } else {
//             for (let i = 0; i < author.quotes.length; i++) {
//                 if (author.quotes[i]._id == request.body._id) {
//                     author.quotes[i].vote -= 1;
//                     author.save(function(err) {
//                         if (err) {
//                             response.json(err)
//                         } else {
//                             response.json({message: "Quote vote decreased by 1"});
//                         };
//                     });
//                 } else {
//                     console.log("Quote not found at index ", i);
//                 };
//             };
//         };
//     });
// });

// app.delete("/api/authors/:id", function(request, response) {
//     Author.findOne({_id: request.params.id}, function(err, author) {
//         if (err) {
//             response.json(err);
//         } else {
//             console.log(author.quotes);
//             response.json({message: "Quote deleted!"})
//         }
//     })
// });

app.all("*", function(request, response) {
    response.sendFile(path.resolve(__dirname + "/survey-app/dist/index.html"))
});

app.listen(8000, function() {
    console.log("Listening on port 8000");
});