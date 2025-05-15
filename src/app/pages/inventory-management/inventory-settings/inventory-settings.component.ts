import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActionMenuComponent } from '../../../shared/components/action-menu/action-menu.component';

interface InventoryPerson {
  id: string;
  department: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  isActive: boolean;
}

@Component({
  selector: 'app-inventory-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ActionMenuComponent],
  templateUrl: './inventory-settings.component.html',
  styleUrl: './inventory-settings.component.scss'
})
export class InventorySettingsComponent implements OnInit {
  // 頁籤控制
  activeTab: 'personnel' | 'defaults' | 'notifications' = 'personnel';
  
  // 負責人相關
  managers: InventoryPerson[] = [];
  managerForm: FormGroup;
  showManagerModal = false;
  
  // 盤點人員相關
  staffMembers: InventoryPerson[] = [];
  staffForm: FormGroup;
  showStaffModal = false;
  
  // 默認設置相關
  defaultsForm: FormGroup;
  
  // 通知設置相關
  notificationsForm: FormGroup;
  
  // 共用
  isEditMode = false;
  currentPersonId = '';

  constructor(private fb: FormBuilder) {
    this.managerForm = this.createPersonForm();
    this.staffForm = this.createPersonForm();
    this.defaultsForm = this.createDefaultsForm();
    this.notificationsForm = this.createNotificationsForm();
  }

  ngOnInit(): void {
    this.loadManagers();
    this.loadStaffMembers();
    this.loadDefaultSettings();
    this.loadNotificationSettings();
  }

  // 頁籤控制
  setActiveTab(tab: 'personnel' | 'defaults' | 'notifications'): void {
    this.activeTab = tab;
  }

  // 表單創建
  createPersonForm(): FormGroup {
    return this.fb.group({
      department: ['', Validators.required],
      name: ['', Validators.required],
      title: [''],
      phone: [''],
      email: ['', [Validators.email]],
      isActive: [true]
    });
  }

  createDefaultsForm(): FormGroup {
    return this.fb.group({
      defaultInventoryDays: [30, [Validators.required, Validators.min(1), Validators.max(90)]],
      defaultReminderDays: [7, [Validators.required, Validators.min(1), Validators.max(30)]],
      autoCloseEnabled: [true]
    });
  }

  createNotificationsForm(): FormGroup {
    return this.fb.group({
      startNotification: [true],
      reminderNotification: [true],
      completionNotification: [true],
      notificationEmail: ['', Validators.email]
    });
  }

  // 數據加載
  loadManagers(): void {
    // 模擬從API獲取負責人數據
    this.managers = [
      {
        id: '1',
        department: '資產管理部',
        name: '王大明',
        title: '部門經理',
        phone: '02-2345-6789',
        email: 'wang@example.com',
        isActive: true
      },
      {
        id: '2',
        department: '財務部',
        name: '李小華',
        title: '財務主管',
        phone: '02-2345-6790',
        email: 'lee@example.com',
        isActive: true
      },
      {
        id: '3',
        department: 'IT部門',
        name: '張志明',
        title: 'IT主管',
        phone: '02-2345-6791',
        email: 'chang@example.com',
        isActive: false
      }
    ];
  }

  loadStaffMembers(): void {
    // 模擬從API獲取盤點人員數據
    this.staffMembers = [
      {
        id: '1',
        department: '資產管理部',
        name: '陳小明',
        title: '資產專員',
        phone: '02-2345-6792',
        email: 'chen@example.com',
        isActive: true
      },
      {
        id: '2',
        department: '財務部',
        name: '林美玲',
        title: '財務專員',
        phone: '02-2345-6793',
        email: 'lin@example.com',
        isActive: true
      },
      {
        id: '3',
        department: 'IT部門',
        name: '吳建志',
        title: 'IT工程師',
        phone: '02-2345-6794',
        email: 'wu@example.com',
        isActive: true
      },
      {
        id: '4',
        department: '行政部',
        name: '黃雅芳',
        title: '行政助理',
        phone: '02-2345-6795',
        email: 'huang@example.com',
        isActive: false
      }
    ];
  }

  loadDefaultSettings(): void {
    // 模擬從API獲取默認設置
    const defaultSettings = {
      defaultInventoryDays: 30,
      defaultReminderDays: 7,
      autoCloseEnabled: true
    };
    
    this.defaultsForm.patchValue(defaultSettings);
  }

