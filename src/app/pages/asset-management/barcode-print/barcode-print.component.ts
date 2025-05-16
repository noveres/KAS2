import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AssetCategory {
  id: string;
  name: string;
  icon: string;
}

interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  custodian: string;
  addDate: string;
  selected?: boolean;
}

@Component({
  selector: 'app-barcode-print',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './barcode-print.component.html',
  styleUrls: ['./barcode-print.component.scss']
})
export class BarcodePrintComponent implements OnInit {
  // 搜尋相關
  searchTerm = '';
  filteredAssets: Asset[] = [];

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

  // 條碼選項
  printQRCode = false;
  includeAssetInfo = true;

  // 資產資料
  assets: Asset[] = [
    {
      id: 'A008',
      name: 'Lenovo ThinkPad X1 Carbon 筆記型電腦',
      category: '電腦設備',
      location: '台北總部 - 業務部',
      custodian: '陳小華',
      addDate: '2024-05-06'
    },
    {
      id: 'A009',
      name: 'Brother MFC-L3750CDW 多功能印表機',
      category: '辦公設備',
      location: '台北總部 - 行政部',
      custodian: '行政部共用',
      addDate: '2024-05-06'
    },
    {
      id: 'A010',
      name: 'ASUS ProArt 顯示器',
      category: '電腦設備',
      location: '台北總部 - 設計部',
      custodian: '林小美',
      addDate: '2024-05-06'
    },
    {
      id: 'A011',
      name: 'Logitech MX Master 3 無線滑鼠',
      category: '電腦周邊',
      location: '台北總部 - 研發部',
      custodian: '王小明',
      addDate: '2024-05-06'
    },
    {
      id: 'A012',
      name: 'Microsoft Surface Pro 8',
      category: '行動裝置',
      location: '台北總部 - 執行長辦公室',
      custodian: '陳總經理',
      addDate: '2024-05-06'
    }
  ];

  constructor() {
    this.filteredAssets = this.assets;
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  // 搜尋和篩選
  applyFilters(): void {
    this.filteredAssets = this.assets.filter(asset => {
      const matchesSearch = !this.searchTerm ||
        asset.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        asset.custodian.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = !this.selectedCategoryName ||
        asset.category === this.selectedCategoryName;

      return matchesSearch && matchesCategory;
    });
  }

  // 分類下拉選單
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
    this.applyFilters();
  }

  getCategoryIcon(categoryId: string): string {
    const category = this.assetCategories.find(c => c.id === categoryId);
    return category?.icon || 'fas fa-tag';
  }

  // 資產選擇
  toggleAllAssets(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.filteredAssets.forEach(asset => asset.selected = checkbox.checked);
  }

  toggleAsset(asset: Asset): void {
    asset.selected = !asset.selected;
  }

  // 匯出功能
  exportAssets(): void {
    const selectedAssets = this.filteredAssets.filter(asset => asset.selected);
    console.log('Exporting assets:', selectedAssets);
  }

  // 列印功能
  printBarcodes(): void {
    const selectedAssets = this.filteredAssets.filter(asset => asset.selected);
    console.log('Printing barcodes:', selectedAssets);
    console.log('Print options:', { printQRCode: this.printQRCode, includeAssetInfo: this.includeAssetInfo });
  }

  // 更新搜尋結果
  onSearchChange(): void {
    this.applyFilters();
  }
}
