import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  snapshot: any;
  productData: any;
  cartData = new EventEmitter<product[] | []>()



  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    return this.http.post("http://localhost:3000/product", data)
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/product')
  }
  deleteProduct(id: any) {
    return this.http.delete(`http://localhost:3000/product/${id}`)

  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/product/${id}`)
  }
  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/product/${product.id}`, product)
  }
  selectedProduct() {
    return this.http.get<product[]>("http://localhost:3000/product?_limit=3")
  }
  trendyProduct() {
    return this.http.get<product[]>("http://localhost:3000/product?_limit=8")
  }
  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/product?name=${query}`)

  }
  addProductCartData(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData)
    }

  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items)
    }


  }
  addToCart(productCart: cart) {
    return this.http.post("http://localhost:3000/cart", productCart)
  }
  getCartList(userId: number) {
    return this.http.get<product[]>("http://localhost:3000/cart?userId=" + userId, {
      observe: 'response'
    }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body)

      }

    })
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId)

  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<cart[]>("http://localhost:3000/cart?userId=" + userData.id)
  }
   orderNow(data:order){
    return this.http.post("http://localhost:3000/orders",data)


   }

   orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<order[]>("http://localhost:3000/orders?userId=" + userData.id)

   }
   deleteCartItems(cardId:number){
    return this.http.delete('http://localhost:3000/product/'+ cardId).subscribe((result)=>{
       this.cartData.emit([]);
    })


   }
   cancelOrder(orderId:any){
   return this.http.delete('http://localhost:3000/orders/'+orderId);

   }
}
