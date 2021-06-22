import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@wiforge/averos';
import { AverosSearchOperator, SearchInputCriteria, ApplicationSharedService } from '@wiforge/averos';
import {Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ToDoArea } from '../model/to-do-area';

@Injectable({
  providedIn: 'root'
})
export class ToDoAreaService {

  public toDoAreaAPI = 'http://localhost:3333/api/todoareas';

  private toDoTaskAPI = 'http://localhost:3333/api/todotasks';


  constructor(private httpClient: HttpClient,
              private applicationSharedService: ApplicationSharedService) { }

  updateEntity(id: any, toDoAreas: any | Partial<any>): Observable<any> {
    const data = { ...toDoAreas }
    data.updatedBy =  this.applicationSharedService.getLoggedUser();
    return this.httpClient.patch<any>(this.toDoAreaAPI + id, data);
  }
  

  createEntity(toDoArea: any): Observable<any> {
    toDoArea.createdBy =  this.applicationSharedService.getLoggedUser();
    return this.httpClient.post<any>(this.toDoAreaAPI, toDoArea);
  }

  deleteEntity(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.toDoAreaAPI}/${id}`);
  }

  /**
   * EndPoint: http://localhost:3333/todoarea 
   * @returns 
   */
  getAllEntities(): Observable<ToDoArea[]> {
    return this.httpClient.get<any[]>(this.toDoAreaAPI);
  }

  getEntityById(id: string | number): Observable<any> {

    return this.httpClient.get<any>(`${this.toDoAreaAPI}/${id}?_embed=toDoTasks`);
  }

  getEntitiesByIds(ids: string[]): Observable<any> {
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

    query = criteria.toHttpQuery('REGULAR');
    const opts =  {
                    params: new HttpParams({fromString: query+'&_embed=toDoTasks'})
                   };
    return this.httpClient.get<any[]>(this.toDoAreaAPI, opts);
    // return of(Array.from(this.toDoAreas));//.filter(m => m.name === criteria.toHttpQuery()));
  }

  /**
   * 
   * @param id the parent entity id (User)
   * @param relationName : The collection relation Name (ex. "roles")
   * @param cids : the ids of the collection to be removed from the parent entity (User) 
   * @returns 
   * 
   * N.B: cids: {id: string}[]) : cids structure depends on the identifier name of the entity:
   * ex: id entity'identifier == 
   *                              + "_id" ==> cids: {_id: string}[]
   *                              + "_id" ==> cids: {_id: string}[]
   *                              + "identifier" ==> cids: {identifier: string}[]
   *                              + "some_id" ==> cids: {some_id: string}[]
   *                              + ...ect...
   */
   deleteRelationCollection(parentId: any, relationName: string, cids: {id: string}[]): Observable<any> {

    let operations: Observable<any> = new Observable();
    const data: { [x: string]: User; } = null;
  
    data['updatedBy'] =  this.applicationSharedService.getLoggedUser();
    const options = {
      headers: {
        'inline-loading': 'true'
      }
    }

    if (relationName === 'toDoTasks'){
        operations = cids.reduce((previousValue: Observable<any>, currentValue: {id: string}) => {
          previousValue = previousValue != null 
                ? previousValue.pipe(mergeMap(el => this.httpClient.patch<any>(`${this.toDoTaskAPI}/${currentValue.id}`, {"toDoArea_id": ""}, options))) 
                : this.httpClient.patch<any>(`${this.toDoTaskAPI}/${currentValue.id}`, {"toDoArea_id": ""}, options);
          return previousValue;
        }, null);
    }
    return operations.pipe(mergeMap(e => this.httpClient.patch<any>(`${this.toDoAreaAPI}/${parentId}` , data, options)));    
  }

    /**
   * 
   * @param parentId the parent entity id (ToDoArea)
   * @param relationName : The collection relation Name (ex. "roles")
   * @param cids : the ids of the collection to be added from the parent entity (User) 
   * @returns 
   */
     addRelationCollection(parentId: any, relationName: string, cids: {id: string}[]): Observable<any> {

      let operations: Observable<any> = new Observable();
      const data: { [x: string]: User; } = null;
    
      data['updatedBy'] =  this.applicationSharedService.getLoggedUser();
      const options = {
        headers: {
          'inline-loading': 'true'
        }
      }

      /**
       * update the target elements in the collection by setting the parent id
       * then 
       * update the parent's updateBy field
       */
      if (relationName === 'toDoTasks'){
      // Handles the relation 'toDoTasks': Updates all the childs in a seperate chained requests (mergeMap()),
      //   then updates the parent entity (the owner) with the latest 'updateBy' user

      // Could also use forkJoin for parallel update on the collection
        operations = cids.reduce((previousValue: Observable<any>, currentValue: {id: string}) => {
          previousValue = previousValue != null 
                ? previousValue.pipe(mergeMap(el => this.httpClient.patch<any>(`${this.toDoTaskAPI}/${currentValue.id}`, {"toDoArea_id": parentId}))) 
                : this.httpClient.patch<any>(`${this.toDoTaskAPI}/${currentValue.id}`, {"toDoArea_id": parentId});
          return previousValue;
        }, null);
      }

        return operations.pipe(mergeMap(e => this.httpClient.patch<any>(`${this.toDoAreaAPI}/${parentId}` , data)));
    }


}
