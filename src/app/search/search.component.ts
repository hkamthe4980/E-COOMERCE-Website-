import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  standalone: false,
  
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  productResult:undefined|product[];
  searchMessage: string | undefined;
  constructor(private activatedRoute:ActivatedRoute, private product: ProductService){}
  ngOnInit():void{
    let query= this.activatedRoute.snapshot.paramMap.get('query')
    console.warn(query);
    if(query){
    query &&this.product.searchProduct(query).subscribe((result)=>{
      if(result.length>0){
        this.productResult=result;
      }
      else{
        this.productResult=[];
        
        this.searchMessage=("Cannot show data in database")

      }
      })
  }
   

  }

}
