import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// 定義資產分類介面
interface AssetCategory {
  id: string;
  code: string;
  name: string;
  level: string; // 1: 大分類, 2: 中分類, 3: 小分類
  parentId: string;
  depreciationYears: number;
  description: string;
  isActive: boolean;
}

@Component({
  selector: 'app-asset-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './asset-category.component.html',
  styleUrl: './asset-category.component.scss'
})
export class AssetCategoryComponent implements OnInit {
  // 分類資料
  categories: AssetCategory[] = [];
  filteredCategories: AssetCategory[] = [];
  parentCategories: AssetCategory[] = [];
  availableParents: AssetCategory[] = [];
  
  // 篩選條件
  selectedLevel: string = 'all';
  selectedParent: string = 'all';
  
  // 分頁
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  
  // 表單相關
  categoryForm: FormGroup;
  showModal: boolean = false;
  isEditing: boolean = false;
  currentCategoryId: string = '';
  
  constructor(private fb: FormBuilder) {
    // 初始化表單
    this.categoryForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      level: ['1', Validators.required],
      parentId: [''],
      depreciationYears: [3],
      description: [''],
      isActive: [true]
    });
  }
  
  ngOnInit(): void {
    // 載入模擬資料
    this.loadMockData();
    this.filterCategories();
    this.updateParentCategories();
  }
  
  // 載入模擬資料
  loadMockData(): void {
    this.categories = [
      { id: '1', code: 'COMP', name: '電腦設備', level: '1', parentId: '', depreciationYears: 3, description: '各種電腦及周邊設備', isActive: true },
      { id: '2', code: 'COMP-NB', name: '筆記型電腦', level: '2', parentId: '1', depreciationYears: 3, description: '各種筆記型電腦', isActive: true },
      { id: '3', code: 'COMP-DT', name: '桌上型電腦', level: '2', parentId: '1', depreciationYears: 3, description: '各種桌上型電腦', isActive: true },
      { id: '4', code: 'COMP-SV', name: '伺服器', level: '2', parentId: '1', depreciationYears: 5, description: '各種伺服器設備', isActive: true },
      { id: '5', code: 'FURN', name: '辦公家具', level: '1', parentId: '', depreciationYears: 5, description: '各式辦公室家具', isActive: true },
      { id: '6', code: 'FURN-CH', name: '辦公椅', level: '2', parentId: '5', depreciationYears: 5, description: '各種辦公椅', isActive: true },
      { id: '7', code: 'FURN-DK', name: '辦公桌', level: '2', parentId: '5', depreciationYears: 5, description: '各種辦公桌', isActive: true },
    ];
  }
  
  // 根據篩選條件過濾分類
  filterCategories(): void {
    let filtered = [...this.categories];
    
    // 根據層級篩選
    if (this.selectedLevel !== 'all') {
      filtered = filtered.filter(category => category.level === this.selectedLevel);
    }
    
    // 根據上層分類篩選
    if (this.selectedParent !== 'all') {
      filtered = filtered.filter(category => category.parentId === this.selectedParent);
    }
    
    this.filteredCategories = filtered;
    this.calculatePagination();
  }
  
  // 計算分頁
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredCategories.length / this.pageSize);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    
    // 分頁顯示資料
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredCategories = this.filteredCategories.slice(startIndex, endIndex);
  }
  
  // 更新上層分類選項
  updateParentCategories(): void {
    // 取得所有可作為上層分類的項目（大分類和中分類）
    this.parentCategories = this.categories.filter(category => category.level === '1' || category.level === '2');
  }
  
  // 根據選擇的層級更新可用的上層分類
  onLevelChange(): void {
    const selectedLevel = this.categoryForm.get('level')?.value;
    
    // 重置上層分類
    this.categoryForm.patchValue({ parentId: '' });
    
    // 根據選擇的層級設定可用的上層分類
    if (selectedLevel === '1') { // 大分類沒有上層分類
      this.availableParents = [];
      this.categoryForm.get('parentId')?.disable();
    } else if (selectedLevel === '2') { // 中分類的上層只能是大分類
      this.availableParents = this.categories.filter(category => category.level === '1');
      this.categoryForm.get('parentId')?.enable();
    } else if (selectedLevel === '3') { // 小分類的上層只能是中分類
      this.availableParents = this.categories.filter(category => category.level === '2');
      this.categoryForm.get('parentId')?.enable();
    }
  }
  
  // 取得層級名稱
  getLevelName(level: string): string {
    switch(level) {
      case '1': return '大分類';
      case '2': return '中分類';
      case '3': return '小分類';
      default: return '';
    }
  }
  
  // 取得上層分類名稱
  getParentName(parentId: string): string {
    if (!parentId) return '-';
    const parent = this.categories.find(category => category.id === parentId);
    return parent ? parent.name : '-';
  }
  
  // 開啟新增分類彈窗
  openAddCategoryModal(): void {
    this.isEditing = false;
    this.currentCategoryId = '';
    this.categoryForm.reset({
      level: '1',
      isActive: true,
      depreciationYears: 3
    });
    this.onLevelChange();
    this.showModal = true;
  }
  
  // 開啟編輯分類彈窗
  editCategory(category: AssetCategory): void {
    this.isEditing = true;
    this.currentCategoryId = category.id;
    this.categoryForm.patchValue({
      code: category.code,
      name: category.name,
      level: category.level,
      parentId: category.parentId,
      depreciationYears: category.depreciationYears,
      description: category.description,
      isActive: category.isActive
    });
    this.onLevelChange();
    this.showModal = true;
  }
  
  // 關閉彈窗
  closeModal(): void {
    this.showModal = false;
  }
  
  // 儲存分類
  saveCategory(): void {
    if (this.categoryForm.invalid) return;
    
    const formData = this.categoryForm.value;
    
    if (this.isEditing) {
      // 更新現有分類
      const index = this.categories.findIndex(c => c.id === this.currentCategoryId);
      if (index !== -1) {
        this.categories[index] = {
          ...this.categories[index],
          code: formData.code,
          name: formData.name,
          level: formData.level,
          parentId: formData.parentId || '',
          depreciationYears: formData.depreciationYears,
          description: formData.description,
          isActive: formData.isActive
        };
      }
    } else {
      // 新增分類
      const newId = (Math.max(...this.categories.map(c => parseInt(c.id))) + 1).toString();
      this.categories.push({
        id: newId,
        code: formData.code,
        name: formData.name,
        level: formData.level,
        parentId: formData.parentId || '',
        depreciationYears: formData.depreciationYears,
        description: formData.description,
        isActive: formData.isActive
      });
    }
    
    // 更新資料
    this.filterCategories();
    this.updateParentCategories();
    this.closeModal();
  }
  
  // 切換分類狀態
  toggleCategoryStatus(category: AssetCategory): void {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      this.categories[index].isActive = !this.categories[index].isActive;
      this.filterCategories();
    }
  }
  
  // 顯示更多選項
  showMoreOptions(category: AssetCategory): void {
    // 這裡可以實現更多選項的功能，例如刪除、複製等
    console.log('顯示更多選項', category);
  }
  
  // 分頁導航
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.filterCategories();
  }
}
