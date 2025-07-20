import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent);
  }
}
