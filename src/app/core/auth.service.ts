import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

export enum USER_ROLE {
  SUPERADMIN = 'SUPERADMIN',
  SCHOOLADMIN = 'SCHOOLADMIN',
  TEACHER = 'TEACHER',
  PARENT = 'PARENT',
  GUEST = 'GUEST'
}

export interface UserInfo {
  Id?: string;
  UserName?: string;
  Password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // isLoggedIn = false;
  public tokenInfo;
  public user: UserInfo;
  public school: any;
  private isLoggedin: boolean;
  public storage = window.localStorage;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  isLoggedIn(): boolean {
    return this.user ? true : false;
  }

  logout(): void {
    this.isLoggedin = false;
    this.user = null;
  }

setCart(data) {
  let cart;
  cart = data;
  this.storage.setItem('eaharaCart', JSON.stringify(cart));
}

getCart() {
  let cart;
  cart = JSON.parse(this.storage.getItem('eaharaCart'));
  return cart;
}

removeCart() {
    const cart = [];
    this.storage.setItem('eaharaCart', JSON.stringify(cart));
}

setTokenInfo(data) {
  this.tokenInfo = data;
  this.storage.setItem('EaharaTokenInfo', JSON.stringify(this.tokenInfo));
}

getTokenInfo() {
  this.tokenInfo = JSON.parse(this.storage.getItem('EaharaTokenInfo'));
  return this.tokenInfo;
}

removeTokenInfo() {
  this.tokenInfo = null;
  this.storage.setItem('EaharaTokenInfo', JSON.stringify(this.tokenInfo));
}
}
