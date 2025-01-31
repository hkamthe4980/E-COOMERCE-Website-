import { Component } from '@angular/core';
import { cart, loginup, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: false,
  
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
   showLogin :boolean=true;
   authError: string = '';
email: any;
  constructor(private user:UserService, private product : ProductService){}
  ngOnInit():void{
    this.user.userAuthload();
}
signUp(data:signUp){
 this.user.userSignup(data);
  }
  
login(data: loginup){
    
console.warn(data)

    this.user.userLogin(data)
    this.user.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "User not found"
      }
      else{
        this.localCartToRemote();
      }
    })

  }

  userLogin(){
    this.showLogin=true

  
  }
  userSignup(){
    this.showLogin=false

  }
  localCartToRemote(){
    console.warn("called");
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);
     
      cartDataList.forEach((product:product, index)=>{
        let cartData : cart={
          ...product,
          productId:product.id,
          userId
        }
        delete cartData.id;
       setTimeout(()=>{
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("data is stored in database");
          }
          
          })
       },400)
       if(cartDataList.length===index+1){
         localStorage.removeItem('localCart')

       }

      

      })

    }
    setTimeout(() => {
      this.product.getCartList(userId)
      
    }, 2000);
    
  }

}
