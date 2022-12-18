import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  // tslint:disable-next-line:typedef
  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  // tslint:disable-next-line:typedef
  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  // tslint:disable-next-line:typedef
  public clear() {
    localStorage.clear();
  }

  // tslint:disable-next-line:typedef
  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  // tslint:disable-next-line:typedef
  public  isAdmin(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
  }
  // tslint:disable-next-line:typedef
  public  isUser(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }

}