  loadNotificationSettings(): void {
    // 模擬從API獲取通知設置
    const notificationSettings = {
      startNotification: true,
      reminderNotification: true,
      completionNotification: true,
      notificationEmail: 'notifications@example.com'
    };
    
    this.notificationsForm.patchValue(notificationSettings);
  }

  // 負責人管理
  openManagerModal(managerId: string = ''): void {
    this.isEditMode = !!managerId;
    this.currentPersonId = managerId;
    
    if (this.isEditMode) {
      const manager = this.managers.find(m => m.id === managerId);
      if (manager) {
        this.managerForm.patchValue(manager);
      }
    } else {
      this.managerForm.reset({isActive: true});
    }
    
    this.showManagerModal = true;
  }

  closeManagerModal(): void {
    this.showManagerModal = false;
    this.managerForm.reset();
  }

  saveManager(): void {
    if (this.managerForm.invalid) return;
    
    const formValue = this.managerForm.value;
    
    if (this.isEditMode) {
      // 更新現有負責人
      const index = this.managers.findIndex(m => m.id === this.currentPersonId);
      if (index !== -1) {
        this.managers[index] = {...this.managers[index], ...formValue};
      }
    } else {
      // 新增負責人
      const newManager: InventoryPerson = {
        id: Date.now().toString(), // 模擬生成ID
        ...formValue
      };
      this.managers.push(newManager);
    }
    
    this.closeManagerModal();
  }

  handleManagerAction(action: string, managerId: string): void {
    switch (action) {
      case 'edit':
        this.openManagerModal(managerId);
        break;
      case 'delete':
        if (confirm('確定要刪除此負責人嗎？')) {
          this.deleteManager(managerId);
        }
        break;
      default:
        break;
    }
  }

  deleteManager(managerId: string): void {
    const index = this.managers.findIndex(m => m.id === managerId);
    if (index !== -1) {
      this.managers.splice(index, 1);
    }
  }

  // 盤點人員管理
  openStaffModal(staffId: string = ''): void {
    this.isEditMode = !!staffId;
    this.currentPersonId = staffId;
    
    if (this.isEditMode) {
      const staff = this.staffMembers.find(s => s.id === staffId);
      if (staff) {
        this.staffForm.patchValue(staff);
      }
    } else {
      this.staffForm.reset({isActive: true});
    }
    
    this.showStaffModal = true;
  }

  closeStaffModal(): void {
    this.showStaffModal = false;
    this.staffForm.reset();
  }

  saveStaff(): void {
    if (this.staffForm.invalid) return;
    
    const formValue = this.staffForm.value;
    
    if (this.isEditMode) {
      // 更新現有盤點人員
      const index = this.staffMembers.findIndex(s => s.id === this.currentPersonId);
      if (index !== -1) {
        this.staffMembers[index] = {...this.staffMembers[index], ...formValue};
      }
    } else {
      // 新增盤點人員
      const newStaff: InventoryPerson = {
        id: Date.now().toString(), // 模擬生成ID
        ...formValue
      };
      this.staffMembers.push(newStaff);
    }
    
    this.closeStaffModal();
  }

  handleStaffAction(action: string, staffId: string): void {
    switch (action) {
      case 'edit':
        this.openStaffModal(staffId);
        break;
      case 'delete':
        if (confirm('確定要刪除此盤點人員嗎？')) {
          this.deleteStaff(staffId);
        }
        break;
      default:
        break;
    }
  }

  deleteStaff(staffId: string): void {
    const index = this.staffMembers.findIndex(s => s.id === staffId);
    if (index !== -1) {
      this.staffMembers.splice(index, 1);
    }
  }

  // 默認設置保存
  saveDefaultSettings(): void {
    if (this.defaultsForm.invalid) return;
    
    const formValue = this.defaultsForm.value;
    console.log('保存默認設置:', formValue);
    // 這裡可以添加API調用來保存設置
    alert('默認設置已保存');
  }

  // 通知設置保存
  saveNotificationSettings(): void {
    if (this.notificationsForm.invalid) return;
    
    const formValue = this.notificationsForm.value;
    console.log('保存通知設置:', formValue);
    // 這裡可以添加API調用來保存設置
    alert('通知設置已保存');
  }
}
