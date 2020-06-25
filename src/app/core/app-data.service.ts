import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as _ from 'lodash';

export interface DeviceInfo {
  platform?: string;
  uuid?: string;
  osVer?: string;
  manufacturer?: string;
  serial?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  public deviceInfo: DeviceInfo;

  constructor(private authService: AuthService) {
    this.deviceInfo = {};
  }
}
