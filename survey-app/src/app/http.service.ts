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

  // updateAuthor(author) {
  //   return this.http.put(`/api/users/${author._id}`, author);
  // }

  // deleteAuthor(authorId) {
  //   return this.http.delete(`/api/users/${authorId}`);
  // }

  addPoll(userId, pollObj) {
    return this.http.post(`/api/users/${userId}`, pollObj);
  };

  removePoll(userId, pollObj) {
    return this.http.put(`/api/users/quotes/${userId}`, pollObj);
  };

  addVoteTo1(pollId) {
    return this.http.get(`/api/users/poll/${pollId}`);
  }
  addVoteTo2(pollId) {
    return this.http.get(`/api/users/poll/${pollId}`);
  }
  addVoteTo3(pollId) {
    return this.http.get(`/api/users/poll/${pollId}`);
  }
  addVoteTo4(pollId) {
    return this.http.get(`/api/users/poll/${pollId}`);
  }
  deleteSession() {
    return this.http.get("/api/users/logout");
  }
}
