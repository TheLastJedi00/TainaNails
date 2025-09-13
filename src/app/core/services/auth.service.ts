import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Login } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.default.User | null>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
  ){
    this.user$ = this.auth.authState;
  }

  async login(login: Login): Promise<boolean> {
    try {
      await this.auth.signInWithEmailAndPassword(login.email, login.password);
      this.router.navigate(['/admin']);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  }
  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']); 
    
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}
