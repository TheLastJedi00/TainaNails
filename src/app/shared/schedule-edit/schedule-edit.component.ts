import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-schedule-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgIf,
    FormsModule
],
  templateUrl: './schedule-edit.component.html',
  styleUrl: './schedule-edit.component.scss'
})
export class ScheduleEditComponent {
  valueName: string = this.data.name;
  valuePhone: string = this.data.phone;


  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: {id: number, name: string, phone: string}) {}



}
