import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  users: any[] = [];
  poll: any = {username: "", questions: "", option1: "", option2: "", option3: "", option4: ""}
  option = {option: ""};

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.fetchUsersAndDisplayPoll();
  }

  fetchUsersAndDisplayPoll() {
    this.route.paramMap.subscribe(params => {
      this.httpService.getAllUsers()
      .subscribe((response: any) => {
        if (response.errors) {
          console.log(response.errors);
        } else {
          for (let user of response) {
            for (let poll of user.polls) {
              if (poll._id == params.get("id")) {
                this.poll = poll;
                console.log("Got the poll!");
              };
            };
          };
        };
      });
    })
  };

  voteOpt1Clicked() {
    this.option.option = "option1";
    this.httpService.addVote(this.poll._id, this.option)
    .subscribe((response: any) => {  
      if (response.errors) {
        console.log(response.errors);
      } else {
        console.log(response.message);
        this.fetchUsersAndDisplayPoll();
      }
    })
  }

  voteOpt2Clicked() {
    this.option.option = "option2";
    this.httpService.addVote(this.poll._id, this.option)
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        console.log(response.message);
        this.fetchUsersAndDisplayPoll();
      }
    })
  }

  voteOpt3Clicked() {
    this.option.option = "option3";
    this.httpService.addVote(this.poll._id, this.option)
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        console.log(response.message);
        this.fetchUsersAndDisplayPoll();
      }
    })
  }

  voteOpt4Clicked() {
    this.option.option = "option4";
    this.httpService.addVote(this.poll._id, this.option)
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        console.log(response.message);
        this.fetchUsersAndDisplayPoll();
      }
    })
  }
}
