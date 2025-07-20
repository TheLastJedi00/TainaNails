import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule
],
  providers: [ provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
   ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  services: { id: number; name: string }[];

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
   thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });

  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {
    this.services = [
      { id: 1, name: 'Manicure' },
      { id: 2, name: 'Pedicure' },
      { id: 3, name: 'Manicure e Pedicure' },
      { id: 4, name: 'Manicure e Pedicure Decorados' },
      { id: 5, name: 'Manicure Decorado' },
      { id: 6, name: 'Pedicure Decorado' },
      { id: 7, name: 'Manicure em Gel e Pedicure Simples' },
      { id: 8, name: 'Manicure e Pedicure com Esmaltação em Gel' },
      { id: 9, name: 'Manicure com Esmaltação em Gel' },
      { id: 10, name: 'Pedicure com Esmaltação em Gel' },
      { id: 11, name: 'Unhas Postiças' },
      { id: 12, name: 'Unhas Postiças Decoradas' },
      { id: 13, name: 'Unhas Postiças Realistas' },
      { id: 14, name: 'Unhas Postiças Realistas Decoradas' },
      { id: 15, name: 'Blindagem' },
      { id: 16, name: 'Banho de Gel' },
      { id: 17, name: 'Alongamento com fibra de vidro' },
      { id: 18, name: 'Alongamento Model F1' },
      { id: 19, name: 'Alongamento com Tip de Gel' },
      { id: 20, name: 'Alongamento com SoftGel' },
      { id: 21, name: 'Remoção de Alongamento' },
    ];
  }
}
