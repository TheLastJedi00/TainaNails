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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;

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

  login(login: string, password: string){
    this.auth.authenticate(login, password).subscribe({
      next: (res) => {
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
      }
    });
  }
}
