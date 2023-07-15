import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  protected dialogTitle: string;
  protected message: string;

  constructor(
      private dialogRef: MatDialogRef<ConfirmDialogComponent>, // для работы с текущим диалог. окном
      @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } // данные, которые передали в диалоговое окно
  ) {
    this.dialogTitle = data.dialogTitle; // заголовок
    this.message = data.message; // сообщение
  }

  ngOnInit() {
  }

  // нажали ОК
  protected onConfirm(): void {
    this.dialogRef.close(true);
  }

  // нажали отмену
  protected onCancel(): void {
    this.dialogRef.close(false);
  }
}
