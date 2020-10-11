import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { env } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  ordersToCheckout = [];
  Customer;
  TokenInfo;
  LocInfo;
  SubTotal = 0;
  WalletCash = 0;
  TotalDeliveryCharge = 0;
  basePath;
  Total;
  Shop;
  CompanyProfile;
  Booking;
  latitude: any = 0; // latitude
  longitude: any = 0; // longitude

// Booking = {
//     Description: '',
//     Remarks: '',
//     Time: '',
//     Name: '',
//     MobileNo: '',
//     EmailId: '',
//     Address: '',
//     Lat: '',
//     Lng: '',
//     Code: '',
//     LocationId: '',
//     IsOffer: false,
//     AddressId: 0,
//     OrderDate: new Date(),
//     PromoOfferId: 0,
//     Total : 0,
//     TotalDeliveryCharge: 0,
//     SubTotal: 0,
//     WalletCash: 0,
//     PromoOfferPrice: 0,
//     ShopId: 0,
//     CustomerId: 0,
//     Month: 0,
//     Day: 0,
//     Year: 0,
//     Hour: 0,
//     Minutes: 0,
//     BookingDetails: []
// };
  Offer: any;
  Total2: any;

  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600
  };

  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    this.TokenInfo = this.authService.getTokenInfo();
    this.LocInfo = this.authService.getLocInfo();
    this.getCurrentCoordinates();
    this.http.get<any>(env.API + 'CustomerById/' + this.TokenInfo.CustomerId).subscribe(data => {
      this.Customer = data;
      this.inItCart();
  },
  err => console.log(err),
  );
    this.http.get<any>(env.API + 'GetCompanyProfile').subscribe(data => {
    this.CompanyProfile = data;
},
err => console.log(err),
);
    this.Booking = {
  Description: '',
  Remarks: '',
  Time: '',
  Name: '',
  MobileNo: '',
  EmailId: '',
  Address: '',
  Lat: 18.1019,
  Lng: 78.8521,
  Code: '',
  LocationId: this.LocInfo.LocationId,
  IsOffer: false,
  AddressId: 0,
  OrderDate: new Date(),
};


  }

  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddress(this.latitude, this.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getAddress(lat, long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((res: NativeGeocoderResult[]) => {
      this.Booking.Address = JSON.stringify(res[0]);
      this.Booking.Address = this.pretifyAddress(res[0]);
    })
    .catch((error: any) => {
      // JSON.stringify(error)
      alert('Error getting Address' + error);
    });
  }

  // address
  pretifyAddress(address) {
    const obj = [];
    let data = '';
    for (const key in address) {
      if (key) {
        obj.push(address[key]);
      }
    }
    obj.reverse();
    for (const val in obj) {
      if (obj[val].length) {
      data += obj[val] + ', ';
      }
    }
    // return address.slice(0, -2);
    return data.slice(0, -2);
  }

    inItCart() {
    this.basePath = env.ImgPath;
    this.ordersToCheckout = [];
    this.Total = 0;
    this.SubTotal = 0;
    this.TotalDeliveryCharge = 0;
    const cart = this.authService.getCart();
    if (cart) {
    if (cart.length > 0) {
        this.ordersToCheckout = cart;
        this.http.get<any>(env.API + 'ShopDetailById/' + this.ordersToCheckout[0].ShopId).subscribe(data => {
                if (data) {
                    this.authService.selShop = data;
                    this.Shop = data;
                    this.calOrder();
                }
              });
    }
  }
  }

  calOrder() {
    this.Total = 0;
    this.TotalDeliveryCharge = 0;
    this.SubTotal = 0;
    for (const e of this.ordersToCheckout) {
              this.SubTotal = this.SubTotal + (e.Quantity * e.DiscountPrice);
              this.TotalDeliveryCharge = e.DelCharge;
          }
    this.SubTotal = Math.round(this.SubTotal * 100) / 100;
    this.Total = this.TotalDeliveryCharge + this.SubTotal;
  }

  chkPromoCode() {
          if (!this.Booking.Code) {
        this.toastr.error( 'Invalid Code !');
      } else {
          this.Booking.IsOffer = false;
          this.http.get<any>(env.API + 'CheckPromoOffersByCusId/' + this.Booking.Code + '/' + this.TokenInfo.CustomerId).subscribe(data => {
            if (data) {
                      if (data.Id > 0) {

                          // if (this.Total <= data.MaxValue) {
                          //   this.toastr.success( 'Offer Applied !');
                          //   this.Offer = data;
                          //   this.Booking.IsOffer = true;
                          //   this.ApplyOffer();
                          // } else {
                          //   this.toastr.error( 'To Avail Promo-Discount, Make order Below * ' + data.MaxValue);
                          // }
                          this.toastr.success( 'Offer Applied !');
                          this.Offer = data;
                          this.Booking.IsOffer = true;
                          this.ApplyOffer();

                      } else {
                        this.toastr.error( 'Promo code has already been availed');
                      }
                  } else {
                    this.toastr.error( 'Invalid Promo Code, please enter correct code to avail discount.');
                  }
              },
              err => {
                this.toastr.error( 'Network Error');
              });
      }
  }

  ApplyOffer() {
    this.Offer.IsSelected = true;
    this.Booking.PromoOfferId = this.Offer.Id;

    this.Total = 0;
    this.SubTotal = 0;
    this.TotalDeliveryCharge = 0;
    for (const e of this.ordersToCheckout ) {
                    this.SubTotal = this.SubTotal + (e.Quantity * e.DiscountPrice);
                    this.TotalDeliveryCharge = e.DelCharge;
                    this.SubTotal = Math.round(this.SubTotal * 100) / 100;

                    this.Total = (this.TotalDeliveryCharge + this.SubTotal) - this.WalletCash;

                    // this.SelectedShopId = e.ShopId;
                }

    this.Total2 = this.SubTotal;
    if (this.Offer.IsPercentage) {
      let offervalue = (this.SubTotal * this.Offer.Value) / 100;
      if (offervalue > this.Offer.MaxValue) {
          offervalue = this.Offer.MaxValue;
      }
      let price = this.SubTotal - offervalue;
      price = Math.round(price * 100) / 100;
      this.SubTotal = price;
      this.Total = (this.TotalDeliveryCharge + this.SubTotal) - this.WalletCash;
        } else {
                  if (this.Offer.Value > this.Offer.MaxValue) {
                    this.Offer.Value = this.Offer.MaxValue;
                }
                  this.SubTotal = this.SubTotal - this.Offer.Value;
                  this.Total = (this.TotalDeliveryCharge + this.SubTotal) - this.WalletCash;
                }
  }

  RemoveOffer() {
    this.Total = 0;
    this.SubTotal = 0;
    this.TotalDeliveryCharge = 0;
    for (const e of this.ordersToCheckout) {
        this.SubTotal = this.SubTotal + (e.Quantity * e.DiscountPrice);
        this.TotalDeliveryCharge = e.DelCharge;
        this.SubTotal = Math.round(this.SubTotal * 100) / 100;
        this.Total = (this.TotalDeliveryCharge + this.SubTotal) - this.WalletCash;
    }


    this.Total2 = this.SubTotal;
    this.Booking.IsOffer = false;
    this.Booking.PromoOfferId = '';
    this.Booking.Code = '';

}

  UseWallet() {
    // this.WalletCash = this.Customer.Points;
    // this.Total = (this.TotalDeliveryCharge + this.SubTotal) - this.WalletCash;
    let pts = 0;
    if (this.Customer.Points >= this.CompanyProfile.WalletLimit) {
                    pts = this.CompanyProfile.WalletLimit;
                } else {
                    pts = this.Customer.Points;
                }
    this.WalletCash = pts;
    this.Total = (this.TotalDeliveryCharge + this.SubTotal) - this.WalletCash;

  }

  PlaceOrder() {

    if (this.Booking.Address) {
      this.PlaceYourOrder();
    } else {
      this.toastr.error( 'Enter Address');
    }

}


  PlaceYourOrder() {

    this.Booking.BookingDetails = [];

    for (const e of this.ordersToCheckout) {
        const data = {
            Quantity: e.Quantity,
            Price: e.Price,
            TotalPrice: (e.DiscountPrice * e.Quantity),
            DiscountPrice: e.DiscountPrice,
            DelCharge: e.DelCharge,
            ItemId: e.Id,
            ShopId: e.ShopId
        };
        this.Booking.BookingDetails.push(data);
    }

    this.Booking.Total = this.Total;
    this.Booking.ShopId = this.Shop.Id;
    this.Booking.TotalDeliveryCharge = this.TotalDeliveryCharge;
    this.Booking.SubTotal = this.SubTotal;
    this.Booking.WalletCash = this.WalletCash;
    if (this.Booking.PromoOfferId > 0) {
        this.Booking.PromoOfferPrice = this.Total2 - this.SubTotal;
    }
    this.Booking.CustomerId = this.TokenInfo.CustomerId;
    this.Booking.Month = this.Booking.OrderDate.getMonth() + 1;
    this.Booking.Day = this.Booking.OrderDate.getDate();
    this.Booking.Year = this.Booking.OrderDate.getFullYear();
    this.Booking.Hour = this.Booking.OrderDate.getHours();
    this.Booking.Minutes = this.Booking.OrderDate.getMinutes();


    this.http.post<any>(env.API + 'AddBooking', this.Booking).subscribe(data => {
      if (data) {
        if (data.Id > 0) {
          this.toastr.success( 'Booking Successfully Added With Referance No : ' + data.RefNo);
          this.ordersToCheckout = [];
          this.authService.setCart(this.ordersToCheckout);
          this.router.navigate(['/tabs/tab1']);
        } else if (data.Id === -1) {
          this.toastr.error( data.Description);
        } else {
          this.toastr.error('Network Error');
        }} else {
          this.toastr.error('Network Error');
        }
    }, err => {
      this.toastr.error('Network Error');
    });

}

ViewCart() {
  this.router.navigate(['/tabs/tab1/my-cart']);
}

}
