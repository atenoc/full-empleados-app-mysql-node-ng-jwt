import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URI = 'http://localhost:4000/api/seguridad';

  constructor(private http: HttpClient, private router:Router) { }

  registro(user){
    return this.http.post<any>(this.URI + '/registro', user)
  }

  login(user){
    console.log("user service: "+ JSON.stringify(user))
    return this.http.post<any>(this.URI + '/login', user)
  }

  estaLogueado(){
    return !!localStorage.getItem('token')  // comprobamos si existe el token para retornar true:false
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}

