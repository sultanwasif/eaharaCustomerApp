import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth.service';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-my-track',
  templateUrl: './my-track.component.html',
  styleUrls: ['./my-track.component.scss'],
})
export class MyTrackComponent implements OnInit {
  TokenInfo;
  myOrders;
  basePath;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit() {
    this.basePath = env.ImgPath;
    this.onMyOrders();
  }

  onMyOrders() {
    this.TokenInfo = this.authService.getTokenInfo();
    this.http.get<any>(env.API + 'MyTracksInApp/' + this.TokenInfo.CustomerId).subscribe(data => {
      this.myOrders = data;
      },
      err => {
        this.toastr.error( 'Network Error');
      });

  }

}
