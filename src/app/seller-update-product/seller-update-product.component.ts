import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: false,
  
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData:undefined | product
   messageadd:string | undefined
  productMessage: string | undefined;

  constructor(private route:ActivatedRoute,private product:ProductService){}

  ngOnInit():void{
    let prouductid = this.route.snapshot.paramMap.get('id');
    console.warn(prouductid);
    prouductid && this.product.getProduct(prouductid).subscribe((data)=>{
       console.warn(data);
       this.productData=data
       
    })
    
  }
  submit(data:any){
   if(this.productData){
    data.id=this.productData.id;
   }
   this.product.updateProduct(data).subscribe((result)=>{
    if(result){
      this.productMessage="Product Data Updated"
    }

   })
   setTimeout(() => {
    this.productMessage=undefined
    
   }, 3000);
   console.warn(data);
   

}
}
