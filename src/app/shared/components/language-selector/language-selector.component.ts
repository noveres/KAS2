import { Component, EventEmitter, Input, Output, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  @Input() currentLanguage: string = '中文';
  @Output() languageChange = new EventEmitter<string>();
  
  isDropdownOpen: boolean = false;
  availableLanguages: string[] = ['中文', 'English', '日本語'];
  
  ngOnInit(): void {
    // 從 localStorage 中讀取已儲存的語言設定
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      // 通知父組件語言已變更
      this.languageChange.emit(this.currentLanguage);
    }
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // 點擊組件外部時關閉下拉選單
    const clickedInside = (event.target as HTMLElement).closest('.language-selector');
    if (!clickedInside && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
  }
  
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  selectLanguage(language: string): void {
    if (this.currentLanguage !== language) {
      this.currentLanguage = language;
      // 將選擇的語言儲存到 localStorage
      localStorage.setItem('selectedLanguage', language);
      this.languageChange.emit(language);
    }
    this.isDropdownOpen = false;
  }
}
