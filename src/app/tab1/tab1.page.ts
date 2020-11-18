import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { env } from '../../environments/environment';
import { AllShopsDataService } from './tab1.service';
import { AuthService } from '../core/auth.service';
import { IonInfiniteScroll } from '@ionic/angular';

interface Filter  {
  Preference: boolean;
  Preference2: boolean;
  Keyword: string;
  Pagenation: number;
  ShopsCategories: any;
  ItemCategories: any;
  LocationId: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  private filter: Filter;
  shops;
  basePath;
  offers;
  CurrentTime;
  LocInfo;
  LocationSelected = false;
  srcKeyword = '';
  userFilter: any = { Name: '' };
  paginationmore = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private shopsService: AllShopsDataService,
    private authService: AuthService) {
      // this.basePath = env.ImgPath;
      this.basePath = env.ImgPath;
      this.LocInfo = this.authService.getLocInfo();
      if (this.LocInfo) {
        this.loadData(null);
      } else {
        this.changeLoc();
      }
  }

  ionViewDidEnter() {
    if (this.authService.chkLocationChange === true) {
      this.authService.chkLocationChange = false;
      this.loadData(null);
    }
  }

  loadData(event) {
    this.paginationmore = 0;
    this.srcKeyword = '';
    const d = new Date();
    const n = d.getMinutes();
    const h = d.getHours();
    this.CurrentTime = h + '.' + n;
    this.CurrentTime = parseFloat(this.CurrentTime);
    if (this.LocInfo) {
      this.LocationSelected = true;
      this.http.get<any>(env.API + 'GetOffersInHome/' + this.LocInfo.Id).subscribe(data => {
      this.offers = data;
    });

      this.filter = {
      Preference: false,
Preference2: false,
Keyword: '',
Pagenation: this.paginationmore,
ShopsCategories: [],
ItemCategories: [],
LocationId: this.LocInfo.Id
    };
      this.http.post<any>(env.API + 'ShopsWithFilter', this.filter).subscribe(data => {
      this.shops = data;
    });

  }
    if (event) {
    event.target.complete();
  }
  }

  onShopClick(shop) {
    this.authService.selShop = shop;
    this.router.navigate(['/tabs/tab1/food-items']);
  }

  ViewCart() {
    this.router.navigate(['/tabs/tab1/my-cart']);
  }
  vwSearch() {
    this.router.navigate(['/tabs/tab1/search-global']);
  }
  changeLoc() {
    this.router.navigate(['/tabs/tab1/change-location']);
  }
  onOfferClick(shop) {
    let shopnew: {} = {};
    shopnew = {
      Id : shop.ShopId
    };
    this.authService.selShop = shopnew;
    this.router.navigate(['/tabs/tab1/food-items']);
  }
  onSearch() {
    if (this.srcKeyword.length > 0) {
    this.http.get<any>(env.API + 'ShopsByKeyword/' + this.srcKeyword + '/' + this.LocInfo.Id ).subscribe(data => {
      this.shops = data;
      },
      err => {
        this.toastr.error( 'Network Error');
      });
    } else {
      this.loadData(null);
    }
  }

  doInfinite(event) {
    this.paginationmore = this.paginationmore + 20;
    this.filter = {
      Preference: false,
Preference2: false,
Keyword: '',
Pagenation: this.paginationmore,
ShopsCategories: [],
ItemCategories: [],
LocationId: this.LocInfo.Id
    };
    this.http.post<any>(env.API + 'ShopsWithFilter', this.filter).subscribe(data => {
      if (data.length > 0) {
        for (const e of data) {
          this.shops.push(e);
        }
        event.target.complete();
      } else {
        event.target.disabled = true;
      }
    });
  }

}
