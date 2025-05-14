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

interface AssetCategory {
  id: string;
  name: string;
}

interface AssetStatus {
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

interface Location {
  id: string;
  name: string;
}

@Component({
  selector: 'app-asset-add',
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
  templateUrl: './asset-add.component.html',
  styleUrl: './asset-add.component.scss'
})
export class AssetAddComponent implements OnInit {
  // 當前激活的Tab索引
  activeTabIndex: number = 0;

  // 資產表單
  assetForm: FormGroup;

  // 下拉選項數據
  assetCategories: AssetCategory[] = [
    { id: 'computer', name: '電腦設備' },
    { id: 'furniture', name: '辦公家具' },
    { id: 'lighting', name: '照明設備' },
    { id: 'transport', name: '運輸設備' },
    { id: 'other', name: '其他設備' }
  ];

  assetSubCategories: {[key: string]: AssetCategory[]} = {
    'computer': [
      { id: 'laptop', name: '筆記型電腦' },
      { id: 'desktop', name: '桌上型電腦' },
      { id: 'tablet', name: '平板電腦' },
      { id: 'server', name: '伺服器' }
    ],
    'furniture': [
      { id: 'desk', name: '辦公桌' },
      { id: 'chair', name: '辦公椅' },
      { id: 'cabinet', name: '文件櫃' }
    ],
    'lighting': [
      { id: 'ceiling', name: '天花板燈' },
      { id: 'desk_lamp', name: '桌燈' }
    ],
    'transport': [
      { id: 'car', name: '汽車' },
      { id: 'motorbike', name: '機車' }
    ],
    'other': [
      { id: 'projector', name: '投影機' },
      { id: 'printer', name: '印表機' }
    ]
  };

  assetDetailCategories: {[key: string]: AssetCategory[]} = {
    'laptop': [
      { id: 'dell', name: 'Dell' },
      { id: 'hp', name: 'HP' },
      { id: 'lenovo', name: 'Lenovo' },
      { id: 'apple', name: 'Apple' }
    ],
    'desktop': [
      { id: 'dell', name: 'Dell' },
      { id: 'hp', name: 'HP' },
      { id: 'lenovo', name: 'Lenovo' }
    ],
    'tablet': [
      { id: 'apple', name: 'Apple iPad' },
      { id: 'samsung', name: 'Samsung' },
      { id: 'microsoft', name: 'Microsoft Surface' }
    ],
    'server': [
      { id: 'dell', name: 'Dell PowerEdge' },
      { id: 'hp', name: 'HP ProLiant' }
    ],
    'desk': [
      { id: 'standard', name: '標準辦公桌' },
      { id: 'standing', name: '站立式辦公桌' }
    ],
    'chair': [
      { id: 'ergonomic', name: '人體工學椅' },
      { id: 'standard', name: '標準辦公椅' }
    ]
  };

  assetSources = [
    { id: 'purchase', name: '採購' },
    { id: 'donation', name: '捐贈' },
    { id: 'rental', name: '租賃' },
    { id: 'transfer', name: '調撥' }
  ];

