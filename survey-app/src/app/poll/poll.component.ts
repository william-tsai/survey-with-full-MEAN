import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  users: any;
  poll: any;

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchUsersAndPoll();
  }

  fetchUsersAndPoll() {
    this.httpService.getAllUsers()
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        console.log(response);
        var pollId: any;
        this.route.paramMap.subscribe(params => {
          pollId = params.get("id");
        });
        for (let user of response) {
          for (let poll of user.polls) {
            if (poll._id == pollId) {
              this.poll = poll;
            }
          }
        }
      }
    })
  }
  voteOpt1Clicked() {
    this.httpService.addVoteTo1(this.poll._id)
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        console.log(response.message);
        this.fetchUsersAndPoll();
      }
    })
  }

  // voteOpt2Clicked() {
  //   this.httpService.addVoteTo2(this.poll._id)
  //   .subscribe((response: any) => {
  //     if (response.errors) {
  //       console.log(response.errors);
  //     } else {
  //       console.log(response.message);
  //       this.displayQuotes();
  //     }
  //   })
  // }

  // voteOpt3Clicked() {
  //   this.httpService.addVoteTo3(this.poll._id)
  //   .subscribe((response: any) => {
  //     if (response.errors) {
  //       console.log(response.errors);
  //     } else {
  //       console.log(response.message);
  //       this.displayQuotes();
  //     }
  //   })
  // }

  // voteOpt4Clicked() {
  //   this.httpService.addVoteTo4(this.poll._id)
  //   .subscribe((response: any) => {
  //     if (response.errors) {
  //       console.log(response.errors);
  //     } else {
  //       console.log(response.message);
  //       this.displayQuotes();
  //     }
  //   })
  // }
}
