import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { loginup, signUp } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  isLoginError= new EventEmitter<Boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body)); // Optional: Use local storage for persistence
        this.router.navigate(['seller-home']);
      }
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data: loginup) 
  {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&pass=${data.pass}`,
      {observe: 'response' }).subscribe((result:any) => {
          console.warn(result.body)
          if (result && result.body?.length) {
            localStorage.setItem('seller', JSON.stringify(result.body[0]))
            this.router.navigate(['seller-home'])
            this.isLoginError.emit(false)
          } else {
            console.warn("login failed")
            this.isLoginError.emit(true)
          }

      })
    

  }
}



