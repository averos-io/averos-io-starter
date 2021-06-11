import { Injectable } from '@angular/core';
import { ViewLayoutService } from '@wiforge/averos';
import { ToDoArea } from '../model/to-do-area';
import { ToDoTask } from '../model/to-do-task';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInitializerService {

  private registeredEntities: Array<any> = [ToDoTask.instanceMetadata, ToDoArea.instanceMetadata];

  constructor(private viewLayoutService: ViewLayoutService) { }


  initialize(): Promise<any> {
    const p1 = new Promise ((resolve, reject) => {
      this.viewLayoutService.registerEntitiesViewLayouts(this.registeredEntities);
    resolve(true)});
    const asyncInitPromises: Promise<any>[] = [p1];
 
    return Promise.all(asyncInitPromises);// Wait for all promises to execute
  }
}
