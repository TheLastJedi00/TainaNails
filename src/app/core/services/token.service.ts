import { Injectable } from '@angular/core';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string){
    return localStorage.setItem(TOKEN, token);
  }

  deleteToken(){
    return localStorage.removeItem(TOKEN);
  }

  getToken(){
    return localStorage.getItem(TOKEN) ?? '';
  }

  hasToken(){
    return !!this.getToken();
  }
}
