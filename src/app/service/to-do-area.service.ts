import { Injectable } from '@angular/core';
import { SearchInputCriteria } from '@wiforge/averos';
import { Observable, of } from 'rxjs';
import { ToDoArea } from '../model/to-do-area';

@Injectable({
  providedIn: 'root'
})
export class ToDoAreaService {

  private toDoAreas: ToDoArea[]=[
    {_id: 1, name: 'Area1', description: 'task number 1', toDoTasks: []},
    {_id: 2, name: 'Area2', description: 'task number 2', toDoTasks: []},
    {_id: 3, name: 'Area3', description: 'task number 3', toDoTasks: []},
  ];


  constructor() { }

  updateToDoArea(id: any, toDoAreas: any | Partial<any>): Observable<any> {
    return of();
  }
  

  createToDoArea(toDoAreas: any): Observable<any> {
    this.toDoAreas.push(toDoAreas)
    return of(toDoAreas);
  }

  deleteToDoArea(id: any): Observable<any> {
    return of();
  }


  getAllEntities(): Observable<any[]> {
    return of(this.toDoAreas);
  }

  getEntityById(id: string | number): Observable<any> {

    return of();
  }
  getEntitiesByIds(ids: string[]): Observable<any> {
    return of();
  }
  getEntitiesByCriteria(criteria: SearchInputCriteria): Observable<any>{

    return of();
  }

  deleteRelationCollection(id: any, relationName: string, cids: {_id: string}[]): Observable<any> {
    return of();
  }

  addRelationCollection(id: any, relationName: string, cids: {_id: string}[]): Observable<any> {
    return of();
  }
}
