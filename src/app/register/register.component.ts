import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    userFirstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    userLastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });


  register() {
    let customer = {
      userName: this.registerForm.get('userName')?.value,
      userFirstName: this.registerForm.get('userFirstName')?.value,
      userLastName: this.registerForm.get('userLastName')?.value,
      userPassword: this.registerForm.get('userPassword')?.value
    };

    this.userService.register({
      userName: customer.userName,
      userFirstName: customer.userFirstName,
      userLastName: customer.userLastName,
      userPassword: customer.userPassword
    }).subscribe(
      (response) => {
        console.log(response);
        // @ts-ignore
        this.router.navigate(['/login']);
      },
      (erorr) => {
        console.log(erorr);
      }
    );
  }
}



