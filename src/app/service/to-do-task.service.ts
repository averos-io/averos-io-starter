import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationSharedService, AverosSearchOperator, SearchInputCriteria } from '@wiforge/averos';
import { Observable, of } from 'rxjs';
import { ToDoStatus } from '../model/to-do-status';

@Injectable({
  providedIn: 'root'
})
export class ToDoTaskService {
  
  public toDoTaskAPI = 'http://localhost:3333/api/todotasks';


  constructor(private httpClient: HttpClient,
              private applicationSharedService: ApplicationSharedService) { }

  updateEntity(id: any, toDoTask: any | Partial<any>): Observable<any> {
    const data = { ...toDoTask }
    data.updatedBy =  this.applicationSharedService.getLoggedUser();
    return this.httpClient.patch<any>(`${this.toDoTaskAPI}/${id}`, data);
  }
  
  createEntity(toDoTask: any): Observable<any> {
    toDoTask.createdBy =  this.applicationSharedService.getLoggedUser();
    toDoTask.status = ToDoStatus.ACTIVE;
    return this.httpClient.post<any>(this.toDoTaskAPI, toDoTask);
  }

  deleteEntity(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.toDoTaskAPI}/${id}`);
    
  }

  /**
   * EndPoint: http://localhost:3333/todotask 
   * @returns 
   */
  getAllEntities(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.toDoTaskAPI);
  }

  /**
   * URI: http://localhost:3333/todotask/:id 
   * @returns 
   */
  getEntityById(id: string | number): Observable<any> {
    return this.httpClient.get<any>(`${this.toDoTaskAPI}/${id}`);
  }
  getEntitiesByIds(ids: string[]): Observable<any> {
    if (ids.length === 0){
      return null;
    }
    const criteriaz = 
                      {id:
                        {
                          entityAccessor: 'id',
                          entityValue: ids,
                          operator: AverosSearchOperator.OPER_IN_ELEMENTS
                        }
                      };
    return this.getEntitiesByCriteria(new SearchInputCriteria(criteriaz));
  }
  getEntitiesByCriteria(criteria: SearchInputCriteria): Observable<any>{

    let query: string = null;

    if (criteria === undefined || criteria === null){
      return null;
    }   

    query = criteria.toHttpQuery('JSON-SERVER');
    const opts =  {
                    params: new HttpParams({fromString: query})
                   };
    return this.httpClient.get<any[]>(this.toDoTaskAPI, opts);
    // return of(Array.from(this.toDoAreas));//.filter(m => m.name === criteria.toHttpQuery()));
  }

  deleteRelationCollection(id: any, relationName: string, cids: {id: string}[]): Observable<any> {
    return of();
  }

  addRelationCollection(id: any, relationName: string, cids: {id: string}[]): Observable<any> {
    return of();
  }
  
}
