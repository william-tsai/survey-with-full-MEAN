import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  currentUser: any = {name: ""};
  searchTerm: string;
  filteredPolls: any[] = [];
  polls: any[] = [];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.fetchCurrentUser();
    this.displayPolls();
  }

  fetchCurrentUser() {
    this.httpService.getOneUser()
    .subscribe((response: any) => {
      if (response.errors) {
         console.log(response.errors);
      } else {
        this.currentUser = response;
      };
    });
  };
  
  displayPolls() {
    this.httpService.getAllUsers()
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        // this.users = response;
        for (let user of response) {
          for (let poll of user.polls) {
            this.polls.push(poll);
            this.filteredPolls = this.polls;
          };
        };
      };
    });
  };

  deleteButtonClicked(pollId) {
    this.polls = [];
    this.httpService.removePoll(pollId)
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        console.log(response.message);
        this.displayPolls(); 
      }
    })
  }

  logout() {
    this.httpService.deleteSession()
    .subscribe((response: any) => {
      if (response.status == false) {
        console.log("User is logged out");
        this.router.navigate(['/#index']);
      } else {
        console.log(response);
        console.log("Session id is not deleted");
      }
    })
  }

  search() {
    this.filteredPolls = this.polls.filter(poll => poll.question.includes(this.searchTerm));
  }

}
