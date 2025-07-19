import { Component } from '@angular/core';
import { SmartContainerComponent } from "../../shared/smart-container/smart-container.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../shared/header/header.component";
import {MatListModule} from '@angular/material/list';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SmartContainerComponent, MatButtonModule, MatIconModule, RouterModule, HeaderComponent, MatListModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
