import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: false,

  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) { }
  ngOnInit(): void {
    this.updateSummary();
}
  checkout() {
    this.router.navigate(['/checkout'])

  }
  removeToCart(itemId: number | undefined) {
    itemId && this.product.removeToCart(itemId).subscribe(() => {
      console.warn("data deleted");
      this.updateSummary();
      

    })


  }
  RefrehPage() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
   
     })
  }
  updateSummary(){
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * item.quantity)
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = this.cartData.length === 0 ? 0 : 100;
      this.priceSummary.total = this.cartData.length === 0 ? 0 : price + (price / 10) + 100 - (price / 10)
      console.warn(this.priceSummary);
      this.RefrehPage();
    



    })
  

  }
  
  

}
