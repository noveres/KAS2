import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-toggle-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-toggle-button.component.html',
  styleUrls: ['./status-toggle-button.component.scss']
})
export class StatusToggleButtonComponent {
  @Input() status: boolean = false;
  @Output() statusChange = new EventEmitter<boolean>();

  onToggle() {
    this.statusChange.emit(!this.status);
  }
}
