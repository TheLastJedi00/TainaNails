import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Login, LoginError } from '../../core/types/types';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ResponseDialogComponent } from "../../shared/response-dialog/response-dialog.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatProgressSpinnerModule,
    ResponseDialogComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  isLoading = false;
  loginError: LoginError  = {message:'', value: false};

  constructor(
    private fb: FormBuilder,
    @Inject(AuthService) private auth: AuthService,
    private router: Router
  ) {}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  getErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      return 'Email é obrigatório';
    }

    return this.loginForm.get('email')?.hasError('email') ? 'Email inválido' : '';
  }

  login(){
    this.isLoading = true;
    const admin: Login = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.auth.login(admin).then((success) => {
      this.isLoading = false;
      if (success) {
        this.router.navigate(['/admin']);
      }
      if (!success) {
        console.error('Email ou senha inválidos');
        this.loginError = {message: 'Email ou senha inválidos', value: true};
      }
    }).catch((error) => {
      this.isLoading = false;
      this.loginError = {message: `Erro no login: ${error}`, value: true};
      console.error('Erro no login:', error);
    });
  }
}
