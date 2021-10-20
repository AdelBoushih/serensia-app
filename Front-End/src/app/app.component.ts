import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Serensia App';
  firstName?: string;
  midleName?: string;
  lastName?: string;
  model?: string;
}
