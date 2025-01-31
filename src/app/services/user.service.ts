import { EventEmitter, Injectable } from '@angular/core';
import { loginup, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   isLoginError= new EventEmitter<Boolean>(false)



  constructor(private http: HttpClient, private router: Router) { }
  userSignup(users: signUp) {
    this.http.post('http://localhost:3000/user', users, { observe: 'response' }).subscribe((result) => {
      
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigate(['/'])

      }



    })
  }
 userAuthload(){
  if(localStorage.getItem('user')){
    this.router.navigate(['/']);
  }
 } 
 userLogin(data: loginup) 
   {
     this.http.get<signUp[]>(`http://localhost:3000/user?email=${data.email}&pass=${data.pass}`,
       {observe: 'response' }).subscribe((result: any ) => {
           console.warn(result.body)
           if(result && result.body?.length) {
             localStorage.setItem('user', JSON.stringify(result.body[0]))
             this.router.navigate(['/'])
             this.isLoginError.emit(false)
           } else {
             console.warn("login failed")
             this.isLoginError.emit(true)
           }
 
       })
     
 
   }
}