  assetStatuses: AssetStatus[] = [
    { id: 'normal', name: '正常使用' },
    { id: 'idle', name: '閒置' },
    { id: 'repair', name: '待修中' },
    { id: 'scrapped', name: '報廢' }
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

  locations: Location[] = [
    { id: 'taipei', name: '台北總部' },
    { id: 'taichung', name: '台中辦公室' },
    { id: 'kaohsiung', name: '高雄辦公室' }
  ];

  depreciationMethods = [
    { id: 'straight', name: '直線法' },
    { id: 'declining', name: '餘額遞減法' },
    { id: 'units', name: '生產數量法' }
  ];

  // 當前選擇的子分類
  selectedSubCategories: AssetCategory[] = [];
  selectedDetailCategories: AssetCategory[] = [];

  constructor(private fb: FormBuilder) {
    this.assetForm = this.fb.group({
      // 基本資料
      assetNumber: [{value: '', disabled: true}], // 由後端自動生成
      assetName: ['', Validators.required],
      assetCategory: ['', Validators.required],
      assetSubCategory: [''],
      assetDetailCategory: [''],
      assetSource: ['', Validators.required],
      assetStatus: ['normal', Validators.required],
      assetDescription: [''],
      acquisitionDate: [new Date()],
      serialNumber: [''],

      // 明細資料
      department: [''],
      custodian: [''],
      location: [''],
      detailLocation: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      assetPhoto: [''],
      relatedDocuments: [''],
      notes: [''],

      // 財務資料
      assetValue: [0],
      residualValue: [0],
      usefulLife: [3],
      depreciationMethod: [''],
      depreciationStartDate: [new Date()],
      supplier: [''],
      purchaseOrderNumber: [''],
      warrantyPeriod: [null]
    });
  }


  /*
  自動保存表單狀態：
每當用戶修改表單內容時，系統會自動將表單數據保存到 localStorage
同時保存用戶當前所在的頁面索引（基本資料、明細資料或財務資料）
自動恢復表單狀態：
當用戶重新進入頁面時，系統會自動從 localStorage 加載之前保存的表單數據
自動切換到用戶上次所在的頁面
表單提交後清除狀態：
當表單成功提交後，系統會清除 localStorage 中保存的表單狀態
重置表單並返回到第一個頁面
關閉了頁面或刷新了瀏覽器，之前填寫的數據和所在的頁面位置也不會丟失，可以返回到您上次所在的頁面繼續填寫。
  */

  ngOnInit(): void {
    // 先嘗試從 localStorage 加載儲存的表單狀態
    this.loadFormState();

    // 監聽大分類變化
    this.assetForm.get('assetCategory')?.valueChanges.subscribe(category => {
      this.assetForm.patchValue({ assetSubCategory: '', assetDetailCategory: '' });
      this.selectedSubCategories = category ? this.assetSubCategories[category] || [] : [];
      this.selectedDetailCategories = [];
      this.saveFormState();
    });

    // 監聽中分類變化
    this.assetForm.get('assetSubCategory')?.valueChanges.subscribe(subCategory => {
      this.assetForm.patchValue({ assetDetailCategory: '' });
      this.selectedDetailCategories = subCategory ? this.assetDetailCategories[subCategory] || [] : [];
      this.saveFormState();
    });

    // 監聽所有表單控件的變化並儲存狀態
    this.assetForm.valueChanges.subscribe(() => {
      this.saveFormState();
    });
  }

  // 儲存表單狀態到 localStorage
  saveFormState(): void {
    const formState = {
      formValues: this.assetForm.value,
      activeTabIndex: this.activeTabIndex
    };
    localStorage.setItem('assetAddFormState', JSON.stringify(formState));
  }

  // 從 localStorage 加載表單狀態
  loadFormState(): void {
    try {
      const savedState = localStorage.getItem('assetAddFormState');
      if (savedState) {
        const formState = JSON.parse(savedState);

        // 恢復表單數據
        if (formState.formValues) {
          // 先設置大分類，以觸發中分類的載入
          if (formState.formValues.assetCategory) {
            this.assetForm.patchValue({ assetCategory: formState.formValues.assetCategory });
            this.selectedSubCategories = this.assetSubCategories[formState.formValues.assetCategory] || [];
          }

          // 設置中分類，以觸發小分類的載入
          if (formState.formValues.assetSubCategory) {
            this.assetForm.patchValue({ assetSubCategory: formState.formValues.assetSubCategory });
            this.selectedDetailCategories = this.assetDetailCategories[formState.formValues.assetSubCategory] || [];
          }

          // 設置其他所有表單值
          this.assetForm.patchValue(formState.formValues);
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
      localStorage.removeItem('assetAddFormState');
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

  // 表單提交方法
  onSubmit() {
    if (this.assetForm.valid) {
      // 取得表單所有值，包括已禁用的控件
      const formValues = {...this.assetForm.getRawValue()};
      
      // 移除資產編號，因為它將由後端生成
      delete formValues.assetNumber;
      
      console.log('資產新增表單已提交', formValues);
      
      // 模擬後端 API 調用
      setTimeout(() => {
        // 模擬後端生成的資產編號
        const generatedAssetNumber = this.generateAssetNumber();
        
        // 清除儲存的表單狀態
        localStorage.removeItem('assetAddFormState');
        
        // 重置表單
        this.assetForm.reset();
        
        // 重置頁面索引為第一頁
        this.switchTab(0);
        
        // 顯示成功訊息，包含系統生成的資產編號
        alert(`資產新增成功！\n系統已自動生成資產編號: ${generatedAssetNumber}`);
      }, 500);
    } else {
      // 標記所有控件為已觸摸，以顯示驗證錯誤
      Object.keys(this.assetForm.controls).forEach(key => {
        const control = this.assetForm.get(key);
        control?.markAsTouched();
      });
      alert('請檢查表單中的必填欄位！');
    }
  }

  // 取消方法
  onCancel() {
    console.log('取消新增資產');
    if (confirm('確定要取消新增資產嗎？已填寫的資料將不會被保存。')) {
      this.assetForm.reset();
      // 這裡可以添加取消邏輯，例如返回上一頁
    }
  }

  // 處理文件上傳
  handleFileUpload(event: Event, controlName: string): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const fileName = element.files[0].name;
      this.assetForm.patchValue({ [controlName]: fileName });
    }
  }
  
  // 模擬後端生成資產編號的方法
  generateAssetNumber(): string {
    // 生成格式為 'A' + 年份後兩位 + 月份 + 5位隨機數字
    const now = new Date();
    const year = now.getFullYear().toString().slice(2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const randomNum = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    
    return `A${year}${month}${randomNum}`;
  }
}
