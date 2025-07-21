import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from "../../shared/footer/footer.component";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ MatButtonModule, MatIconModule, RouterModule, HeaderComponent, MatListModule, FooterComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'dialog-component',
    });
  }
}
