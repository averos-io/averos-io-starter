import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AverosCoreModule } from '@wiforge/averos';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationInitializerService } from './service/application-initializer.service';
import { CreateToDoAreaComponent } from './view/to-do-area/create-to-do-area/create-to-do-area.component';
import { ToDoAreaDetailsComponent } from './view/to-do-area/to-do-area-details/to-do-area-details.component';
import { SearchToDoAreaComponent } from './view/to-do-area/search-to-do-area/search-to-do-area.component';
import { CreateToDoTaskComponent } from './view/to-do-task/create-to-do-task/create-to-do-task.component';
import { ToDoTaskDetailsComponent } from './view/to-do-task/to-do-task-details/to-do-task-details.component';
import { SearchToDoTaskComponent } from './view/to-do-task/search-to-do-task/search-to-do-task.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateToDoAreaComponent,
    ToDoAreaDetailsComponent,
    SearchToDoAreaComponent,
    CreateToDoTaskComponent,
    ToDoTaskDetailsComponent,
    SearchToDoTaskComponent
  ],
  imports: [
    AverosCoreModule.forRoot({ beURL: 'http://localhost:3333', supportedLanguages: ['en'] }),
BrowserModule,
    AppRoutingModule, 
BrowserAnimationsModule, 
HttpClientModule
  ],
  providers: [
               {
                  provide: APP_INITIALIZER,
                  useFactory: applicationInitializer,
                  deps: [ApplicationInitializerService],
                  multi: true
               }],
  bootstrap: [AppComponent]
})
export class AppModule { }

 /******************** Custom application initializer loader: DO NOT REMOVE IT ********************/
export function applicationInitializer(applicationInitializerService: ApplicationInitializerService): () => Promise<any> {
  return () => applicationInitializerService.initialize();
}
