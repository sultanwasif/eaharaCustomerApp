import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { tap, delay } from "rxjs/operators";

export enum USER_ROLE {
  SUPERADMIN = "SUPERADMIN",
  SCHOOLADMIN = "SCHOOLADMIN",
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  GUEST = "GUEST"
}

export interface UserInfo {
  Id?: string;
  UserName?: string;
  Password?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // isLoggedIn = false;
  public user: UserInfo;
  public school: any;
  private isLoggedin: boolean;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  logout(): void {
    this.isLoggedin = false;
    this.user = null;
  }
}
