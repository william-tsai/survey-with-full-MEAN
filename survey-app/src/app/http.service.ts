import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  createNewUser(newUser) {
    return this.http.post("/api/users", newUser);
  };

  getAllUsers() {
    return this.http.get("/api/users");
  };

  getOneUser() {
    return this.http.get("/api/users/current-user");
  }

  removePoll(pollId) {
    return this.http.delete(`/api/users/polls/${pollId}`);
  }

  addPoll(userId, pollObj) {
    return this.http.post(`/api/users/${userId}`, pollObj);
  };

  addVote(pollId, optionObj) {
    return this.http.put(`/api/users/polls/${pollId}`, optionObj);
  };
  
  deleteSession() {
    return this.http.get("/api/users/logout");
  }
}
