import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { env } from '../../environments/environment';
import { AllShopsDataService } from './tab1.service';

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
  private filter: Filter;
  shops;
  basePath;
  offers;
  CurrentTime;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private shopsService: AllShopsDataService) {
      this.basePath = env.API;
      const d = new Date();
      const n = d.getMinutes();
      const h = d.getHours();
      this.CurrentTime = h + '.' + n;
      this.CurrentTime = parseFloat(this.CurrentTime);
      this.filter = {
        Preference: false,
  Preference2: false,
  Keyword: '',
  Pagenation: 0,
  ShopsCategories: [],
  ItemCategories: [],
  LocationId: 1
      };
      this.http.post<any>(env.API + 'ShopsWithFilter', this.filter).subscribe(data => {
      this.shops = data;
    });
      this.http.get<any>(env.API + 'GetOffersInHome/' + this.filter.LocationId).subscribe(data => {
      this.offers = data;
    });
  }

  onShopClick(shop) {
    this.shopsService.selShop = shop;
    this.router.navigate(['/tabs/tab1/food-items']);
  }

}
