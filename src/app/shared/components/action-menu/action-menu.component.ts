import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ActionMenuItem {
  icon?: string;
  label?: string;
  action?: string;
  isDanger?: boolean;
  isSeparator?: boolean;
}

@Component({
  selector: 'app-action-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent {
  @Input() menuItems: ActionMenuItem[] = [];
  @Input() position: 'left' | 'right' = 'right';
  @Output() menuItemClicked = new EventEmitter<string>();
  @ViewChild('menuDropdown') menuDropdown?: ElementRef;
  @ViewChild('actionBtn') actionBtn?: ElementRef;
  
  isOpen = false;
  menuStyle: { [key: string]: string } = {};
  
  @HostListener('document:click')
  clickOutside() {
    if (this.isOpen) {
      this.isOpen = false;
    }
  }
  
  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      setTimeout(() => this.positionMenu(), 0);
      
      // 監聽滑鼠移動事件
      document.addEventListener('mousemove', this.handleMouseMove);
    } else {
      // 移除滑鼠移動事件監聽
      document.removeEventListener('mousemove', this.handleMouseMove);
    }
  }
  
  positionMenu(): void {
    if (!this.actionBtn || !this.menuDropdown) return;
    
    const btnRect = this.actionBtn.nativeElement.getBoundingClientRect();
    const menuRect = this.menuDropdown.nativeElement.getBoundingClientRect();
    
    // 計算選單的位置
    let top = btnRect.bottom + 5;
    let left = this.position === 'right' ? btnRect.right - menuRect.width : btnRect.left;
    
    // 確保選單不會超出視窗底部
    const viewportHeight = window.innerHeight;
    if (top + menuRect.height > viewportHeight) {
      top = btnRect.top - menuRect.height - 5;
    }
    
    // 確保選單不會超出視窗左右兩側
    const viewportWidth = window.innerWidth;
    if (left + menuRect.width > viewportWidth) {
      left = viewportWidth - menuRect.width - 5;
    }
    if (left < 5) {
      left = 5;
    }
    
    this.menuStyle = {
      top: `${top}px`,
      left: `${left}px`
    };
  }
  
  onMenuItemClick(action: string, event: Event): void {
    event.stopPropagation();
    this.menuItemClicked.emit(action);
    this.isOpen = false;
  }
  
  closeMenu(): void {
    this.isOpen = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
  
  handleMouseMove = (event: MouseEvent) => {
    if (!this.actionBtn || !this.menuDropdown) return;
    
    const btnRect = this.actionBtn.nativeElement.getBoundingClientRect();
    const menuRect = this.menuDropdown.nativeElement.getBoundingClientRect();
    
    // 擴大按鈕周圍的安全區域（增加 15 像素的緩衝區）
    const padding = 15;
    const extendedBtnRect = {
      left: btnRect.left - padding,
      right: btnRect.right + padding,
      top: btnRect.top - padding,
      bottom: btnRect.bottom + padding
    };
    
    // 創建按鈕和選單之間的安全通道
    const safePathRect = {
      left: Math.min(btnRect.left, menuRect.left) - padding,
      right: Math.max(btnRect.right, menuRect.right) + padding,
      top: Math.min(btnRect.bottom, menuRect.top) - 5,
      bottom: Math.max(btnRect.bottom, menuRect.top) + 5
    };
    
    // 擴大選單周圍的安全區域
    const extendedMenuRect = {
      left: menuRect.left - padding,
      right: menuRect.right + padding,
      top: menuRect.top - padding,
      bottom: menuRect.bottom + padding
    };
    
    // 檢查滑鼠是否在擴大後的按鈕區域內
    const isOverExtendedBtn = (
      event.clientX >= extendedBtnRect.left && 
      event.clientX <= extendedBtnRect.right && 
      event.clientY >= extendedBtnRect.top && 
      event.clientY <= extendedBtnRect.bottom
    );
    
    // 檢查滑鼠是否在擴大後的選單區域內
    const isOverExtendedMenu = (
      event.clientX >= extendedMenuRect.left && 
      event.clientX <= extendedMenuRect.right && 
      event.clientY >= extendedMenuRect.top && 
      event.clientY <= extendedMenuRect.bottom
    );
    
    // 檢查滑鼠是否在安全通道內
    const isOverSafePath = (
      event.clientX >= safePathRect.left && 
      event.clientX <= safePathRect.right && 
      event.clientY >= safePathRect.top && 
      event.clientY <= safePathRect.bottom
    );
    
    // 如果滑鼠不在擴大後的按鈕、選單或安全通道區域內，關閉選單
    if (!isOverExtendedBtn && !isOverExtendedMenu && !isOverSafePath) {
      this.closeMenu();
    }
  }
}
