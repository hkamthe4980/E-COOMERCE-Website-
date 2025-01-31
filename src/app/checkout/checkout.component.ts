import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: false,

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  totalPrice: number | undefined
  cartData: cart[] | undefined
  orderMsg: string | undefined
  constructor(private product: ProductService, private router: Router) { }


  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {


      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          this.totalPrice = price + (+item.price * item.quantity)
          console.warn(this.totalPrice);

        }
      })



    })



  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)

        }, 7000)
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed"
          setTimeout(() => {
            this.orderMsg = undefined
            this.router.navigate(['/my-order'])

          }, 4000);

        }
      })


    }






  }

}
