import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory-check.component.html',
  styleUrl: './inventory-check.component.scss'
})
export class InventoryCheckComponent {
  constructor() { }
}
