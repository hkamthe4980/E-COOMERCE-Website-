import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash ,faEdit,faEye} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-seller-home',
  standalone: false,


  templateUrl: './seller-home.component.html',


  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {

  productList: undefined | product[];

  faTrash = faTrash;
  iconEdit = faEdit;
  faeye=faEye;
  deleteMessage: undefined | string;
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.list();
    
    
  }
  deleteProduct(id: any) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.deleteMessage = "data deleted sucessfully";
      }
      this.list();


    });
    setTimeout(() => {
      this.deleteMessage = undefined;

    }, 3000);
  }
  list() {
    this.product.productList().subscribe((result) => {

      if (result) {
        this.productList = result;
      }
    })

  }

}
