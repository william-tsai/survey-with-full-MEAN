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
  searchTerm: string;
  isPollCreater: boolean;
  filteredPolls: any[] = [];
  polls: any[] = [];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.isPollCreater = false;
    this.displayPolls();
  }

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
          }
        }
        this.filteredPolls = this.polls;
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
