import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.scss'],
})
export class ChangeLocationComponent implements OnInit {
  LocInfo;
  LocDropInfo;
  locid;

  constructor(private authService: AuthService,
              private router: Router,
              private http: HttpClient) {
   }

  ngOnInit() {
    this.LocInfo = this.authService.getLocInfo();
    // this.locid = '1';
    if (this.LocInfo) {
      this.locid = this.LocInfo.Id;
    }
    this.http.get<any>(env.API + 'LocationInDropdown').subscribe(data => {
      this.LocDropInfo = data;
  });

}
changeLoc(data) {
  this.LocInfo = data;
  this.authService.setLocInfo(this.LocInfo);
  this.authService.chkLocationChange = true;
  this.router.navigate(['/tabs/tab1']);
}
}
