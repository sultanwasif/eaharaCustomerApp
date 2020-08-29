import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth.service';
import { env } from 'src/environments/environment';

@Component({
  selector: 'app-your-address',
  templateUrl: './your-address.component.html',
  styleUrls: ['./your-address.component.scss'],
})
export class YourAddressComponent implements OnInit {
  CurAddress;
  TokenInfo: any;
  LocInfo;
  allAddress;
  locid;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService) { }

  ngOnInit() {
    this.locid = 1;
    this.CurAddress = {
      Title: '',
      Description: '',
      Location: '',
      CustomerId: '',
      Lat: 18.105089,
      Lng: 78.848373,
  };
    this.loadData();
  }

  loadData() {
    this.TokenInfo = this.authService.getTokenInfo();
    this.LocInfo = this.authService.getLocInfo();
    if (this.LocInfo) {
      this.CurAddress.Location = this.LocInfo.Id;
    }
    this.callAddresses();
  }

  callAddresses() {
    this.CurAddress.CustomerId = this.TokenInfo.CustomerId;
    this.http.get<any>(env.API + 'AddressbyCusId/' + this.TokenInfo.CustomerId).subscribe(data => {
      this.allAddress = data;
      },
      err => {
        this.toastr.error( 'Network Error');
      });

  }

  addAddress() {
    this.http.post<any>(env.API + 'AddAddress', this.CurAddress).subscribe(data => {
      if (data) {
        this.toastr.success( 'Successfully Updated Profile');
        this.callAddresses();
    }
    },
  err => {
    this.toastr.error( 'Network Error');
  });
}

RemoveAdd(item) {
  this.http.get<any>(env.API + 'DeleteAddress/' + item.Id).subscribe(data => {
    if (data) {
      this.toastr.success( 'Successfully Deleted');
      this.callAddresses();
    }
    },
    err => {
      this.toastr.error( 'Network Error');
    });
}
SelectAdd(item) {
  if (item.Location) {
    if (item.Location.length <= 0) {
      item.Location = 1;
    }
  } else {
    item.Location = 1;
  }

  this.CurAddress = {
    Id: item.Id,
    Title: item.Title,
    Description: item.Description,
    Location: item.Id,
    CustomerId: this.TokenInfo.CustomerId,
    Lat: 18.105089,
    Lng: 78.848373,
};
}

}
