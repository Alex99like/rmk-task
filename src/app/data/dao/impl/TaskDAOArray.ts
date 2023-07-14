import { Observable, of } from "rxjs";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Task } from "src/app/model/Task";
import { TaskDAO } from "../interface/TaskDAO";
import { TestData } from "../../TestData";

export class TaskDAOArray implements TaskDAO {

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task | undefined> {
    return of(TestData.tasks.find(todo => todo.id === id))
  }

  add(val: Task): Observable<Task> {
    throw new Error("Method not implemented.");
  }

  update(val: Task): Observable<Task> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<Task> {
    throw new Error("Method not implemented.");
  }

  search(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Observable<Task[]> {
    return of(this.searchTodos(category, searchText, status, priority));
  }

  private searchTodos(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Task[] {

    let allTasks = TestData.tasks;


    if (category != null) {
        allTasks = allTasks.filter(todo => todo.category === category);
    }


    return allTasks; // отфильтрованный массив
}

  getCompletedCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }
  getUncompletedCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }
  getTotalCountInCategory(category: Category): Observable<number> {
    throw new Error("Method not implemented.");
  }
  getTotalCount(): Observable<number> {
    throw new Error("Method not implemented.");
  }
}
