import { Component, Inject } from '@angular/core';
import { Task } from 'src/app/model/Task';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Category } from 'src/app/model/Category';
import { Priority } from 'src/app/model/Priority';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  protected categories: Category[];
  protected priorities: Priority[];


  protected dialogTitle: string; // заголовок окна
  private task: Task; // задача для редактирования/создания

  // сохраняем все значения в отдельные переменные
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  protected tmpTitle: string;
  protected tmpCategory: Category | undefined | null;
  protected tmpPriority: Priority | undefined | null;


  constructor(
      private dialogRef: MatDialogRef<EditTaskDialogComponent>, // // для возможности работы с текущим диалог. окном
      @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в диалоговое окно
      private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
      private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления

  ) {
  }

  ngOnInit() {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна


    // инициализация начальных значений (записывам в отдельные переменные
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;


    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);

  }

  // нажали ОК
  protected onConfirm(): void {

    // считываем все значения для сохранения в поля задачи
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;



    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.task);

  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  protected onCancel(): void {
    this.dialogRef.close(null);
  }


  // нажали Удалить
  protected delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }


}
