import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AverosCoreModule } from '@wiforge/averos';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationInitializerService } from './service/application-initializer.service';
import { CreateToDoAreaComponent } from './view/to-do-area/create-to-do-area/create-to-do-area.component';
import { SearchToDoAreaComponent } from './view/to-do-area/search-to-do-area/search-to-do-area.component';
import { CreateToDoTaskComponent } from './view/to-do-task/create-to-do-task/create-to-do-task.component';
import { SearchToDoTaskComponent } from './view/to-do-task/search-to-do-task/search-to-do-task.component';

// ******************* Custom application initializer loader ***/
export function applicationInitializer(applicationInitializerService: ApplicationInitializerService): () => Promise<any> {
  return () => applicationInitializerService.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    CreateToDoAreaComponent,
    SearchToDoAreaComponent,
    CreateToDoTaskComponent,
    SearchToDoTaskComponent
  ],
  imports: [
    AverosCoreModule.forRoot({beURL: 'http://localhost:3000'}),
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
              }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
