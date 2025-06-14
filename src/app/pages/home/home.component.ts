import { Component } from '@angular/core';
import { SmartContainerComponent } from "../../shared/smart-container/smart-container.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SmartContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
