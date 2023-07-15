import { Component } from '@angular/core';
import { Task } from './model/Task';
import { DataHandlerService } from './service/data-handler.service';
import { Category } from './model/Category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rmk-task';
  tasks: Task[];
  categories: Category[];

  private selectedCategory: Category | null = null;


  constructor(
      private dataHandler: DataHandlerService, // фасад для работы с данными
  ) {
  }

  ngOnInit(): void {
      // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
      this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

      this.onSelectCategory(null); // показать все задачи

  }


  // изменение категории
  protected onSelectCategory(category: Category | null) {

      this.selectedCategory = category;

      this.dataHandler.searchTasks(
          this.selectedCategory,
          null,
          null,
          null
      ).subscribe(tasks => {
          this.tasks = tasks;
      });

  }

  protected onUpdateTask(task: Task) {

    this.dataHandler.updateTask(task).subscribe(() => {
        this.dataHandler.searchTasks(
            this.selectedCategory,
            null,
            null,
            null
        ).subscribe(tasks => {
            this.tasks = tasks;
        });
    });

}
}
