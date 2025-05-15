import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionMenuComponent } from '../../../shared/components/action-menu/action-menu.component';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, ActionMenuComponent],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent {
  constructor() { }

  handleMenuAction(action: string, inventoryId: string): void {
    switch (action) {
      case 'view':
        console.log(`查看盤點單: ${inventoryId}`);
        // 這裡可以添加查看盤點單的邏輯
        break;
      case 'edit':
        console.log(`編輯盤點單: ${inventoryId}`);
        // 這裡可以添加編輯盤點單的邏輯
        break;
      case 'delete':
        console.log(`刪除盤點單: ${inventoryId}`);
        // 這裡可以添加刪除盤點單的邏輯
        break;
      default:
        break;
    }
  }
}
