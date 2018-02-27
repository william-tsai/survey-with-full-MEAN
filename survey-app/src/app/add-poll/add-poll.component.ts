import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css']
})
export class AddPollComponent implements OnInit {
  user: any;
  poll: any = {username: "", question: "", option1: "", option2: "", option3: "", option4: ""};
  errors: any[] = [];

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.httpService.getOneUser()
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        this.user = response;
        this.poll.username = this.user.name;
      };
    });
  };

  submitToAddPoll() {
    console.log("New poll to be added: ", this.poll);
    this.httpService.addPoll(this.user._id, this.poll)
    .subscribe((response: any) => {
      if (response.errors) {
        this.errors = [];
        for (let error in response.errors) {
          console.log(response.errors[error].message);
          this.errors.push(response.errors[error].message);
        }
      } else {
        console.log(response.message);
        this.router.navigate(['/#dashboard']);
      };
    })
  }

}
