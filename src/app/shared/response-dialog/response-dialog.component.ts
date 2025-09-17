import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-response-dialog',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './response-dialog.component.html',
  styleUrl: './response-dialog.component.scss',
})
export class ResponseDialogComponent {
  @Input() matIcon: string = this.data.matIcon;
  @Input() title: string = this.data.title;
  @Input() iconColor: string = this.data.iconColor;
  @Input() description: string = this.data.description ? this.data.description : '';
  @Input() strong: string = this.data.strong ? this.data.strong : '';
  isLoading: boolean = this.data.isLoading;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


}
