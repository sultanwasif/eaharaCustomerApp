import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { env } from 'src/environments/environment';
import { Router } from '@angular/router';
import {groupBy, filter} from 'lodash';
@Component({
  selector: 'app-search-global',
  templateUrl: './search-global.component.html',
  styleUrls: ['./search-global.component.scss'],
})
export class SearchGlobalComponent implements OnInit {
  srcKeyword = '';
  Items;
  CurrentTime;
  SelectedShopId = '';
  ordersToCheckout;
  ToCart;
  isThere: boolean;
  basePath: string;
  Shop;
  items = [];
  showContent = false;
  subContent = false;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    // this.items = [
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false },
    //   { expanded: false }
    // ];
    // this.items[0].open = true;
  }
  // expandItem(item): void {
  //   if (item.expanded) {
  //     item.expanded = false;
  //   } else {
  //     this.items.map(listItem => {
  //       if (item == listItem) {
  //         listItem.expanded = !listItem.expanded;
  //       } else {
  //         listItem.expanded = false;
  //       }
  //       return listItem;
  //     });
  //   }
  // }

  expandItem(index) {
    if (!this.subContent) {
      this.items[index].open = !this.items[index].open;
    }
    this.subContent = false;
  }

  ngOnInit() {
    this.basePath = env.ImgPath;
    const d = new Date();
    const n = d.getMinutes();
    const h = d.getHours();
    this.CurrentTime = h + '.' + n;
    this.CurrentTime = parseFloat(this.CurrentTime);
    this.ordersToCheckout = [];
    this.myCartInit();
  }

  myCartInit() {
    const cart = this.authService.getCart();
    if (cart) {
    if ( cart.length > 0) {
        this.ordersToCheckout = cart;
        this.SelectedShopId = cart[0].ShopId;
        this.http.get<any>(env.API + 'ShopDetailById/' + this.ordersToCheckout[0].ShopId).subscribe(data => {
          if (data) {
              this.Shop = data;
          }
        });
    }
  }
}

  onSearch() {
    this.items = [];
    const LocId = this.authService.getLocInfo();
    this.http.get<any>(env.API + 'ItemsByKeyword/' + this.srcKeyword + '/' + LocId.Id ).subscribe(data => {
      this.Items = data;
      const filterData = filter(this.Items, (allItems) => (allItems.InActive == false));
      // this.Items.filter(
      //   allItems => (allItems.InActive === false && allItems.Shop.IsActive === true)
      // );
      const itemsGroup = Object.values(groupBy(filterData, 'ShopId'));
      for (const shopGroup of itemsGroup) {
        this.items.push({
          shopItems: shopGroup,
          shop: shopGroup[0].Shop.Name,
          open: false
        });
      }
      // map(itemsGroup, itemGroup => {
      //   itemGroup.open = false;
      // });
      this.showContent = true;
      },
      err => {
        this.toastr.error( 'Network Error');
      });

  }

  onAddClick(item) {
    this.subContent = true;
    if (this.SelectedShopId.length === 0) {
      this.SelectedShopId = item.Shop.Id;
      this.http.get<any>(env.API + 'ShopDetailById/' + this.SelectedShopId).subscribe(data => {
        this.Shop = data;
        this.AddItems(item);
      });
    } else {
      this.AddItems(item);
    }
  }

  AddItems(item) {
    if (item.Shop.Id !== this.SelectedShopId && this.ordersToCheckout.length > 0) {
      this.toastr.error('you cannot add items from multiple resturants in single order');
    } else if (this.Shop.StartTime > this.CurrentTime || this.Shop.EndTime < this.CurrentTime) {
      this.toastr.error('Shop Closed Cannot Process Now');
      this.ordersToCheckout = [];
      this.authService.setCart(this.ordersToCheckout);
      this.SelectedShopId = '';
    } else if (item.InActive === true) {
      this.toastr.error('Sorry Item Not Available Now ! ');
    } else {

      this.ToCart = {
        Id: item.Id,
        ShopId: this.Shop.Id,
        Shop: this.Shop.Name,
        Name: item.Name,
        Price: item.Price,
        DiscountPrice: item.OfferPrice,
        DelCharge: this.Shop.DeliveryCharge,
        Image: item.Image,
        Quantity: 1,
    };

      this.isThere = false;
      for (const e of this.ordersToCheckout) {
            if (e.Id === item.Id) {
                this.isThere = true;
                e.Quantity = e.Quantity + 1;
                e.Price = item.Price;
                e.DiscountPrice = item.OfferPrice;
            }
        }

      if (this.isThere === false) {
            this.ordersToCheckout.push(this.ToCart);
        }
      this.authService.setCart(this.ordersToCheckout);
      this.toastr.success( 'Successfully Added to Cart');
    }
  }

GetShopDetails() {
  this.http.get<any>(env.API + 'ShopDetailById/' + this.SelectedShopId).subscribe(data => {
    this.Shop = data;
  });
}


ViewCart() {
  this.router.navigate(['/tabs/tab1/my-cart']);
}

}
