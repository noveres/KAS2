import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface CheckType {
  id: string;
  name: string;
}

interface CheckMethod {
  id: string;
  name: string;
}

interface CheckScope {
  id: string;
  name: string;
}

interface CheckStatus {
  id: string;
  name: string;
}

interface CheckResult {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
}

@Component({
  selector: 'app-inventory-check',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './inventory-check.component.html',
  styleUrl: './inventory-check.component.scss'
})
export class InventoryCheckComponent implements OnInit {
  // 當前激活的Tab索引
  activeTabIndex: number = 0;

  // 盤點表單
  inventoryCheckForm: FormGroup;

  // 下拉選項數據
  checkTypes: CheckType[] = [
    { id: 'regular', name: '定期盤點' },
    { id: 'special', name: '專案盤點' },
    { id: 'random', name: '隨機抽查' },
    { id: 'annual', name: '年度盤點' },
    { id: 'other', name: '其他' }
  ];

  checkMethods = [
    { id: 'physical', name: '實體盤點' },
    { id: 'barcode', name: '條碼掃描' },
    { id: 'rfid', name: 'RFID掃描' },
    { id: 'mixed', name: '混合方式' }
  ];

  checkScopes: CheckScope[] = [
    { id: 'all', name: '全部資產' },
    { id: 'department', name: '部門資產' },
    { id: 'category', name: '特定類別' },
    { id: 'location', name: '特定位置' }
  ];

  checkStatuses: CheckStatus[] = [
    { id: 'planning', name: '規劃中' },
    { id: 'ongoing', name: '進行中' },
    { id: 'completed', name: '已完成' },
    { id: 'cancelled', name: '已取消' }
  ];

  checkResults = [
    { id: 'normal', name: '正常' },
    { id: 'shortage', name: '短缺' },
    { id: 'surplus', name: '盈餘' },
    { id: 'damaged', name: '損壞' },
    { id: 'misplaced', name: '放錯位置' }
  ];

  departments: Department[] = [
    { id: 'it', name: '資訊部' },
    { id: 'hr', name: '人資部' },
    { id: 'finance', name: '財務部' },
    { id: 'sales', name: '業務部' },
    { id: 'rd', name: '研發部' }
  ];

  users: User[] = [
    { id: 'user1', name: '王小明' },
    { id: 'user2', name: '李大華' },
    { id: 'user3', name: '張美玲' },
    { id: 'user4', name: '陳志明' }
  ];

  // 已選擇的盤點人員
  selectedStaff: User[] = [];

  constructor(private fb: FormBuilder) {
    this.inventoryCheckForm = this.fb.group({
      // 基本資料
      checkNumber: [{value: '', disabled: true}], // 由後端自動生成
      checkName: ['', Validators.required],
      checkType: ['', Validators.required],
      checkMethod: [''],
      checkDate: [new Date()],
      checkEndDate: [new Date()],
      checkDescription: [''],

      // 明細資料
      checkScope: [''],
      department: [''],
      checkManager: [''],
      notes: [''],

      // 結果資料
      checkStatus: ['planning'],
      checkResult: [''],
      resultDescription: [''],
      relatedDocuments: ['']
    });
  }

  ngOnInit(): void {
    // 先嘗試從 localStorage 加載儲存的表單狀態
    this.loadFormState();

    // 監聽所有表單控件的變化並儲存狀態
    this.inventoryCheckForm.valueChanges.subscribe(() => {
      this.saveFormState();
    });
  }

  // 儲存表單狀態到 localStorage
  saveFormState(): void {
    const formState = {
      formValues: this.inventoryCheckForm.value,
      activeTabIndex: this.activeTabIndex
    };
    localStorage.setItem('inventoryCheckFormState', JSON.stringify(formState));
  }

  // 從 localStorage 加載表單狀態
  loadFormState(): void {
    try {
      const savedState = localStorage.getItem('inventoryCheckFormState');
      if (savedState) {
        const formState = JSON.parse(savedState);

        // 恢復表單數據
        if (formState.formValues) {
          this.inventoryCheckForm.patchValue(formState.formValues);
        }

        // 恢復激活的頁面索引
        if (typeof formState.activeTabIndex === 'number') {
          setTimeout(() => {
            this.switchTab(formState.activeTabIndex);
          }, 0);
        }
      }
    } catch (error) {
      console.error('加載表單狀態失敗', error);
      // 如果加載失敗，則清除儲存的狀態
      localStorage.removeItem('inventoryCheckFormState');
    }
  }

  // 切換Tab
  switchTab(index: number): void {
    this.activeTabIndex = index;

    // 更新DOM
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPages = document.querySelectorAll('.tab-page');

    // 更新Tab項目的active狀態
    tabItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 更新Tab頁面的active狀態
    tabPages.forEach((page, i) => {
      if (i === index) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
  }

  // 下一步
  nextTab(): void {
    if (this.activeTabIndex < 2) {
      this.switchTab(this.activeTabIndex + 1);
    }
  }

  // 上一步
  prevTab(): void {
    if (this.activeTabIndex > 0) {
      this.switchTab(this.activeTabIndex - 1);
    }
  }

  // 打開人員選擇對話框
  openStaffSelection(): void {
    // 這裡可以實現打開對話框的邏輯
    // 暫時模擬添加一個人員
    if (!this.selectedStaff.some(staff => staff.id === 'user3')) {
      this.selectedStaff.push({ id: 'user3', name: '張美玲' });
    }
  }

  // 移除已選擇的人員
  removeStaff(staffId: string): void {
    this.selectedStaff = this.selectedStaff.filter(staff => staff.id !== staffId);
  }

  // 處理文件上傳
  handleFileUpload(event: Event, fieldName: string): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      this.inventoryCheckForm.patchValue({ [fieldName]: fileName });
    }
  }

  // 取消操作
  onCancel(): void {
    // 清除表單狀態並返回列表頁面
    localStorage.removeItem('inventoryCheckFormState');
    // 這裡可以添加導航回列表頁面的邏輯
    console.log('取消操作');
  }

  // 表單提交方法
  onSubmit() {
    if (this.inventoryCheckForm.valid) {
      // 取得表單所有值，包括已禁用的控件
      const formValues = {...this.inventoryCheckForm.getRawValue()};
      
      // 移除盤點編號，因為它將由後端生成
      delete formValues.checkNumber;
      
      console.log('盤點表單已提交', formValues);
      
      // 提交成功後清除本地存儲的表單狀態
      localStorage.removeItem('inventoryCheckFormState');
      
      // 這裡可以添加導航回列表頁面的邏輯
    } else {
      // 標記所有表單控件為已觸碰，以顯示驗證錯誤
      Object.keys(this.inventoryCheckForm.controls).forEach(key => {
        const control = this.inventoryCheckForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
