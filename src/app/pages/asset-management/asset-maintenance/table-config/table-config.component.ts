import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

export interface ColumnConfig {
  field: string;
  header: string;
  visible: boolean;
  order: number;
}

@Component({
  selector: 'app-table-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    DragDropModule
  ],
  templateUrl: './table-config.component.html',
  styleUrls: ['./table-config.component.scss']
})
export class TableConfigComponent {
  columns: ColumnConfig[];

  constructor(
    public dialogRef: MatDialogRef<TableConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { columns: ColumnConfig[] }
  ) {
    // 深拷貝列配置，避免直接修改原始數據
    this.columns = JSON.parse(JSON.stringify(data.columns));
  }

  drop(event: CdkDragDrop<ColumnConfig[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    // 更新順序
    this.columns.forEach((column, index) => {
      column.order = index;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.columns);
  }

  // 切換全部選擇/取消選擇
  toggleAll(checked: boolean): void {
    this.columns.forEach(column => {
      column.visible = checked;
    });
  }

  // 檢查是否全部選中
  isAllSelected(): boolean {
    return this.columns.every(column => column.visible);
  }

  // 檢查是否部分選中
  isPartiallySelected(): boolean {
    return this.columns.some(column => column.visible) && !this.isAllSelected();
  }
}
