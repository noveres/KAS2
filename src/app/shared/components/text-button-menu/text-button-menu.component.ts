import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionMenuItem, ActionMenuComponent } from '../action-menu/action-menu.component';

@Component({
  selector: 'app-text-button-menu',
  standalone: true,
  imports: [CommonModule, ActionMenuComponent],
  templateUrl: './text-button-menu.component.html',
  styleUrls: ['./text-button-menu.component.scss']
})
export class TextButtonMenuComponent {
  @Input() menuItems: ActionMenuItem[] = [];
  @Input() buttonText: string = '';
  @Input() buttonIcon: string = '';
  @Input() position: 'left' | 'right' = 'right';
  @Output() menuItemClicked = new EventEmitter<string>();
  
  @ViewChild('actionMenuRef') actionMenuRef?: ActionMenuComponent;
  
  toggleMenu(event: Event): void {
    if (this.actionMenuRef) {
      this.actionMenuRef.toggleMenu(event);
    }
  }
  
  onMenuItemClick(action: string): void {
    this.menuItemClicked.emit(action);
  }
}
