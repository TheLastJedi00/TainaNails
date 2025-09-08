import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../types/types';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService ) { }

  authenticate(email: string, password: string): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, 
      { email, password },
      { observe: 'response' }).pipe(
        tap((res) => {
          const authToken = res.body?.token || '';
          this.tokenService.saveToken(authToken);
        })
      )
  }
}
