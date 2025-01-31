import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  standalone: false,
  
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent {
  orderData:order[]|undefined
  constructor( private product:ProductService){}
  ngOnInit():void{
    this.product.orderList().subscribe((result)=>{
      this.orderData=result

    })
  }
  cancelOrder(orderId:number|undefined){
   orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
      this. getOrderList()
        
      }
    })

    
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result

  })
}

}
