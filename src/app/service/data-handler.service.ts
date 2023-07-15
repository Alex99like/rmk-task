import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { TestData } from '../data/TestData';
import { Task } from '../model/Task';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TaskDAOArray } from '../data/dao/impl/TaskDAOArray';
import { CategoryDAOArray } from '../data/dao/impl/CategoryDAOArray';
import { Priority } from '../model/Priority';
import { PriorityDAOArray } from '../data/dao/impl/PriorityDAOArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // релизации работы с данными с помощью массива
    // (можно подставлять любые релизации, в том числе с БД. Главное - соблюдать интерфейсы)
    private taskDaoArray = new TaskDAOArray();
    private categoryDaoArray = new CategoryDAOArray();
    private priorityDaoArray = new PriorityDAOArray();


    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDaoArray.getAll();
    }

    getAllCategories(): Observable<Category[]> {
        return this.categoryDaoArray.getAll();
    }

    getAllPriorities(): Observable<Priority[]> {
        return this.priorityDaoArray.getAll();
    }


    updateTask(task: Task): Observable<Task> {
        return this.taskDaoArray.update(task);
    }


    // поиск задач по параметрам
    searchTasks(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Observable<Task[]> {
        return this.taskDaoArray.search(category, searchText, status, priority);
    }

    deleteTask(id: number): Observable<Task | undefined> {
        return this.taskDaoArray.delete(id);
    }
}
