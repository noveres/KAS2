import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Role {
  id: string;
  code: string;
  name: string;
  description: string;
  userCount: number;
  isActive: boolean;
}

@Component({
  selector: 'app-user-role',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss'
})
export class UserRoleComponent implements OnInit {
  // 角色數據
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  searchText: string = '';
  
  // 操作選單
  activeActionMenu: string | null = null;
  
  // 角色表單
  roleForm: FormGroup;
  showRoleModal: boolean = false;
  isEditMode: boolean = false;
  currentRoleId: string = '';

  constructor(private fb: FormBuilder) {
    this.roleForm = this.createRoleForm();
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  // 表單初始化
  createRoleForm(): FormGroup {
    return this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      isActive: [true]
    });
  }

  // 加載角色數據
  loadRoles(): void {
    // 模擬數據，實際應用中應調用API獲取
    this.roles = [
      {
        id: '1',
        code: 'ADMIN',
        name: '系統管理員',
        description: '操作系統所有功能',
        userCount: 3,
        isActive: true
      },
      {
        id: '2',
        code: 'ASSET_MANAGER',
        name: '資產管理員',
        description: '資產管理的新增、修改、刪除等管理功能',
        userCount: 5,
        isActive: true
      },
      {
        id: '3',
        code: 'DEPT_MANAGER',
        name: '部門主管',
        description: '可對所屬部門的資產進行審核申請',
        userCount: 12,
        isActive: true
      },
      {
        id: '4',
        code: 'USER',
        name: '一般使用者',
        description: '可對資產進行申請出借',
        userCount: 45,
        isActive: true
      },
      {
        id: '5',
        code: 'FINANCE',
        name: '財務人員',
        description: '可對資產的財務資訊進行維護',
        userCount: 8,
        isActive: true
      },
      {
        id: '6',
        code: 'AUDITOR',
        name: '稽核人員',
        description: '可對新增資產進行稽核與審核',
        userCount: 4,
        isActive: true
      }
    ];
    
    this.filteredRoles = [...this.roles];
  }

  // 搜尋角色
  filterRoles(): void {
    if (!this.searchText) {
      this.filteredRoles = [...this.roles];
      return;
    }
    
    const searchTerm = this.searchText.toLowerCase();
    this.filteredRoles = this.roles.filter(role => 
      role.code.toLowerCase().includes(searchTerm) || 
      role.name.toLowerCase().includes(searchTerm) ||
      role.description.toLowerCase().includes(searchTerm)
    );
  }

  // 切換操作選單
  toggleActionMenu(roleId: string): void {
    if (this.activeActionMenu === roleId) {
      this.activeActionMenu = null;
    } else {
      this.activeActionMenu = roleId;
    }
  }

  // 關閉所有操作選單
  closeAllActionMenus(): void {
    this.activeActionMenu = null;
  }

  // 打開角色模態框
  openRoleModal(roleId: string = ''): void {
    this.isEditMode = !!roleId;
    this.currentRoleId = roleId;
    
    if (this.isEditMode) {
      const role = this.roles.find(r => r.id === roleId);
      if (role) {
        this.roleForm.patchValue({
          code: role.code,
          name: role.name,
          description: role.description,
          isActive: role.isActive
        });
      }
    } else {
      this.roleForm.reset({isActive: true});
    }
    
    this.showRoleModal = true;
  }

  // 關閉角色模態框
  closeRoleModal(): void {
    this.showRoleModal = false;
    this.roleForm.reset();
    this.closeAllActionMenus();
  }

  // 點擊模態框外部關閉
  closeModalOnOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeRoleModal();
    }
  }

  // 保存角色
  saveRole(): void {
    if (this.roleForm.invalid) return;
    
    const formValue = this.roleForm.value;
    
    if (this.isEditMode) {
      // 更新現有角色
      const index = this.roles.findIndex(r => r.id === this.currentRoleId);
      if (index !== -1) {
        this.roles[index] = {
          ...this.roles[index],
          code: formValue.code,
          name: formValue.name,
          description: formValue.description,
          isActive: formValue.isActive
        };
      }
    } else {
      // 新增角色
      const newRole: Role = {
        id: Date.now().toString(),
        code: formValue.code,
        name: formValue.name,
        description: formValue.description,
        userCount: 0,
        isActive: formValue.isActive
      };
      
      this.roles.push(newRole);
    }
    
    this.filterRoles();
    this.closeRoleModal();
  }

  // 編輯角色
  editRole(roleId: string): void {
    this.openRoleModal(roleId);
    this.closeAllActionMenus();
  }

  // 切換角色狀態
  toggleRoleStatus(roleId: string): void {
    const index = this.roles.findIndex(r => r.id === roleId);
    if (index !== -1) {
      this.roles[index].isActive = !this.roles[index].isActive;
      this.filterRoles();
    }
    this.closeAllActionMenus();
  }

  // 刪除角色
  deleteRole(roleId: string): void {
    if (confirm('確定要刪除此角色嗎？')) {
      const index = this.roles.findIndex(r => r.id === roleId);
      if (index !== -1) {
        this.roles.splice(index, 1);
        this.filterRoles();
      }
    }
    this.closeAllActionMenus();
  }
}
