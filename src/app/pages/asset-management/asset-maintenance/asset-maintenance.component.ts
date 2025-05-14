import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActionMenuComponent } from '../../../shared/components/action-menu/action-menu.component';

interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  custodian: string;
  status: 'normal' | 'repair' | 'borrowed' | 'scrapped';
  acquisitionDate: string;
  value: number;
  checked?: boolean;
}

@Component({
  selector: 'app-asset-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ActionMenuComponent
  ],
  templateUrl: './asset-maintenance.component.html',
  styleUrls: ['./asset-maintenance.component.scss']
})
export class AssetMaintenanceComponent implements OnInit {
  // 用於模板中使用Math函數
  Math = Math;
  
  // 資產列表
  assets: Asset[] = [];
  
  // 搜尋和篩選
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedStatus: string = '';
  
  // 批次處理
  showBatchBar: boolean = false;
  allChecked: boolean = false;
  
  // 分頁
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  
  // 分類選項
  categories = [
    { id: '', name: '所有分類' },
    { id: 'computer', name: '電腦設備' },
    { id: 'office', name: '辦公設備' },
    { id: 'furniture', name: '辦公家具' },
    { id: 'audio', name: '視聽設備' },
    { id: 'mobile', name: '行動裝置' }
  ];
  
  // 狀態選項
  statuses = [
    { id: '', name: '所有狀態' },
    { id: 'normal', name: '正常使用' },
    { id: 'repair', name: '維修中' },
    { id: 'borrowed', name: '借出' },
    { id: 'scrapped', name: '報廢' }
  ];
  
  constructor(private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
    // 生成假資料
    this.generateMockData();
    this.totalItems = this.assets.length;
  }
  
  // 生成假資料
  generateMockData(): void {
    const mockAssets: Asset[] = [
      {
        id: 'A001',
        name: 'Dell XPS 13 筆記型電腦',
        category: '電腦設備',
        location: '台北總部－研發部',
        custodian: '王小明',
        status: 'normal',
        acquisitionDate: '2023-01-15',
        value: 35000
      },
      {
        id: 'A002',
        name: 'HP LaserJet Pro 印表機',
        category: '辦公設備',
        location: '台北總部－行政部',
        custodian: '李小華',
        status: 'repair',
        acquisitionDate: '2022-08-20',
        value: 12000
      },
      {
        id: 'A003',
        name: 'Samsung 55吋液晶顯示器',
        category: '視聽設備',
        location: '台北總部－會議室A',
        custodian: '會議室管理員',
        status: 'normal',
        acquisitionDate: '2023-03-10',
        value: 28000
      },
      {
        id: 'A004',
        name: 'Acer Aspire 桌上型電腦',
        category: '電腦設備',
        location: '台中分部－客服部',
        custodian: '張小龍',
        status: 'borrowed',
        acquisitionDate: '2022-11-05',
        value: 25000
      },
      {
        id: 'A005',
        name: 'Herman Miller Aeron 辦公椅',
        category: '辦公家具',
        location: '台北總部－執行長辦公室',
        custodian: '陳總經理',
        status: 'normal',
        acquisitionDate: '2023-02-28',
        value: 18000
      },
      {
        id: 'A006',
        name: 'Apple iPad Pro',
        category: '行動裝置',
        location: '高雄分部－業務部',
        custodian: '林小美',
        status: 'normal',
        acquisitionDate: '2023-04-15',
        value: 32000
      },
      {
        id: 'A007',
        name: 'Epson 投影機',
        category: '視聽設備',
        location: '台北總部－會議室B',
        custodian: '會議室管理員',
        status: 'scrapped',
        acquisitionDate: '2020-06-10',
        value: 22000
      },
      {
        id: 'A008',
        name: 'Lenovo ThinkPad X1',
        category: '電腦設備',
        location: '台北總部－財務部',
        custodian: '黃小玲',
        status: 'normal',
        acquisitionDate: '2023-05-20',
        value: 42000
      },
      {
        id: 'A009',
        name: 'Canon EOS R5 相機',
        category: '視聽設備',
        location: '台北總部－行銷部',
        custodian: '吳小倩',
        status: 'borrowed',
        acquisitionDate: '2023-01-30',
        value: 95000
      },
      {
        id: 'A010',
        name: 'Microsoft Surface Pro',
        category: '行動裝置',
        location: '台中分部－業務部',
        custodian: '趙小強',
        status: 'normal',
        acquisitionDate: '2022-12-15',
        value: 28000
      },
      {
        id: 'A011',
        name: 'IKEA 辦公桌',
        category: '辦公家具',
        location: '高雄分部－行政部',
        custodian: '公共區域',
        status: 'normal',
        acquisitionDate: '2022-09-05',
        value: 5000
      },
      {
        id: 'A012',
        name: 'Brother 多功能事務機',
        category: '辦公設備',
        location: '台中分部－行政區',
        custodian: '公共設備',
        status: 'repair',
        acquisitionDate: '2021-11-20',
        value: 15000
      }
    ];
    
    // 添加checked屬性
    this.assets = mockAssets.map(asset => ({ ...asset, checked: false }));
  }
  
