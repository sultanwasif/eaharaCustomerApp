import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { env } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  CurrentTime;
  ordersToCheckout = [];
  Total;
  SubTotal;
  TotalDeliveryCharge;
  SelectedShopId;
  Shop;


  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {}

  mycartinit() {
    const d = new Date();
    const n = d.getMinutes();
    const h = d.getHours();
    this.CurrentTime = h + '.' + n;
    this.CurrentTime = parseFloat(this.CurrentTime);

    this.ordersToCheckout = [];
    this.Total = 0;
    this.SubTotal = 0;
    this.TotalDeliveryCharge = 0;
    const cart = this.authService.getCart();
    if (cart) {
        this.ordersToCheckout = cart;

        if (this.ordersToCheckout) {
          this.http.get<any>(env.API + 'GetShopInCart/' + this.ordersToCheckout[0].ShopId).subscribe(data => {
                if (data) {
                    const Shop = data;
                    if (Shop.StartTime > this.CurrentTime || Shop.EndTime < this.CurrentTime) {
                      this.toastr.error('Error', 'Shop Closed Cannot Process Now');
                      this.ordersToCheckout = [];
                      this.authService.setCart(this.ordersToCheckout);
                      // this.InitCart();
                      this.router.navigate(['/tabs/tab1']);
                    }
                } else {
                  this.toastr.error('Error', 'Shop Closed Cannot Process Now');
                  this.ordersToCheckout = [];
                  this.authService.setCart(this.ordersToCheckout);
                  // this.InitCart();
                  this.router.navigate(['/tabs/tab1']);
                }
            }, err => {
              this.toastr.error('Error', 'Network Error');
            });
        }

        for (const e of this.ordersToCheckout) {
            if (e != null) {
              this.http.get<any>(env.API + 'GetItemInCart/' + e.Id).subscribe(data => {
                    if (data) {
                        const item = data;
                        if (item.InActive === true) {
                          this.toastr.error('Error', 'Item ' + e.Name + ' Not Available');
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
                      this.toastr.error('Error', 'Item ' + e.Name + ' Not Available');
                      const index1 = this.ordersToCheckout.indexOf(e);
                      this.ordersToCheckout.splice(index1, 1);
                      this.authService.setCart(this.ordersToCheckout);
                      // this.InitCart();
                      this.mycartinit();
                    }
                }, err => {
                  this.toastr.error('Error', 'Network Error');
                });

                //                            this.SubTotal = this.SubTotal + (e.Quantity * e.DiscountPrice);
                //                            this.TotalDeliveryCharge = e.DelCharge;
                //                            this.SubTotal = Math.round(this.SubTotal * 100) / 100;
                //
                //                            this.Total = this.TotalDeliveryCharge + this.SubTotal;

              this.SelectedShopId = e.ShopId;
            }
        }

        this.Total = 0;
        this.TotalDeliveryCharge = 0;
        this.SubTotal = 0;

        for (const e of this.ordersToCheckout) {
            this.SubTotal = this.SubTotal + (e.Quantity * e.DiscountPrice);
            this.TotalDeliveryCharge = e.DelCharge;
            this.SubTotal = Math.round(this.SubTotal * 100) / 100;
            this.Total = this.TotalDeliveryCharge + this.SubTotal;
        }

        this.Shop = {};
        this.http.get<any>(env.API + 'ShopDetailById/' + this.SelectedShopId).subscribe(data => {
            this.Shop = data;
        }, err => {});

    }
}

}
