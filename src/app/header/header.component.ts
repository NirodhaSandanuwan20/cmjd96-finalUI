import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  // tslint:disable-next-line:typedef
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  // tslint:disable-next-line:typedef
  public isAdmin(){
    return this.userAuthService.isAdmin();
  }
// tslint:disable-next-line:typedef
public isUser(){
    return this.userAuthService.isUser();
  }

}