  // 搜尋資產
  searchAssets(): Asset[] {
    return this.assets.filter(asset => {
      // 搜尋條件
      const matchesSearch = this.searchTerm ? 
        (asset.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         asset.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         asset.custodian.toLowerCase().includes(this.searchTerm.toLowerCase())) : true;
      
      // 分類篩選
      const matchesCategory = this.selectedCategory ? 
        asset.category === this.categories.find(c => c.id === this.selectedCategory)?.name : true;
      
      // 狀態篩選
      const matchesStatus = this.selectedStatus ? 
        asset.status === this.selectedStatus : true;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }
  
  // 取得當前頁面的資產
  get paginatedAssets(): Asset[] {
    const filteredAssets = this.searchAssets();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredAssets.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  // 更新分頁資產列表
  updatePaginatedAssets(): void {
    // 重新計算分頁
    const filteredAssets = this.searchAssets();
    const maxPage = Math.ceil(filteredAssets.length / this.itemsPerPage);
    
    // 確保當前頁不超過最大頁數
    if (this.currentPage > maxPage && maxPage > 0) {
      this.currentPage = maxPage;
    } else if (maxPage === 0) {
      this.currentPage = 1;
    }
  }
  
  // 取得選中的資產數量（所有資產）
  get selectedAssetsCount(): number {
    return this.assets.filter(asset => asset.checked).length;
  }
  
  // 取得篩選後被選中的資產數量
  getFilteredSelectedCount(): number {
    const filteredAssets = this.searchAssets();
    return filteredAssets.filter(asset => {
      // 在原始資產數組中找到對應的資產並檢查其選擇狀態
      const originalAsset = this.assets.find(original => original.id === asset.id);
      return originalAsset?.checked === true;
    }).length;
  }
  
  // 全選/取消全選（僅選擇當前篩選的資產）
  toggleSelectAll(): void {
    // 取得當前篩選後的資產
    const filteredAssets = this.searchAssets();
    
    // 判斷是否全選
    this.allChecked = !this.allChecked;
    
    // 只更新篩選後資產的選擇狀態
    this.assets.forEach(asset => {
      // 檢查資產是否在篩選結果中
      if (filteredAssets.some(filteredAsset => filteredAsset.id === asset.id)) {
        asset.checked = this.allChecked;
      }
    });
    
    this.updateBatchBarVisibility();
  }
  
  // 選擇單個資產
  toggleAssetSelection(asset: Asset): void {
    asset.checked = !asset.checked;
    
    // 取得當前篩選後的資產
    const filteredAssets = this.searchAssets();
    
    // 檢查篩選後的資產是否全部被選中
    this.allChecked = filteredAssets.length > 0 && filteredAssets.every(a => {
      // 在原始資產數組中找到對應的資產並檢查其選擇狀態
      const originalAsset = this.assets.find(original => original.id === a.id);
      return originalAsset?.checked === true;
    });
    
    this.updateBatchBarVisibility();
  }
  
  // 更新批次處理列的可見性
  updateBatchBarVisibility(): void {
    this.showBatchBar = this.selectedAssetsCount > 0;
  }
  
  // 取消所有選擇
  cancelSelection(): void {
    this.assets.forEach(asset => asset.checked = false);
    this.allChecked = false;
    this.showBatchBar = false;
  }
  
  // 批次更新狀態
  batchUpdateStatus(status: string): void {
    const selectedAssets = this.assets.filter(asset => asset.checked);
    selectedAssets.forEach(asset => {
      asset.status = status as 'normal' | 'repair' | 'borrowed' | 'scrapped';
    });
    alert(`已將 ${selectedAssets.length} 個資產狀態更新為 ${this.getStatusName(status)}`);
    this.cancelSelection();
  }
  
  // 批次刪除
  batchDelete(): void {
    if (confirm('確定要刪除選中的資產嗎？此操作無法復原。')) {
      const selectedIds = this.assets.filter(asset => asset.checked).map(asset => asset.id);
      this.assets = this.assets.filter(asset => !asset.checked);
      this.totalItems = this.assets.length;
      alert(`已刪除 ${selectedIds.length} 個資產`);
      this.cancelSelection();
    }
  }
  
  // 獲取狀態名稱
  getStatusName(statusId: string): string {
    return this.statuses.find(s => s.id === statusId)?.name || '';
  }
  
  // 獲取狀態樣式類
  getStatusClass(status: string): string {
    switch(status) {
      case 'normal': return 'status-green';
      case 'repair': return 'status-yellow';
      case 'borrowed': return 'status-blue';
      case 'scrapped': return 'status-red';
      default: return '';
    }
  }
  
  // 分頁 - 上一頁
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  // 分頁 - 下一頁
  nextPage(): void {
    const totalPages = Math.ceil(this.searchAssets().length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
  
  // 導出資料
  exportData(): void {
    this.snackBar.open('資產資料匯出功能開發中', '關閉', {
      duration: 3000
    });
  }
  
  // 處理資產操作選單的動作
  handleAssetAction(action: string, asset: Asset): void {
    switch(action) {
      case 'view':
        this.snackBar.open(`查看資產: ${asset.name}`, '關閉', { duration: 2000 });
        break;
      case 'edit':
        this.snackBar.open(`編輯資產: ${asset.name}`, '關閉', { duration: 2000 });
        break;
      case 'history':
        this.snackBar.open(`查看操作歷史: ${asset.name}`, '關閉', { duration: 2000 });
        break;
      case 'print':
        this.snackBar.open(`列印條碼: ${asset.id}`, '關閉', { duration: 2000 });
        break;
      case 'qrcode':
        this.snackBar.open(`產生QR碼: ${asset.id}`, '關閉', { duration: 2000 });
        break;
      case 'delete':
        if (confirm(`確定要刪除資產 ${asset.name} 嗎？此操作無法復原。`)) {
          this.assets = this.assets.filter(a => a.id !== asset.id);
          this.totalItems = this.assets.length;
          this.updatePaginatedAssets();
          this.snackBar.open(`已刪除資產: ${asset.name}`, '關閉', { duration: 2000 });
        }
        break;
      default:
        break;
    }
  }
}
