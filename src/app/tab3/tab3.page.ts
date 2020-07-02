import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/auth.service';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  Profile;
  TokenInfo: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService) {
      this.loadData();
    }

  onProfile() {
    this.router.navigate(['/tabs/tab3/your-profile']);
  }
  onWallet() {}
  onRefer() {}
  onChangePass() {
    this.router.navigate(['/tabs/tab3/change-password']);
  }
  onAddress() {
    this.router.navigate(['/tabs/tab3/your-address']);
  }

  loadData() {
    this.TokenInfo = this.authService.getTokenInfo();
    this.Profile = {};
    this.http.get<any>(env.API + 'CustomerById/' + this.TokenInfo.CustomerId).subscribe(data => {
      this.Profile = data;
  },
  err => console.log(err),
  );
  }

}
