import { Component, OnInit } from '@angular/core';
import { AllShopsDataService } from '../tab1/tab1.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { env } from "../../environments/environment";

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

  constructor(
    private shopsService: AllShopsDataService,
    private http: HttpClient) { }

  ngOnInit() { 
    debugger
    this.basePath = env.API
    this.selShop = this.shopsService.selShop;
    if (this.selShop)
    {
      this.http.get<any>(env.API + "ShopDetailById/"+ this.selShop.Id).subscribe(data => {
        this.getShop = data
      });
      this.http.get<any>(env.API + "getShopItemsForFirstLoad/"+ this.selShop.Id).subscribe(data => {
        this.allItems = data
      });
    }
  }

}
