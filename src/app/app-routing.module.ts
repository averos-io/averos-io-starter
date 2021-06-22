import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard, CanDeactivateGuard, LoginComponent, 
         ProfileEditComponent, ProfileMainLayoutComponent, ProfileOverviewComponent, 
         RegisterComponent, UnauthenticatedSpaceGuard, 
         UserDashboardComponent, 
         UsersResolver } from '@wiforge/averos';
import { CreateToDoAreaComponent } from './view/to-do-area/create-to-do-area/create-to-do-area.component';
import { SearchToDoAreaComponent } from './view/to-do-area/search-to-do-area/search-to-do-area.component';
import { ToDoAreaDetailsComponent } from './view/to-do-area/to-do-area-details/to-do-area-details.component';
import { CreateToDoTaskComponent } from './view/to-do-task/create-to-do-task/create-to-do-task.component';
import { SearchToDoTaskComponent } from './view/to-do-task/search-to-do-task/search-to-do-task.component';
import { ToDoTaskDetailsComponent } from './view/to-do-task/to-do-task-details/to-do-task-details.component';

   const routes: Routes = [
        { path: '', redirectTo: 'public', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'dashboard', component: UserDashboardComponent },
        { path: 'public', loadChildren: () => import ('@wiforge/averos').then(module => module.PublicSpaceModule),
                      canActivate: [UnauthenticatedSpaceGuard]},
        { path: 'users', loadChildren: () => import ('@wiforge/averos').then(module => module.UsersModule),
                      canActivate: [AuthenticationGuard],
                      data: {preload: true}},
        {
          path: 'user/profile',
          component: ProfileMainLayoutComponent,
          canActivate: [AuthenticationGuard],
          canActivateChild: [AuthenticationGuard],
          resolve: { loggedUser: UsersResolver },
          children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            {path: 'overview', component: ProfileOverviewComponent,resolve: { loggedUser: UsersResolver }},
            {path: 'settings', pathMatch: 'prefix', component: ProfileEditComponent, canDeactivate: [CanDeactivateGuard],
              resolve: { loggedUser: UsersResolver }},
          ],
        },
        
        /** ToDoArea Routes */
        { path: 'todoarea/create', component: CreateToDoAreaComponent, canActivate: [AuthenticationGuard]},
        { path: 'todoarea/search', component: SearchToDoAreaComponent, canActivate: [AuthenticationGuard]},
        { path: 'todoarea/view/:id', pathMatch: 'full', component: ToDoAreaDetailsComponent, canActivate: [AuthenticationGuard]},
        { path: 'todoarea/edit/:id', pathMatch: 'full', component: ToDoAreaDetailsComponent, canActivate: [AuthenticationGuard]},
        /** ToDoTask Routes */
        { path: 'todotask/create', component: CreateToDoTaskComponent, canActivate: [AuthenticationGuard]},
        { path: 'todotask/search', component: SearchToDoTaskComponent, canActivate: [AuthenticationGuard]},
        { path: 'todotask/view/:id', pathMatch: 'full', component: ToDoTaskDetailsComponent, canActivate: [AuthenticationGuard]},
        { path: 'todotask/edit/:id', pathMatch: 'full', component: ToDoTaskDetailsComponent, canActivate: [AuthenticationGuard]},

        { path: '**', redirectTo: 'public'}
      
      ];
      
      @NgModule({
        imports: [RouterModule.forRoot(routes, 
          {
            enableTracing: false,
            preloadingStrategy: PreloadAllModules,
            relativeLinkResolution: 'legacy',
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload'
          })],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }