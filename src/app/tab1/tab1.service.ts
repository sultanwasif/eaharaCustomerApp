import { Injectable } from "@angular/core";
import { AuthService } from "../core/auth.service";

@Injectable({
  providedIn: "root"
})
export class AllShopsDataService {
  selShop;

  constructor(private authService: AuthService) {
  }

}
