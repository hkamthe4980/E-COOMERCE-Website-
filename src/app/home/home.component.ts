import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faEye,faCartShopping} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faeye=faEye;
  faCartshopping=faCartShopping;
 popularProduct:undefined|product[]

   trendyProduct:undefined|product[]
  constructor(private productService:ProductService){}
  ngOnInit() :void{
    this.productService.selectedProduct().subscribe((result)=>{
      
      this.popularProduct=result;

    })
    this.productService.trendyProduct().subscribe((data)=>{
      
      this.trendyProduct=data;
  })
}
}
