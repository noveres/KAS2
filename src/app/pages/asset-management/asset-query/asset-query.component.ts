import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-query',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-query.component.html',
  styleUrl: './asset-query.component.scss'
})
export class AssetQueryComponent {
  constructor() { }
}
