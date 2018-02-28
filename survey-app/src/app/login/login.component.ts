import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: any = {name: ""};

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.httpService.createNewUser(this.newUser)
    .subscribe((response: any) => {
      if (response.errors) {
        console.log(response.errors);
      } else {
        console.log(response.status);
        this.router.navigate(['/#dashboard']);
      }
    })
  }

}
