import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNAVmenuDropDownComponent } from './layout/sidebar-navmenu-drop-down/sidebar-navmenu-drop-down.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidebarNAVmenuDropDownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'KAS2';
}
