import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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


  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
      this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks);

      // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
      this.dataSource = new MatTableDataSource();

      this.refreshTable();
  }


  toggleTaskCompleted(task: Task) {
      task.completed = !task.completed;
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  protected getPriorityColor(task: Task) {

      if (task.completed) {
        return '#F8F9FA'
      }

      if (task.priority && task.priority.color) {
          return task.priority.color;
      }

      return '#fff';

  }

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private refreshTable() {

      this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)


  }
}
