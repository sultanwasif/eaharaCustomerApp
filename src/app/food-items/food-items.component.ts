import { Component, OnInit } from '@angular/core';
import { AllShopsDataService } from '../tab1/tab1.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { env } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserInfo } from '../core/auth.service';

// interface ICart {
//   Id: string;
//   ShopId: string;
//   Shop: string;
//   Name: string;
//   Price: number;
//   DiscountPrice: number;
//   DelCharge: number;
//   Image: string;
//   Quantity: number;
// }

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.scss'],
})
export class FoodItemsComponent implements OnInit {
  selShop;
  getShop;
  allItems;
  basePath;
  CurrentTime;
  SelectedShopId;
  ToCart;
  ordersToCheckout = [];


  isThere = true;

  constructor(
    private shopsService: AllShopsDataService,
    private http: HttpClient,
    private toastr: ToastrService,
    private authService: AuthService) {
      const d = new Date();
      const n = d.getMinutes();
      const h = d.getHours();
      this.CurrentTime = h + '.' + n;
      this.CurrentTime = parseFloat(this.CurrentTime);
     }

  ngOnInit() {
    this.basePath = env.API;
    this.selShop = this.shopsService.selShop;
    if (this.selShop) {
      this.http.get<any>(env.API + 'ShopDetailById/' + this.selShop.Id).subscribe(data => {
        this.getShop = data;
      });
      this.http.get<any>(env.API + 'getShopItemsForFirstLoad/' + this.selShop.Id).subscribe(data => {
        this.allItems = data;

      });
    }
  }

  myCartInit() {
                const cart = this.authService.getCart();
                if (cart != null && cart.length > 0) {
                    this.ordersToCheckout = cart;
                    for (const e of this.ordersToCheckout) {
                      if (e) {
                        this.SelectedShopId = e.ShopId;
                      }
                    }
                }
  }
  onAddClick(item) {
    if (this.getShop.StartTime > this.CurrentTime || this.getShop.EndTime < this.CurrentTime) {
      this.toastr.error('Error', 'Shop Closed Cannot Process Now');
    } else if (this.getShop.Id !== this.SelectedShopId && this.ordersToCheckout.length > 0) {
      this.toastr.error('Error', '* you cannot add items from multiple resturants in single order');
    } else if (item.InActive === true) {
      this.toastr.error('Error', 'Sorry Item Not Available Now ! ');
    } else {

        this.ToCart = {
            Id: item.Id,
            ShopId: this.getShop.Id,
            Shop: this.getShop.Name,
            Name: item.Name,
            Price: item.Price,
            DiscountPrice: item.OfferPrice,
            DelCharge: this.getShop.DeliveryCharge,
            Image: item.Image,
            Quantity: item.Quantity,
        };

        this.isThere = false;
        for (const e of this.ordersToCheckout) {
            if (e.Id === item.Id) {
                this.isThere = true;
                e.Quantity = e.Quantity + item.Quantity;
                e.Price = item.Price;
                e.DiscountPrice = item.OfferPrice;
            }
        }

        if (this.isThere === false) {
            this.ordersToCheckout.push(this.ToCart);
        }

        this.authService.setCart(this.ordersToCheckout);
        this.myCartInit();

        this.toastr.success('Success', 'Successfully Added to Cart');
    }


}

}
