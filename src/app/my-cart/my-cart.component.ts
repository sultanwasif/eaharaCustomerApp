import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { env } from '../../environments/environment';
import { Router } from '@angular/router';
import { AllShopsDataService } from '../tab1/tab1.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {


  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private shopsService: AllShopsDataService) { }
  CurrentTime;
  ordersToCheckout = [];
  Total;
  SubTotal;
  TotalDeliveryCharge;
  basePath;
  Shop;
  AbvAverage;

  ngOnInit() {
    this.inItCart();
  }

  inItCart() {
    this.basePath = env.API;
    this.ordersToCheckout = [];
    this.Total = 0;
    this.SubTotal = 0;
    this.TotalDeliveryCharge = 0;
    this.AbvAverage = 0;
    const cart = this.authService.getCart();
    if (cart.length > 0) {
        this.ordersToCheckout = cart;
        this.http.get<any>(env.API + 'ShopDetailById/' + this.ordersToCheckout[0].ShopId).subscribe(data => {
                if (data) {
                    this.authService.selShop = data;
                    this.Shop = data;
                    this.mycartinit();
                }
              });
    }
  }

  mycartinit() {
    const d = new Date();
    const n = d.getMinutes();
    const h = d.getHours();
    this.CurrentTime = h + '.' + n;
    this.CurrentTime = parseFloat(this.CurrentTime);
    if (this.ordersToCheckout) {
      if (this.Shop) {
                    if (this.Shop.StartTime > this.CurrentTime || this.Shop.EndTime < this.CurrentTime) {
                      this.toastr.error( 'Shop Closed Cannot Process Now');
                      this.ordersToCheckout = [];
                      this.authService.setCart(this.ordersToCheckout);
                      // this.InitCart();
                      this.router.navigate(['/tabs/tab1']);
                    }
                } else {
                  this.toastr.error( 'Shop Closed Cannot Process Now');
                  this.ordersToCheckout = [];
                  this.authService.setCart(this.ordersToCheckout);
                  // this.InitCart();
                  this.router.navigate(['/tabs/tab1']);
                }

      for (const e of this.ordersToCheckout) {
            if (e) {
              this.http.get<any>(env.API + 'GetItemInCart/' + e.Id).subscribe(data => {
                    if (data) {
                        const item = data;
                        if (item.InActive === true) {
                          this.toastr.error( 'Item ' + e.Name + ' Not Available');
                          const index1 = this.ordersToCheckout.indexOf(e);
                          this.ordersToCheckout.splice(index1, 1);
                          this.authService.setCart(this.ordersToCheckout);
                          // InitCart();
                          this.mycartinit();
                        } else {
                            e.DiscountPrice = item.OfferPrice;
                            e.Price = item.Price;
                        }
                    } else {
                      this.toastr.error( 'Item ' + e.Name + ' Not Available');
                      const index1 = this.ordersToCheckout.indexOf(e);
                      this.ordersToCheckout.splice(index1, 1);
                      this.authService.setCart(this.ordersToCheckout);
                      // this.InitCart();
                      this.mycartinit();
                    }
                }, err => {
                  this.toastr.error( 'Network Error');
                });
            }
        }
      this.calOrder();
    }
}

calOrder() {
  this.Total = 0;
  this.TotalDeliveryCharge = 0;
  this.SubTotal = 0;
  this.AbvAverage = 0;

  for (const e of this.ordersToCheckout) {
            this.SubTotal = this.SubTotal + (e.Quantity * e.DiscountPrice);
            this.TotalDeliveryCharge = e.DelCharge;
        }
  this.SubTotal = Math.round(this.SubTotal * 100) / 100;
  this.Total = this.TotalDeliveryCharge + this.SubTotal;
  this.AbvAverage = this.Total - this.Shop.AverageCost;
}


dcrQty(data) {
  if (data.Quantity - 1 !== 0) {
      data.Quantity = data.Quantity - 1;
      this.updateCart();
  }
}

incrQty(data) {
  data.Quantity = data.Quantity + 1;
  this.updateCart();
}

updateCart() {
  this.authService.setCart(this.ordersToCheckout);
  this.mycartinit();
}

removeCart(data) {

  for (const e of this.ordersToCheckout) {
      if (data) {
          const index1 = this.ordersToCheckout.indexOf(e);
          this.ordersToCheckout.splice(index1, 1);
      } else
      if (e.Id === data.Id) {
          const index = this.ordersToCheckout.indexOf(data);
          this.ordersToCheckout.splice(index, 1);
      }

  }

  this.updateCart();
}
viewFromCart() {
  this.router.navigate(['/tabs/tab1/check-out']);
  // $state.go('packagesDetail', {
  //     PackageId: data.Id
  // });
}

continueShop() {
  this.authService.selShop = this.Shop;
  this.router.navigate(['/tabs/tab1/food-items']);

}

}
