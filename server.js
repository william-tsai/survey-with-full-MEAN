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
// Get all users
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
// Delete a poll
app.delete("/api/users/polls/:id",function(request, response) {
    User.find({}, function(err, users) {
        if (err) {
            response.json(err);
        } else {
            for (let user of users) {
                for (let i = 0; i < user.polls.length; i++) {
                    if (user.polls[i]._id == request.params.id) {
                        user.polls.splice(i, 1);
                        user.save(function(err) {
                            if (err) {
                                response.json(err)
                            } else {
                                response.json({message: "Poll deleted!"});
                            };
                        });
                    } else {
                        console.log("Poll not found");
                    };
                };
            };
        };
    });
});
// Add vote
app.put("/api/users/polls/:id", function(request, response) {
    User.find({}, function(err, users) {
        if (err) {
            response.json(err);
        } else {
            console.log("request.body.option: ", request.body.option);
            for (let user of users) {
                for (let poll of user.polls) {
                    if (poll._id == request.params.id) {
                        for (let key in poll) {
                            if (key == request.body.option) {
                                poll[key].vote += 1;
                                user.save(function(err) {
                                    if (err) {
                                        response.json(err)
                                    } else {
                                        response.json({message: `${key} vote increased by 1`});
                                    };
                                });
                            };
                        };
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
        };
    });
});

app.all("*", function(request, response) {
    response.sendFile(path.resolve(__dirname + "/survey-app/dist/index.html"))
});

app.listen(8000, function() {
    console.log("Listening on port 8000");
});