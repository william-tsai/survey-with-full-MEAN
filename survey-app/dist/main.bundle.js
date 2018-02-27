webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-poll/add-poll.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/add-poll/add-poll.component.html":
/***/ (function(module, exports) {

module.exports = "<a [routerLink] = \"['/#dashboard']\">Cancel</a>\n<h3>Put the question and options here:</h3>\n<form (submit) = \"submitToAddPoll()\">\n  <p>Question: <input type=\"text\" name=\"question\" [(ngModel)] = \"poll.question\"></p>\n  <p>Option 1: <input type=\"text\" name=\"option1\" [(ngModel)] = \"poll.option1\"></p>\n  <p>Option 2: <input type=\"text\" name=\"option2\" [(ngModel)] = \"poll.option2\"></p>\n  <p>Option 3: <input type=\"text\" name=\"option3\" [(ngModel)] = \"poll.option3\"></p>\n  <p>Option 4: <input type=\"text\" name=\"option4\" [(ngModel)] = \"poll.option4\"></p>\n  <button type=\"submit\">Create Poll</button>\n  <p *ngFor = \"let error of errors\">{{error}}</p>\n</form>"

/***/ }),

/***/ "./src/app/add-poll/add-poll.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var AddPollComponent = /** @class */ (function () {
    function AddPollComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.poll = { username: "", question: "", option1: "", option2: "", option3: "", option4: "" };
        this.errors = [];
    }
    AddPollComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    AddPollComponent.prototype.getUser = function () {
        var _this = this;
        this.httpService.getOneUser()
            .subscribe(function (response) {
            if (response.errors) {
                console.log(response.errors);
            }
            else {
                _this.user = response;
                _this.poll.username = _this.user.name;
            }
            ;
        });
    };
    ;
    AddPollComponent.prototype.submitToAddPoll = function () {
        var _this = this;
        console.log("New poll to be added: ", this.poll);
        this.httpService.addPoll(this.user._id, this.poll)
            .subscribe(function (response) {
            if (response.errors) {
                _this.errors = [];
                for (var error in response.errors) {
                    console.log(response.errors[error].message);
                    _this.errors.push(response.errors[error].message);
                }
            }
            else {
                console.log(response.message);
                _this.router.navigate(['/#dashboard']);
            }
            ;
        });
    };
    AddPollComponent = __decorate([
        core_1.Component({
            selector: 'app-add-poll',
            template: __webpack_require__("./src/app/add-poll/add-poll.component.html"),
            styles: [__webpack_require__("./src/app/add-poll/add-poll.component.css")]
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router])
    ], AddPollComponent);
    return AddPollComponent;
}());
exports.AddPollComponent = AddPollComponent;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var dashboard_component_1 = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
var poll_component_1 = __webpack_require__("./src/app/poll/poll.component.ts");
var add_poll_component_1 = __webpack_require__("./src/app/add-poll/add-poll.component.ts");
var routes = [
    { path: '', pathMatch: 'full', component: login_component_1.LoginComponent },
    { path: '#dashboard', component: dashboard_component_1.DashboardComponent },
    { path: '#poll/:id', component: poll_component_1.PollComponent },
    { path: '#create', component: add_poll_component_1.AddPollComponent },
    // { path: 'page-not-found', component: PageNotFoundComponent},
    { path: '**', redirectTo: '#dashboard' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent(httpService) {
        this.httpService = httpService;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var app_routing_module_1 = __webpack_require__("./src/app/app-routing.module.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var dashboard_component_1 = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
var poll_component_1 = __webpack_require__("./src/app/poll/poll.component.ts");
var add_poll_component_1 = __webpack_require__("./src/app/add-poll/add-poll.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                poll_component_1.PollComponent,
                add_poll_component_1.AddPollComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule
            ],
            providers: [http_service_1.HttpService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"header\">\n  <button [routerLink] = \"['/#create']\">Create a New Poll</button>\n  <button (click) = \"logout()\">Logout</button>\n</div>\n<h3>Current Polls:</h3>\n<div id=\"search-bar\">\n  <input type=\"text\" name=\"searchTerm\" [(ngModel)] = \"searchTerm\" (keyup) = \"search()\" placeholder=\"Search\">\n</div>\n<table>\n  <thead>\n    <th>Name</th>\n    <th>Survey Question</th>\n    <th>Date Posted</th>\n    <th>Action</th>\n  </thead>\n  <tbody>\n    <tr *ngFor = \"let poll of filteredPolls\">\n      <td>{{poll.username}}</td>\n      <td><a [routerLink] = \"['/#poll/' + poll._id]\">{{poll.question}}</a></td>\n      <td>{{poll.timestamp}}</td>\n      <!-- <td *ngIf = \"isPollCreator == true\"><button (click) = \"deleteButtonClicked(poll._id)\">Delete</button></td> -->\n    </tr>\n  </tbody>\n</table>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.users = [];
        this.filteredPolls = [];
        this.polls = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.isPollCreater = false;
        this.displayPolls();
    };
    DashboardComponent.prototype.displayPolls = function () {
        var _this = this;
        this.httpService.getAllUsers()
            .subscribe(function (response) {
            if (response.errors) {
                console.log(response.errors);
            }
            else {
                // this.users = response;
                for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                    var user = response_1[_i];
                    for (var _a = 0, _b = user.polls; _a < _b.length; _a++) {
                        var poll = _b[_a];
                        _this.polls.push(poll);
                    }
                }
                _this.filteredPolls = _this.polls;
            }
        });
    };
    DashboardComponent.prototype.logout = function () {
        var _this = this;
        this.httpService.deleteSession()
            .subscribe(function (response) {
            if (response.status == false) {
                console.log("User is logged out");
                _this.router.navigate(['/#index']);
            }
            else {
                console.log(response);
                console.log("Session id is not deleted");
            }
        });
    };
    DashboardComponent.prototype.search = function () {
        var _this = this;
        this.filteredPolls = this.polls.filter(function (poll) { return poll.question.includes(_this.searchTerm); });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;


/***/ }),

/***/ "./src/app/http.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var HttpService = /** @class */ (function () {
    function HttpService(http) {
        this.http = http;
    }
    HttpService.prototype.createNewUser = function (newUser) {
        return this.http.post("/api/users", newUser);
    };
    ;
    HttpService.prototype.getAllUsers = function () {
        return this.http.get("/api/users");
    };
    ;
    HttpService.prototype.getOneUser = function () {
        return this.http.get("/api/users/current-user");
    };
    // updateAuthor(author) {
    //   return this.http.put(`/api/users/${author._id}`, author);
    // }
    // deleteAuthor(authorId) {
    //   return this.http.delete(`/api/users/${authorId}`);
    // }
    HttpService.prototype.addPoll = function (userId, pollObj) {
        return this.http.post("/api/users/" + userId, pollObj);
    };
    ;
    HttpService.prototype.removePoll = function (userId, pollObj) {
        return this.http.put("/api/users/quotes/" + userId, pollObj);
    };
    ;
    HttpService.prototype.addVoteTo1 = function (pollId) {
        return this.http.get("/api/users/poll/" + pollId);
    };
    HttpService.prototype.addVoteTo2 = function (pollId) {
        return this.http.get("/api/users/poll/" + pollId);
    };
    HttpService.prototype.addVoteTo3 = function (pollId) {
        return this.http.get("/api/users/poll/" + pollId);
    };
    HttpService.prototype.addVoteTo4 = function (pollId) {
        return this.http.get("/api/users/poll/" + pollId);
    };
    HttpService.prototype.deleteSession = function () {
        return this.http.get("/api/users/logout");
    };
    HttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;


/***/ }),

