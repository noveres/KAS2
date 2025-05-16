import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AssetCategory {
  id: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-barcode-print',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barcode-print.component.html',
  styleUrls: ['./barcode-print.component.scss']
})
export class BarcodePrintComponent {
  // 搜尋相關
  searchTerm = '';

  // 分類篩選相關
  selectedCategoryName = '';
  showCategoryDropdown = false;
  assetCategories: AssetCategory[] = [
    { id: 'computer', name: '電腦設備', icon: 'fas fa-laptop' },
    { id: 'office', name: '辦公設備', icon: 'fas fa-print' },
    { id: 'furniture', name: '辦公家具', icon: 'fas fa-chair' },
    { id: 'network', name: '網路設備', icon: 'fas fa-network-wired' },
    { id: 'mobile', name: '行動裝置', icon: 'fas fa-mobile-alt' }
  ];

  // 日期範圍相關
  selectedDateRange = '';

  // 方法
  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  handleCategoryFilter(categoryId: string): void {
    if (categoryId === '') {
      this.selectedCategoryName = '';
    } else {
      const category = this.assetCategories.find(c => c.id === categoryId);
      if (category) {
        this.selectedCategoryName = category.name;
      }
    }
    this.showCategoryDropdown = false;
  }

  getCategoryIcon(categoryId: string): string {
    const category = this.assetCategories.find(c => c.id === categoryId);
    return category?.icon || 'fas fa-tag';
  }

  toggleDatePicker(): void {
    // TODO: 實作日期選擇器
    console.log('Toggle date picker');
  }

  toggleAllAssets(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    // TODO: 實作全選/取消全選功能
    console.log('Toggle all assets:', checkbox.checked);
  }

  constructor() { }
}
