import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-category.component.html',
  styleUrl: './asset-category.component.scss'
})
export class AssetCategoryComponent {
  constructor() { }
}
