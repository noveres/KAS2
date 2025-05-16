import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActionMenuComponent } from '../../../shared/components/action-menu/action-menu.component';
import { StatusToggleButtonComponent } from '../../../shared/components/status-toggle-button/status-toggle-button.component';

interface Company {
  code: string;
  name: string;
  taxId: string;
  address: string;
  phone: string;
  isActive: boolean;
}

@Component({
  selector: 'app-company-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActionMenuComponent,
    StatusToggleButtonComponent
  ],
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss'
})
export class CompanyInfoComponent implements OnInit {
  companies: Company[] = [];
  companyForm: FormGroup;
  showModal = false;
  isEditMode = false;
  currentCompanyCode = '';

  constructor(private fb: FormBuilder) {
    this.companyForm = this.createCompanyForm();
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    // 模擬從API獲取公司資料
    this.companies = [
      {
        code: 'TW-HQ',
        name: '台灣總公司',
        taxId: '12345678',
        address: '台北市信義區信義五路7號',
        phone: '02-2345-6789',
        isActive: true
      },
      {
        code: 'CN-BR',
        name: '中國分公司',
        taxId: '87654321',
        address: '上海市浦東新區陸家嘴路1000號',
        phone: '+86-21-5888-5888',
        isActive: true
      },
      {
        code: 'US-BR',
        name: '美國分公司',
        taxId: '98-7654321',
        address: '1 Apple Park Way, Cupertino, CA',
        phone: '+1-408-555-1234',
        isActive: true
      },
      {
        code: 'JP-BR',
        name: '日本分公司',
        taxId: '1234-56-7890',
        address: '東京都港区芝浦 7-1',
        phone: '+81-3-1234-5678',
        isActive: false
      }
    ];
  }

  createCompanyForm(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      taxId: ['', [Validators.required, Validators.pattern(/^[0-9-]{8,12}$/)]],
      address: [''],
      phone: [''],
      isActive: [true]
    });
  }

  openCompanyModal(companyCode: string = ''): void {
    this.isEditMode = !!companyCode;
    this.currentCompanyCode = companyCode;

    if (this.isEditMode) {
      const company = this.companies.find(c => c.code === companyCode);
      if (company) {
        this.companyForm.patchValue(company);
      }
    } else {
      this.companyForm.reset({isActive: true});
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.companyForm.reset();
  }

  saveCompany(): void {
    if (this.companyForm.invalid) return;

    const formValue = this.companyForm.value;

    if (this.isEditMode) {
      // 更新現有公司
      const index = this.companies.findIndex(c => c.code === this.currentCompanyCode);
      if (index !== -1) {
        this.companies[index] = {...formValue};
      }
    } else {
      // 新增公司
      this.companies.push({...formValue});
    }

    this.closeModal();
  }

  handleMenuAction(action: string, companyCode: string): void {
    const company = this.companies.find(c => c.code === companyCode);
    if (!company) return;

    switch (action) {
      case 'edit':
        this.openCompanyModal(companyCode);
        break;
      case 'departments':
        console.log(`管理部門: ${companyCode}`);
        // 這裡可以導航到部門管理頁面或打開部門管理模態框
        break;
      case 'delete':
        if (confirm(`確定要刪除公司 ${companyCode} 嗎？`)) {
          this.deleteCompany(companyCode);
        }
        break;
      case 'toggleStatus':
        this.toggleCompanyStatus(company);
        break;
      default:
        break;
    }
  }

  toggleCompanyStatus(company: Company): void {
    const index = this.companies.findIndex(c => c.code === company.code);
    if (index !== -1) {
      this.companies[index].isActive = !this.companies[index].isActive;
      console.log(`公司 ${company.name} 狀態已切換為 ${this.companies[index].isActive ? '啟用' : '停用'}`);
    }
  }

  deleteCompany(companyCode: string): void {
    const index = this.companies.findIndex(c => c.code === companyCode);
    if (index !== -1) {
      this.companies.splice(index, 1);
    }
  }
}
