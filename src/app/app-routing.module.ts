import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard, CanDeactivateGuard, LoginComponent, 
         ProfileEditComponent, ProfileMainLayoutComponent, ProfileOverviewComponent, 
         RegisterComponent, SelectivePreloadingStrategyService, UnauthenticatedSpaceGuard, 
         UserDashboardComponent, 
         UsersResolver } from '@wiforge/averos';

         const routes: Routes = [
          { path: '', redirectTo: 'public', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'dashboard', component: UserDashboardComponent },
        { path: 'public', loadChildren: () => import ('@wiforge/averos').then(module => module.PublicSpaceModule),
                      canActivate: [UnauthenticatedSpaceGuard]},
        // { path: 'users', loadChildren: () => import ('@wiforge/averos').then(module => module.UsersModule),
        //               canActivate: [AuthenticationGuard],
        //               data: {preload: true}},
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
        }
        // ,
        // { path: 'referential', loadChildren: () => import ('@wiforge/averos').then(module => module.ReferentialModule),
        //   canActivate: [AuthenticationGuard],
        //   data: {preload: true}}
        ,
        { path: '**', redirectTo: 'public'}
      
      ];
      
      @NgModule({
        imports: [RouterModule.forRoot(routes, 
          {
            enableTracing: false,
            preloadingStrategy: PreloadAllModules,//SelectivePreloadingStrategyService,
            relativeLinkResolution: 'legacy',
            scrollPositionRestoration: 'enabled',// 'top',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload'
          })],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }