import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchResult: undefined | product[]

  menuType: string = 'default';
  sellerName: any;
  cartItems = 0;

  sellerStore: any;
  userData: any;
  userName: any;



  // default: any;
  // seller: any;

  constructor(private route: Router, private product: ProductService) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      console.log(val)
      if (val.url) {
        console.warn(val.url)
        if (localStorage.getItem('seller') && val.url.includes('seller')) {

          this.menuType = 'seller'
          let sellerStore = localStorage.getItem('seller')
          let sellerType = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerType.name
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          this.userData = userStore && JSON.parse(userStore)
          this.userName = this.userData.name;
          this.menuType = 'user'

        }

        else {
          this.menuType = 'default'
        }
      }



    })
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length

    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })



  }
  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/home'])

  }
  userLogout() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }
  serachProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.warn(element.value);
      this.product.searchProduct(element.value).subscribe((result) => {
        console.warn(result)
        this.searchResult = result

      })
    }

  }
  hideData() {
    this.searchResult = undefined
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id])

  }
  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`])


  }

}
