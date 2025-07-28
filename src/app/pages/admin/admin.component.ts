import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from "@angular/material/divider";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatDividerModule,
    CommonModule
],
  providers: [
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  normalDaySlots: number[] = [14, 15, 16, 17, 18];
  wednesdaySlots: number[] = [15, 16, 17, 18];
  saturdaySlots: number[] = [8, 9, 10, 11, 14, 15, 16, 17, 18];
  weekdays: string[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ];

  slotIsAvailable(slot: string): string {
    switch (slot) {}
    return "accent";
  }
}
