import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private seller: SellerService, private router: Router) {}

  canActivate() {
    if(localStorage.getItem('seller')){
      return true;
    }
    return this.seller.isSellerLoggedIn
  }
}