/***/ "./src/app/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<form (submit) = \"login()\">\n  <p>Your Name: <input type=\"text\" name=\"name\" [(ngModel)] = \"newUser.name\"></p>\n  <button type=\"submit\">Login</button>\n</form>"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.newUser = { name: "" };
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.httpService.createNewUser(this.newUser)
            .subscribe(function (response) {
            if (response.errors) {
                console.log(response.errors);
            }
            else {
                console.log("New user created!");
                _this.router.navigate(['/#dashboard']);
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "./src/app/poll/poll.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/poll/poll.component.html":
/***/ (function(module, exports) {

module.exports = "<p><a [routerLink] = \"['/#dashboard']\">Go to Polls</a></p>\n<h3>{{poll.question}}</h3>\n<p>Click the Vote button to choose one</p>\n<table>\n  <thead>\n    <th>Option</th>\n    <th>Current Count of Votes</th>\n    <th>Action</th>\n  </thead>\n  <tbody>\n    <tr>\n      <td>{{poll.option1.content}}</td>\n      <td>{{poll.option1.vote}}</td>\n      <td>\n        <button (click) = \"voteOpt1Clicked()\">Vote</button>\n      </td>\n    </tr>\n    <tr>\n      <td>{{poll.option2.content}}</td>\n      <td>{{poll.option2.vote}}</td>\n      <td>\n        <button (click) = \"voteOpt2Clicked()\">Vote</button>\n      </td>\n    </tr>\n\n    <tr>\n      <td>{{poll.option3.content}}</td>\n      <td>{{poll.option3.vote}}</td>\n      <td>\n        <button (click) = \"voteOpt3Clicked()\">Vote</button>\n      </td>\n    </tr>\n    <tr>\n      <td>{{poll.option4.content}}</td>\n      <td>{{poll.option4.vote}}</td>\n      <td>\n        <button (click) = \"voteOpt4Clicked()\">Vote</button>\n      </td>\n    </tr>\n  </tbody>\n</table>"

/***/ }),

/***/ "./src/app/poll/poll.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_service_1 = __webpack_require__("./src/app/http.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var PollComponent = /** @class */ (function () {
    function PollComponent(httpService, router, route) {
        this.httpService = httpService;
        this.router = router;
        this.route = route;
    }
    PollComponent.prototype.ngOnInit = function () {
        this.fetchUsersAndPoll();
    };
    PollComponent.prototype.fetchUsersAndPoll = function () {
        var _this = this;
        this.httpService.getAllUsers()
            .subscribe(function (response) {
            if (response.errors) {
                console.log(response.errors);
            }
            else {
                console.log(response);
                var pollId;
                _this.route.paramMap.subscribe(function (params) {
                    pollId = params.get("id");
                });
                for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                    var user = response_1[_i];
                    for (var _a = 0, _b = user.polls; _a < _b.length; _a++) {
                        var poll = _b[_a];
                        if (poll._id == pollId) {
                            _this.poll = poll;
                        }
                    }
                }
            }
        });
    };
    PollComponent.prototype.voteOpt1Clicked = function () {
        var _this = this;
        this.httpService.addVoteTo1(this.poll._id)
            .subscribe(function (response) {
            if (response.errors) {
                console.log(response.errors);
            }
            else {
                console.log(response.message);
                _this.fetchUsersAndPoll();
            }
        });
    };
    PollComponent = __decorate([
        core_1.Component({
            selector: 'app-poll',
            template: __webpack_require__("./src/app/poll/poll.component.html"),
            styles: [__webpack_require__("./src/app/poll/poll.component.css")]
        }),
        __metadata("design:paramtypes", [http_service_1.HttpService, router_1.Router, router_1.ActivatedRoute])
    ], PollComponent);
    return PollComponent;
}());
exports.PollComponent = PollComponent;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map