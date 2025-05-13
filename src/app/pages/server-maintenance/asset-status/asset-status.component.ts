import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-status.component.html',
  styleUrl: './asset-status.component.scss'
})
export class AssetStatusComponent {
  constructor() { }
}
