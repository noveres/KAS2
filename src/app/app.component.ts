import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SnavmenuComponent } from './snavmenu/snavmenu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SnavmenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'KAS2';
}
