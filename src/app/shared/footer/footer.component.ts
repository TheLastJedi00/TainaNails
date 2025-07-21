import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ MatButtonModule, RouterModule, MatIconModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}
  
    openDialog() {
      this.dialog.open(DialogComponent);
    }
}
