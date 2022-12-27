import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserAuthService} from '../_services/user-auth.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required])
  });


  login() {

    let customerTemp = {
      userName: this.loginForm.get('userName')?.value,
      userPassword: this.loginForm.get('userPassword')?.value
    };

    this.userService.login({
      userName: customerTemp.userName,
      userPassword: customerTemp.userPassword
    }).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  registerUser() {
    this.router.navigate(['/registerNewUser']);
  }
}
