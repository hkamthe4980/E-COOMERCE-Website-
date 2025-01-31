import { Component } from '@angular/core';

import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';


@Component({
  selector: 'app-seller-auth',
  standalone: false,

  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  showLogin = false;
  authError: string = '';
  constructor(private seller: SellerService) { }
  ngOnit(): void {

    this.seller.reloadSeller();
  }
  sign(data: signUp){
    console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: signUp) {
    

    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Seller is not found"
      }
    })

  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false

  }


}
