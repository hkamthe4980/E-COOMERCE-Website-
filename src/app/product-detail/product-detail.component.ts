import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-detail',
  standalone: false,

  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  
  productQuantity: number = 1;
  removeCart = false;
  productData: product | undefined;
  cartData: product|undefined;
  constructor(private activateroute: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let productId = this.activateroute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if(cartData && productId){
        let items = JSON.parse(cartData);
        items = items.filter((item:product)=>productId===item.id.toString());
      
        if(items.length){
          this.removeCart = true;
          
        }
        else{
          this.removeCart = false;
        }


        
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId= user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
        let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
        if(item.length){
          this.cartData=item[0]
          this.removeCart = true;

        }
        })
      }


    })





  }
  productClick(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;

    }
    else if (this.productQuantity > 1 && val === 'minus') {
      this.productQuantity -= 1;
    }

  }
  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity
    }
    if(!localStorage.getItem('user')){
      this.product.addProductCartData(this.productData!)
      this.removeCart=true;
    }
    else{
      console.warn("user is logged");
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id;
      console.warn(userId);
     let  cartData:cart={
      ...this.productData!,
      productId:this.productData!.id,
      
      userId

      }
      console.warn(cartData);
      this.product.addToCart(cartData).subscribe((item)=>{
        if(item){
       this.product.getCartList(userId)
       this.removeCart=true
          

        }
        
      })
      
      


      
    }
   }
   removeToCart(productId:number){
    if( ! localStorage.getItem('user')){
      this.product.removeItemFromCart(productId)
     

    }
    else{
      console.warn("cartData",this.cartData);
      
      
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId)
      })
    }
    this.removeCart=false
  

  }

}

