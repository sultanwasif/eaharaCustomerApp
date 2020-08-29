import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth.service';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
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
    this.http.get<any>(env.API + 'MyOrdersInApp/' + this.TokenInfo.CustomerId).subscribe(data => {
      this.myOrders = data;
      },
      err => {
        this.toastr.error( 'Network Error');
      });

  }

}
