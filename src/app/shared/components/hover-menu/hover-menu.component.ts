import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HoverMenuItem {
  icon?: string;
  label: string;
  action: string;
  isDanger?: boolean;
}

@Component({
  selector: 'app-hover-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hover-menu.component.html',
  styleUrls: ['./hover-menu.component.scss']
})
export class HoverMenuComponent {
  @Input() buttonText: string = '';
  @Input() buttonIcon: string = '';
  @Input() menuItems: HoverMenuItem[] = [];
  @Output() menuItemClicked = new EventEmitter<string>();
  
  isMenuOpen = false;
  isMobileDevice = false;
  
  constructor(private elementRef: ElementRef) {
    // 檢測是否為移動設備
    this.isMobileDevice = this.checkIfMobile();
  }
  
  // 檢測是否為移動設備的簡單方法
  private checkIfMobile(): boolean {
    return window.matchMedia('(hover: none)').matches;
  }
  
  toggleMenu(event: Event): void {
    if (this.isMobileDevice) {
      event.stopPropagation();
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
  
  onMenuItemClick(action: string): void {
    this.menuItemClicked.emit(action);
    this.isMenuOpen = false;
  }
  
  // 監聽全局點擊事件，用於關閉菜單
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isMobileDevice && this.isMenuOpen) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.isMenuOpen = false;
      }
    }
  }
}
