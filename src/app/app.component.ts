import { Component } from '@angular/core';
import { ViewComponent } from './modules/home/components/view/view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'media-matcher';
}
