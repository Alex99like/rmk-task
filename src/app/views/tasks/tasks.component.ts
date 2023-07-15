import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
// поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
    protected displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
    protected dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

    // ссылки на компоненты таблицы
    @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) private sort: MatSort;


    @Output()
    deleteTask = new EventEmitter<Task>();

    @Output()
    updateTask = new EventEmitter<Task>();


    protected tasks: Task[];

    // текущие задачи для отображения на странице
    @Input('tasks')
    public set setTasks(tasks: Task[]) { // напрямую не присваиваем значения в переменную, только через @Input
        this.tasks = tasks;
        this.fillTable();
    }

    constructor(
        private dataHandler: DataHandlerService, // доступ к данным
        private dialog: MatDialog, // работа с диалоговым окном

    ) {
    }

    ngOnInit() {

        // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

        // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
        this.dataSource = new MatTableDataSource();
        this.fillTable(); // заполняем таблицы данными (задачи) и всеми метаданными
    }


    toggleTaskCompleted(task: Task) {
        task.completed = !task.completed;
    }

    // в зависимости от статуса задачи - вернуть цвет названия
    protected getPriorityColor(task: Task): string {

        // цвет завершенной задачи
        if (task.completed) {
            return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)

    }

    // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
    private fillTable(): void {

        if (!this.dataSource) {
            return;
        }

        this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

        this.addTableObjects();


        // когда получаем новые данные..
        // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
        // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
        this.dataSource.sortingDataAccessor = (task, colName) => {

            // по каким полям выполнять сортировку для каждого столбца
            switch (colName) {
                case 'priority': {
                    return task.priority ? task.priority.id : null;
                }
                case 'category': {
                    return task.category ? task.category.title : null;
                }
                case 'date': {
                    return task.date ? task.date : null;
                }

                case 'title': {
                    return task.title;
                }
            }
        };


    }

    private addTableObjects(): void {
        this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
        this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
    }

    // диалоговое редактирования для добавления задачи
    protected openEditTaskDialog(task: Task): void {

        // открытие диалогового окна
        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Редактирование задачи'],
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            // обработка результатов


            if (result === 'delete') {
                this.deleteTask.emit(task);
                return;
            }

            if (result as Task) { // если нажали ОК и есть результат
                this.updateTask.emit(task);
                return;
            }

        });
    }

}
