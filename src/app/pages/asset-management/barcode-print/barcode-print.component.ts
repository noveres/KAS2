import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barcode-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barcode-print.component.html',
  styleUrl: './barcode-print.component.scss'
})
export class BarcodePrintComponent {
  constructor() { }
}
