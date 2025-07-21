import { Component, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  timeSlots: number[] = [];
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  normalDaySlots: number[] = [14, 15, 16, 17, 18];
  wednesdaySlots: number[] = [ 15, 16, 17, 18];
  saturdaySlots: number[] = [ 8, 9, 10, 11, 14, 15, 16, 17, 18];
  panelOpenState = false;

  constructor() {}
}
