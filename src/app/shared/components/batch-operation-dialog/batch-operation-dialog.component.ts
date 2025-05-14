import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface BatchOperationDialogData {
  title: string;
  message: string;
  type: 'status' | 'location' | 'custodian' | 'barcode' | 'export' | 'delete' | 'confirm';
  options?: { value: string; label: string; icon?: string }[];
  selectedValue?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  color?: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'app-batch-operation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './batch-operation-dialog.component.html',
  styleUrls: ['./batch-operation-dialog.component.scss']
})
export class BatchOperationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BatchOperationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BatchOperationDialogData
  ) {
    // 設置默認值
    this.data.confirmButtonText = this.data.confirmButtonText || '確認';
    this.data.cancelButtonText = this.data.cancelButtonText || '取消';
    this.data.color = this.data.color || 'primary';
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(this.data.selectedValue || true);
  }
}
