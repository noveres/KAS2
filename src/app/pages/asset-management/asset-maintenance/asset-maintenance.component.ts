import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActionMenuComponent } from '../../../shared/components/action-menu/action-menu.component';
import { ColumnConfig } from './table-config/table-config.component';
import { BatchOperationDialogComponent, BatchOperationDialogData } from '../../../shared/components/batch-operation-dialog/batch-operation-dialog.component';

interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  custodian: string;
  status: 'normal' | 'repair' | 'borrowed' | 'scrapped';
  acquisitionDate: string;
  modifiedDate: string; // 修改日期
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
    MatTooltipModule,
    DragDropModule,
    ActionMenuComponent,
    BatchOperationDialogComponent,
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
  selectedCategoryName: string = '';
  selectedStatus: string = '';

  // 下拉選單狀態
  showCategoryDropdown: boolean = false;
  showStatusDropdown: boolean = false;

  // 資產分類選項
  assetCategories = [
    { id: '電腦設備', name: '電腦設備' },
    { id: '辦公設備', name: '辦公設備' },
    { id: '辦公家具', name: '辦公家具' },
    { id: '視聽設備', name: '視聽設備' },
    { id: '行動裝置', name: '行動裝置' }
  ];

  // 資產狀態選項
  assetStatuses = [
    { id: 'normal', name: '正常使用', icon: 'fas fa-check-circle' },
    { id: 'repair', name: '維修中', icon: 'fas fa-tools' },
    { id: 'borrowed', name: '借出', icon: 'fas fa-hand-holding' },
    { id: 'scrapped', name: '報廢', icon: 'fas fa-trash-alt' }
  ];

  // 排序
  sortField: string = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';

  // 表格列配置
  columnConfigs: ColumnConfig[] = [
    { field: 'checkbox', header: '選擇', visible: true, order: 0 },
    { field: 'id', header: '資產編號', visible: true, order: 1 },
    { field: 'name', header: '資產名稱', visible: true, order: 2 },
    { field: 'category', header: '分類', visible: true, order: 3 },
    { field: 'location', header: '位置', visible: true, order: 4 },
    { field: 'custodian', header: '保管人', visible: true, order: 5 },
    { field: 'status', header: '狀態', visible: true, order: 6 },
    { field: 'acquisitionDate', header: '取得日期', visible: true, order: 7 },
    { field: 'modifiedDate', header: '修改日期', visible: true, order: 8 },
    { field: 'value', header: '價值', visible: true, order: 9 },
    { field: 'actions', header: '操作', visible: true, order: 10 }
  ];

  // 當前顯示的列
  displayedColumns: string[] = [];

  // 批次處理
  showBatchBar: boolean = false;
  allChecked: boolean = false;

  // 分頁
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  // 分類選項
  categories = [
    { id: '', name: '顯示全部分類' },
    { id: 'computer', name: '電腦設備' },
    { id: 'office', name: '辦公設備' },
    { id: 'furniture', name: '辦公家具' },
    { id: 'audio', name: '視聽設備' },
    { id: 'mobile', name: '行動裝置' }
  ];

  // 狀態選項
  statuses = [
    { id: '', name: '顯示全部狀態' },
    { id: 'normal', name: '正常使用' },
    { id: 'repair', name: '維修中' },
    { id: 'borrowed', name: '借出' },
    { id: 'scrapped', name: '報廢' }
  ];

  // 分類選單項目
  categoryMenuItems = [
    { icon: 'fas fa-list', label: '顯示全部分類', action: '' },
    { icon: 'fas fa-laptop', label: '電腦設備', action: '電腦設備' },
    { icon: 'fas fa-print', label: '辦公設備', action: '辦公設備' },
    { icon: 'fas fa-chair', label: '辦公家具', action: '辦公家具' },
    { icon: 'fas fa-tv', label: '視聽設備', action: '視聽設備' },
    { icon: 'fas fa-tablet-alt', label: '行動裝置', action: '行動裝置' }
  ];

  // 狀態選單項目
  statusMenuItems = [
    { icon: 'fas fa-list', label: '顯示全部狀態', action: '' },
    { icon: 'fas fa-check-circle', label: '正常使用', action: 'normal' },
    { icon: 'fas fa-tools', label: '維修中', action: 'repair' },
    { icon: 'fas fa-hand-holding', label: '借出', action: 'borrowed' },
    { icon: 'fas fa-trash-alt', label: '報廢', action: 'scrapped' }
  ];

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    // 生成假資料
    this.generateMockData();
    this.totalItems = this.assets.length;

    // 從 localStorage 讀取用戶表格配置
    this.loadTableConfig();

    // 更新顯示的列
    this.updateDisplayedColumns();
  }

  // 從 localStorage 讀取表格配置
  loadTableConfig(): void {
    const savedConfig = localStorage.getItem('assetTableConfig');
    if (savedConfig) {
      try {
        this.columnConfigs = JSON.parse(savedConfig);
      } catch (e) {
        console.error('解析表格配置失敗', e);
      }
    }
  }

  // 保存表格配置到 localStorage
  saveTableConfig(): void {
    localStorage.setItem('assetTableConfig', JSON.stringify(this.columnConfigs));
  }

  // 更新顯示的列
  updateDisplayedColumns(): void {
    this.displayedColumns = this.columnConfigs
      .filter(col => col.visible)
      .sort((a, b) => a.order - b.order)
      .map(col => col.field);
  }

  // 列配置選單相關
  showColumnMenu: boolean = false;

  // 切換列配置選單顯示/隱藏
  toggleColumnMenu(): void {
    this.showColumnMenu = !this.showColumnMenu;
  }

  // 關閉列配置選單
  closeColumnMenu(): void {
    this.showColumnMenu = false;
  }

  // 處理拖拽事件
  dropColumn(event: CdkDragDrop<ColumnConfig[]>): void {
    moveItemInArray(this.columnConfigs, event.previousIndex, event.currentIndex);
    // 更新順序
    this.columnConfigs.forEach((column, index) => {
      column.order = index;
    });
    this.saveAndUpdateColumns();
  }

  // 檢查是否全部列都被選中
  isAllColumnsSelected(): boolean {
    return this.columnConfigs.every(column => column.visible);
  }

  // 檢查是否部分列被選中
  isPartiallyColumnsSelected(): boolean {
    return this.columnConfigs.some(column => column.visible) && !this.isAllColumnsSelected();
  }

  // 切換全部列的選中狀態
  toggleAllColumns(checked: boolean): void {
    this.columnConfigs.forEach(column => {
      column.visible = checked;
    });
    this.saveAndUpdateColumns();
  }

  // 保存並更新列
  saveAndUpdateColumns(): void {
    this.saveTableConfig();
    this.updateDisplayedColumns();
  }

  // 監聽全局點擊事件，用於關閉選單
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // 關閉列配置選單
    const configMenuContainer = document.querySelector('.config-menu-container');
    if (this.showColumnMenu && configMenuContainer && !configMenuContainer.contains(event.target as Node)) {
      this.closeColumnMenu();
    }
    
    // 關閉分類下拉選單
    const categoryDropdown = document.querySelector('.custom-dropdown:nth-child(1)');
    if (this.showCategoryDropdown && categoryDropdown && !event.composedPath().includes(categoryDropdown as EventTarget)) {
      this.showCategoryDropdown = false;
    }
    
    // 關閉狀態下拉選單
    const statusDropdown = document.querySelector('.custom-dropdown:nth-child(2)');
    if (this.showStatusDropdown && statusDropdown && !event.composedPath().includes(statusDropdown as EventTarget)) {
      this.showStatusDropdown = false;
    }
  }

  // 生成假資料
  generateMockData(): void {
    // 創建基本資產數據
    let mockAssets: Asset[] = [
      {
        id: 'A001',
        name: 'Dell XPS 13 筆記型電腦',
        category: '電腦設備',
        location: '台北總部－研發部',
        custodian: '王小明',
        status: 'normal',
        acquisitionDate: '2023-01-15',
        modifiedDate: '2025-05-01',
        value: 35000
      },
      {
        id: 'A002',
        name: 'HP LaserJet Pro 印表機',
        category: '辦公設備',
        location: '台北總部－行政部',
        custodian: '李小芳',
        status: 'repair',
        acquisitionDate: '2022-11-20',
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
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
        modifiedDate: '2025-04-22',
        value: 15000
      },
      {
      id: 'A001',
      name: 'Dell XPS 13 筆記型電腦',
      category: '電腦設備',
      location: '台北總部－研發部',
      custodian: '王小明',
      status: 'normal',
      acquisitionDate: '2023-01-15',
      modifiedDate: '2025-05-01',
      value: 35000
    },
    {
      id: 'A002',
      name: 'HP LaserJet Pro 印表機',
      category: '辦公設備',
      location: '台北總部－行政部',
      custodian: '李小芳',
      status: 'repair',
      acquisitionDate: '2022-11-20',
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
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
      modifiedDate: '2025-04-22',
      value: 15000
    }
    ];

    // 為所有資產添加修改日期字段（如果沒有的話）
    mockAssets = mockAssets.map(asset => {
      if (!asset.modifiedDate) {
        // 生成隨機的修改日期，在取得日期之後
        const acqDate = new Date(asset.acquisitionDate);
        const modDate = new Date(acqDate);
        modDate.setDate(modDate.getDate() + Math.floor(Math.random() * 365 * 2)); // 最多後移兩年

        // 確保修改日期不超過今天
        const today = new Date();
        const finalModDate = modDate > today ? today : modDate;

        return {
          ...asset,
          modifiedDate: finalModDate.toISOString().split('T')[0] // 格式化為 YYYY-MM-DD
        };
      }
      return asset;
    });

    // 添加checked屬性
    this.assets = mockAssets.map(asset => ({ ...asset, checked: false }));
  }

  // 搜尋資產
  searchAssets(): Asset[] {
    // 先篩選
    const filteredAssets = this.assets.filter(asset => {
      // 檢查資產名稱或ID是否包含搜尋字詞
      const matchesSearch = this.searchTerm === '' ||
        asset.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        asset.id.toLowerCase().includes(this.searchTerm.toLowerCase());

      // 檢查資產分類是否符合篩選
      const matchesCategory = this.selectedCategory === '' || asset.category === this.selectedCategory;

      // 檢查資產狀態是否符合篩選
      const matchesStatus = this.selectedStatus === '' || asset.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // 再排序
    return this.sortAssets(filteredAssets);
  }

  // 排序資產
  sortAssets(assets: Asset[]): Asset[] {
    return [...assets].sort((a, b) => {
      let valueA: any = a[this.sortField as keyof Asset];
      let valueB: any = b[this.sortField as keyof Asset];

      // 如果是日期字串，轉換為 Date 對象進行比較
      if (this.sortField === 'acquisitionDate' || this.sortField === 'modifiedDate') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      // 如果是數字字串，轉換為數字
      if (typeof valueA === 'string' && !isNaN(Number(valueA))) {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }

      // 如果是字串，使用 localeCompare 進行比較
      if (typeof valueA === 'string') {
        const result = valueA.localeCompare(valueB);
        return this.sortDirection === 'asc' ? result : -result;
      }

      // 其他類型直接比較
      const result = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  // 切換排序方向
  toggleSort(field: string): void {
    if (this.sortField === field) {
      // 如果點擊的是目前排序的欄位，切換排序方向
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // 如果點擊的是新的欄位，設置為升序
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    // 更新分頁
    this.updatePaginatedAssets();
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

  // 取得當前頁面被選中的資產數量
  getPageSelectedCount(): number {
    return this.paginatedAssets.filter(asset => {
      // 在原始資產數組中找到對應的資產並檢查其選擇狀態
      const originalAsset = this.assets.find(original => original.id === asset.id);
      return originalAsset?.checked === true;
    }).length;
  }

  // 全選/取消全選（僅選擇當前頁面的資產）
  toggleSelectAll(): void {
    // 判斷是否全選
    this.allChecked = !this.allChecked;

    // 取得當前頁面的資產
    const currentPageAssets = this.paginatedAssets;

    // 只更新當前頁面資產的選擇狀態
    this.assets.forEach(asset => {
      // 檢查資產是否在當前頁面中
      if (currentPageAssets.some(pageAsset => pageAsset.id === asset.id)) {
        asset.checked = this.allChecked;
      }
    });

    this.updateBatchBarVisibility();
  }

  // 選擇單個資產
  toggleAssetSelection(asset: Asset): void {
    asset.checked = !asset.checked;

    // 取得當前頁面的資產
    const currentPageAssets = this.paginatedAssets;

    // 檢查當前頁面的資產是否全部被選中
    this.allChecked = currentPageAssets.length > 0 && currentPageAssets.every(a => {
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
  batchUpdateStatus(): void {
    const dialogData: BatchOperationDialogData = {
      title: '批次更新狀態',
      message: `您選擇了 ${this.selectedAssetsCount} 個資產，請選擇要更新的狀態：`,
      type: 'status',
      options: this.assetStatuses.map(status => ({
        value: status.id,
        label: status.name,
        icon: status.icon
      })),
      confirmButtonText: '更新',
      cancelButtonText: '取消',
      color: 'primary'
    };

    const dialogRef = this.dialog.open(BatchOperationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const status = result as string;
        const selectedAssets = this.assets.filter(asset => asset.checked);
        selectedAssets.forEach(asset => {
          asset.status = status as 'normal' | 'repair' | 'borrowed' | 'scrapped';
        });
        this.snackBar.open(`已將 ${selectedAssets.length} 個資產狀態更新為 ${this.getStatusName(status)}`, '關閉', { duration: 3000 });
        this.cancelSelection();
      }
    });
  }

  // 批次刪除
  batchDelete(): void {
    const dialogData: BatchOperationDialogData = {
      title: '批次刪除資產',
      message: `您確定要刪除選中的 ${this.selectedAssetsCount} 個資產嗎？`,
      type: 'delete',
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      color: 'warn'
    };

    const dialogRef = this.dialog.open(BatchOperationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const selectedIds = this.assets.filter(asset => asset.checked).map(asset => asset.id);
        this.assets = this.assets.filter(asset => !asset.checked);
        this.totalItems = this.assets.length;
        this.snackBar.open(`已刪除 ${selectedIds.length} 個資產`, '關閉', { duration: 3000 });
        this.cancelSelection();
      }
    });
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

  // 處理分頁器事件
  handlePageEvent(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.updatePaginatedAssets();
  }

  // 處理排序操作
  handleSortAction(action: string): void {
    switch(action) {
      case 'sort-id':
        this.assets.sort((a, b) => a.id.localeCompare(b.id));
        this.snackBar.open('已依編號排序', '關閉', { duration: 2000 });
        break;
      case 'sort-name':
        this.assets.sort((a, b) => a.name.localeCompare(b.name));
        this.snackBar.open('已依名稱排序', '關閉', { duration: 2000 });
        break;
      case 'sort-date':
        this.assets.sort((a, b) => a.acquisitionDate.localeCompare(b.acquisitionDate));
        this.snackBar.open('已依取得日期排序', '關閉', { duration: 2000 });
        break;
      case 'sort-value':
        this.assets.sort((a, b) => b.value - a.value);
        this.snackBar.open('已依價值排序', '關閉', { duration: 2000 });
        break;
      default:
        break;
    }
  }

  // 導出資產數據
  exportData(): void {
    this.snackBar.open('正在匯出資產數據...', '關閉', { duration: 2000 });
    // 實際導出邏輯會在這裡實現
  }

  // 新增資產
  addNewAsset(): void {
    this.snackBar.open('正在前往新增資產頁面...', '關閉', { duration: 2000 });
    // 實際導向新增資產頁面的邏輯會在這裡實現
    // 可以使用 Router 導向新增資產頁面
  }

  // 批次更新位置
  batchUpdateLocation(): void {
    const locations = [
      { value: '台北總部－研發部', label: '台北總部－研發部' },
      { value: '台北總部－行政部', label: '台北總部－行政部' },
      { value: '台北總部－財務部', label: '台北總部－財務部' },
      { value: '台北總部－會議室A', label: '台北總部－會議室A' },
      { value: '台北總部－會議室B', label: '台北總部－會議室B' },
      { value: '台中分部－客服部', label: '台中分部－客服部' },
      { value: '台中分部－行政區', label: '台中分部－行政區' },
      { value: '高雄分部－業務部', label: '高雄分部－業務部' },
      { value: '高雄分部－行政部', label: '高雄分部－行政部' }
    ];

    const dialogData: BatchOperationDialogData = {
      title: '批次更新位置',
      message: `您選擇了 ${this.selectedAssetsCount} 個資產，請選擇要更新的位置：`,
      type: 'location',
      options: locations,
      confirmButtonText: '更新',
      cancelButtonText: '取消',
      color: 'primary'
    };

    const dialogRef = this.dialog.open(BatchOperationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const location = result as string;
        const selectedAssets = this.assets.filter(asset => asset.checked);
        selectedAssets.forEach(asset => {
          asset.location = location;
        });
        this.snackBar.open(`已將 ${selectedAssets.length} 個資產位置更新為 ${location}`, '關閉', { duration: 3000 });
        this.cancelSelection();
      }
    });
  }

  // 批次更新保管人
  batchUpdateCustodian(): void {
    const custodians = [
      { value: '王小明', label: '王小明' },
      { value: '李小芳', label: '李小芳' },
      { value: '張小龍', label: '張小龍' },
      { value: '陳總經理', label: '陳總經理' },
      { value: '林小美', label: '林小美' },
      { value: '黃小玲', label: '黃小玲' },
      { value: '吳小倩', label: '吳小倩' },
      { value: '趙小強', label: '趙小強' },
      { value: '會議室管理員', label: '會議室管理員' },
      { value: '公共區域', label: '公共區域' },
      { value: '公共設備', label: '公共設備' }
    ];

    const dialogData: BatchOperationDialogData = {
      title: '批次更新保管人',
      message: `您選擇了 ${this.selectedAssetsCount} 個資產，請選擇要更新的保管人：`,
      type: 'custodian',
      options: custodians,
      confirmButtonText: '更新',
      cancelButtonText: '取消',
      color: 'primary'
    };

    const dialogRef = this.dialog.open(BatchOperationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const custodian = result as string;
        const selectedAssets = this.assets.filter(asset => asset.checked);
        selectedAssets.forEach(asset => {
          asset.custodian = custodian;
        });
        this.snackBar.open(`已將 ${selectedAssets.length} 個資產保管人更新為 ${custodian}`, '關閉', { duration: 3000 });
        this.cancelSelection();
      }
    });
  }

  // 批次列印條碼
  batchPrintBarcode(): void {
    const barcodeOptions = [
      { value: 'single', label: '單一標籤 (5x2.5cm)' },
      { value: 'double', label: '雙標籤 (5x5cm)' },
      { value: 'sheet', label: '整頁標籤 (A4)' }
    ];

    const dialogData: BatchOperationDialogData = {
      title: '批次列印條碼',
      message: `您選擇了 ${this.selectedAssetsCount} 個資產，請選擇列印格式：`,
      type: 'barcode',
      options: barcodeOptions,
      confirmButtonText: '列印',
      cancelButtonText: '取消',
      color: 'primary'
    };

    const dialogRef = this.dialog.open(BatchOperationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open(`正在準備列印 ${this.selectedAssetsCount} 個資產的條碼，格式：${result}`, '關閉', { duration: 3000 });
        // 實際列印邏輯會在這裡實現
        this.cancelSelection();
      }
    });
  }

  // 批次匯出資料
  batchExportData(): void {
    const exportOptions = [
      { value: 'excel', label: 'Excel 檔案 (.xlsx)' },
      { value: 'csv', label: 'CSV 檔案 (.csv)' },
      { value: 'pdf', label: 'PDF 檔案 (.pdf)' }
    ];

    const dialogData: BatchOperationDialogData = {
      title: '批次匯出資料',
      message: `您選擇了 ${this.selectedAssetsCount} 個資產，請選擇匯出格式：`,
      type: 'export',
      options: exportOptions,
      confirmButtonText: '匯出',
      cancelButtonText: '取消',
      color: 'primary'
    };

    const dialogRef = this.dialog.open(BatchOperationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open(`正在匯出 ${this.selectedAssetsCount} 個資產的資料，格式：${result}`, '關閉', { duration: 3000 });
        // 實際匯出邏輯會在這裡實現
        this.cancelSelection();
      }
    });
  }

  // 處理分類篩選
  handleCategoryFilter(category: string): void {
    this.selectedCategory = category;
    this.selectedCategoryName = category ? this.assetCategories.find(c => c.id === category)?.name || '' : '';
    this.showCategoryDropdown = false;
    this.updatePaginatedAssets();

    const categoryName = category === '' ? '全部分類' : category;
    this.snackBar.open(`已篩選為 ${categoryName}`, '關閉', { duration: 2000 });
  }

  // 處理狀態篩選
  handleStatusFilter(status: string): void {
    this.selectedStatus = status;
    this.showStatusDropdown = false;
    this.updatePaginatedAssets();

    const statusName = this.getStatusName(status) || '全部狀態';
    this.snackBar.open(`已篩選為 ${statusName}`, '關閉', { duration: 2000 });
  }
  
  // 重置所有篩選條件
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedCategoryName = '';
    this.selectedStatus = '';
    this.updatePaginatedAssets();
    
    this.snackBar.open('已重置所有篩選條件', '關閉', { duration: 2000 });
  }

  // 切換分類下拉選單顯示狀態
  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
    this.showStatusDropdown = false; // 關閉另一個下拉選單
  }

  // 切換狀態下拉選單顯示狀態
  toggleStatusDropdown(): void {
    this.showStatusDropdown = !this.showStatusDropdown;
    this.showCategoryDropdown = false; // 關閉另一個下拉選單
  }

  // 獲取分類對應的圖標
  getCategoryIcon(categoryId: string): string {
    const iconMap: {[key: string]: string} = {
      '電腦設備': 'fas fa-laptop',
      '辦公設備': 'fas fa-print',
      '辦公家具': 'fas fa-chair',
      '視聽設備': 'fas fa-tv',
      '行動裝置': 'fas fa-tablet-alt'
    };
    return iconMap[categoryId] || 'fas fa-box';
  }

  // 獲取狀態名稱
  getStatusName(statusId: string): string {
    if (!statusId) return '';
    const status = this.assetStatuses.find(s => s.id === statusId);
    return status ? status.name : '';
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
