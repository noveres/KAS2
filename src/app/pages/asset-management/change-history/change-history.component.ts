import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

interface ChangeHistory {
  id: string;
  assetId: string;
  assetName: string;
  changeType: string;
  changeDate: Date;
  changedBy: string;
  oldValue: string;
  newValue: string;
  remarks: string;
}

@Component({
  selector: 'app-change-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule
  ],
  templateUrl: './change-history.component.html',
  styleUrl: './change-history.component.scss'
})
export class ChangeHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'changeDate',
    'assetName',
    'changeType',
    'changedBy',
    'oldValue',
    'newValue',
    'remarks',
    'actions'
  ];

  changeHistory: ChangeHistory[] = [
    {
      id: '1',
      assetId: 'ASSET001',
      assetName: '筆記型電腦 Dell XPS',
      changeType: '狀態變更',
      changeDate: new Date('2025-05-15'),
      changedBy: '王小明',
      oldValue: '正常使用',
      newValue: '維修中',
      remarks: '螢幕故障'
    },
    {
      id: '2',
      assetId: 'ASSET002',
      assetName: '辦公桌 A1',
      changeType: '部門調動',
      changeDate: new Date('2025-05-14'),
      changedBy: '李大華',
      oldValue: '資訊部',
      newValue: '人資部',
      remarks: '部門重組'
    },
    {
      id: '3',
      assetId: 'ASSET003',
      assetName: '投影機 Epson',
      changeType: '保管人變更',
      changeDate: new Date('2025-05-13'),
      changedBy: '張美玲',
      oldValue: '陳志明',
      newValue: '王小明',
      remarks: '職務調動'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  viewDetails(history: ChangeHistory): void {
    console.log('查看詳情:', history);
  }

  exportHistory(): void {
    console.log('匯出歷史紀錄');
  }
}
