import { Injectable } from '@angular/core';
import { SearchInputCriteria } from '@wiforge/averos';
import { Observable, of } from 'rxjs';
import { ToDoStatus } from '../model/to-do-status';
import { ToDoTask } from '../model/to-do-task';

@Injectable({
  providedIn: 'root'
})
export class ToDoTaskService {
  
  private toDoTasks: ToDoTask[]=[
    {_id: 1, name: 'task1', description: 'task number 1', status: ToDoStatus.ACTIVE},
    {_id: 2, name: 'task2', description: 'task number 2', status: ToDoStatus.CLOSED},
    {_id: 3, name: 'task3', description: 'task number 3', status: ToDoStatus.ACTIVE},
  ];

  constructor() { }

  updateToDoArea(id: any, toDoTask: any | Partial<any>): Observable<any> {
    let itemTobeUpdated :ToDoTask = this.toDoTasks.find(e => e._id = id)
    // Object.keys(toDoTask).forEach(key => {itemTobeUpdated[key] === toDoTask[key]});
    return of(toDoTask);
  }
  

  createToDoArea(toDoTask: any): Observable<any> {
    this.toDoTasks.push(toDoTask);
    return of();
  }

  deleteToDoArea(id: any): Observable<any> {
    this.toDoTasks = this.toDoTasks.filter(m => m._id !== id);
    return of(this.toDoTasks);
  }


  getAllEntities(): Observable<any[]> {
    return of(this.toDoTasks);
  }

  getEntityById(id: string | number): Observable<any> {

    return of(this.toDoTasks.filter(m => m._id === id));
  }
  getEntitiesByIds(ids: string[]): Observable<any> {
    return of();
  }
  getEntitiesByCriteria(criteria: SearchInputCriteria): Observable<any>{

    return of(this.toDoTasks.filter(m => m.name === criteria.toHttpQuery()));
  }

  deleteRelationCollection(id: any, relationName: string, cids: {_id: string}[]): Observable<any> {
    return of();
  }

  addRelationCollection(id: any, relationName: string, cids: {_id: string}[]): Observable<any> {
    return of();
  }
  
}
