import { Observable, of } from "rxjs";
import { Category } from "src/app/model/Category";
import { Priority } from "src/app/model/Priority";
import { Task } from "src/app/model/Task";
import { TaskDAO } from "../interface/TaskDAO";
import { TestData } from "../../TestData";

export class TaskDAOArray implements TaskDAO {

  get(id: number): Observable<Task | undefined> {

        return of(TestData.tasks.find(task => task.id === id));
    }

    getAll(): Observable<Task[]> {
        return of(TestData.tasks);
    }

    add(task: Task): Observable<Task> {

        // если id пустой - генерируем его
        if (task.id === null || task.id === 0) {
            task.id = this.getLastIdTask();
        }
        TestData.tasks.push(task);

        return of(task);
    }

    delete(id: number): Observable<Task | undefined> {

        const taskTmp = TestData.tasks.find(t => t.id === id); // удаляем по id
        taskTmp && TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);

        return of(taskTmp);

    }

    update(task: Task): Observable<Task> {

        const taskTmp = TestData.tasks.find(t => t.id === task.id); // обновляем по id
        taskTmp && TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);

        return of(task);

    }

    // поиск задач по всем параметрам
    // если значение null - параметр не нужно учитывать при поиске
    // если searchTaskText == '', то будут возвращаться все значения
    search(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Observable<Task[]> {

        return of(this.searchTasks(category, searchText, status, priority));

    }

    private searchTasks(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null): Task[] {

        let allTasks = TestData.tasks;

        // поочереди применяем все условия (какие не пустые)
        if (status != null) {
            allTasks = allTasks.filter(task => task.completed === status);
        }

        if (category != null) {
            allTasks = allTasks.filter(task => task.category === category);
        }

        if (priority != null) {
            allTasks = allTasks.filter(task => task.priority === priority);
        }

        if (searchText != null) {
            allTasks = allTasks.filter(
                task =>
                    task.title.toUpperCase().includes(searchText.toUpperCase()) // учитываем текст поиска (если '' - возвращаются все значения)
            );
        }

        return allTasks;
    }


    // находит последний id (чтобы потом вставить новую запись с id, увеличенным на 1) - в реальной БД это происходит автоматически
    private getLastIdTask(): number {
        return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
    }


    // кол-во завершенных задач в заданной категории (если category === null, то для всех категорий)
    getCompletedCountInCategory(category: Category): Observable<number> {
        return of(this.searchTasks(category, null, true, null).length);
    }

    // кол-во незавершенных задач в заданной категории (если category === null, то для всех категорий)
    getUncompletedCountInCategory(category: Category): Observable<number> {
        return of(this.searchTasks(category, null, false, null).length);
    }

    // кол-во всех задач в заданной категории (если category === null, то для всех категорий)
    getTotalCountInCategory(category: Category): Observable<number> {
        return of(this.searchTasks(category, null, null, null).length);
    }

    // кол-во всех задач в общем
    getTotalCount(): Observable<number> {
        return of(TestData.tasks.length);
    }
}
