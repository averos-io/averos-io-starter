
import { Injectable } from '@angular/core';
import { ViewLayoutService } from '@wiforge/averos';
import { ToDoArea } from '../model/to-do-area';
import { ToDoTask } from '../model/to-do-task';

@Injectable({
  providedIn: 'root'
})
export class ApplicationInitializerService {

  private registeredEntities: Array<any> = [ ToDoArea.instanceMetadata, ToDoTask.instanceMetadata];

  constructor(private viewLayoutService: ViewLayoutService) { }


  initialize(): Promise<any> {
    return Promise.all([new Promise ((resolve, reject) => {
      this.viewLayoutService.registerEntitiesViewLayouts(this.registeredEntities);
      resolve(true)})]);
  }
}