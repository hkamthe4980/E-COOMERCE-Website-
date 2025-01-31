import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: false,
  
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  messageadd:string|undefined
  constructor(private product:ProductService){}
  submit(data:product){

    this.product.addProduct(data).subscribe((result)=>
    {
      console.warn(result)
      if(result){
        this.messageadd=("Data added succesfully");
      }
    });
    setTimeout(()=>{
      this.messageadd;
    },3000)
  }

}
