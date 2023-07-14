import { Observable } from "rxjs";

export interface CommonDAO<T> {

  add(val: T): Observable<T>;

  get(id: number): Observable<T | undefined>;

  update(val: T): Observable<T>;

  delete(id: number): Observable<T>;

  getAll(): Observable<T[]>;
}
