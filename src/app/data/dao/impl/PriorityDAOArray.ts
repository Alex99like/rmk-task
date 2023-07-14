import { Observable } from "rxjs";
import { Priority } from "src/app/model/Priority";
import { PriorityDAO } from "../interface/PriorityDAO";

export class PriorityDAOArray implements PriorityDAO {
  add(val: Priority): Observable<Priority> {
    throw new Error("Method not implemented.");
  }
  get(id: number): Observable<Priority> {
    throw new Error("Method not implemented.");
  }
  update(val: Priority): Observable<Priority> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Observable<Priority> {
    throw new Error("Method not implemented.");
  }
  getAll(): Observable<Priority[]> {
    throw new Error("Method not implemented.");
  }
}
