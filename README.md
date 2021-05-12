# Averos Web Application Starter
### _Only what matters the most_
Averos framework web application starter

<br>

![](https://img.shields.io/badge/AverosWebApplicationAtarter-v1.0.0-blue)
![](https://img.shields.io/badge/poweredby-averos-red)

<br>

## Framework Overview

**Averos** framework is the ultimate [low-code](https://en.wikipedia.org/wiki/Low-code_development_platform), fully [responsive](https://en.wikipedia.org/wiki/Responsive_web_design) [Angular](https://angular.io/)-powered web application development framework that is aimed to simplify web application development while hiding complex technical aspects; providing a full control on [time to market (TTM)](https://en.wikipedia.org/wiki/Time_to_market). 

## Features
- create stunning responsive web application in a jeffy
- focus on business logic
- leverage all angular benefits
- efficient time to market (TTM) control
- microservice architecture
- build scalable application
- leverage an intuitive user interface design powered by angular material, html4 and CSS
- and much more...

# Creating your first application
## I. Overview
Creating an angular application with averos support is 5 steps away:
-  create a regular angular application
- install averos framework
- install averos dependencies
- import AverosCoreModule
- import prebuilt use cases (authentication/profile edit/view/update)
	

<br>

## II. Averos Project Set Up

Install angular cli `npm i @angular/cli` then follow the steps below in order to set up a new angular application with averos integration.


### II.1- Create a new angular application

`$ ng averos-io-starter --style=scss --routing --strict`

 `$ cd averos-io-starter`

<br>

### II.2- Install Averos framework

   `$ npm i @wiforge/averos`

### II.3- Install Averos dependencies  

- **@angular/material**  
  
    `ng add @angular/material`
    > Procede with the following angular material configuration :
    >- [x] Choose a theme
    >- [x] Set up global Angular Material typography styles
    >- [x] Set up browser animations for Angular Material

<br>

- **@angular/flex-layout**
  
    `npm i @angular/flex-layout@11.0.0-beta.33`

<br>

- **@angular/localize**

    `ng add @angular/localize`

>**Note:** This will configure **i18n** capabilities for further multi-language support

<br>

- **@ngrx dependencies**

    `ng add @ngrx/store`

    `ng add @ngrx/store-devtools`

    `ng add @ngrx/effects` 

    `ng add @ngrx/router-store` 

    `ng add @ngrx/entity`

    `ng add @ngrx/schematics` 
    > Procede with the following @ngrx/schematics configuration :
    >- [ ] don't use @ngrx/schematics as the default collection: (no)
    
    <br>

- **file-saver & xlsx libraries**
  
  `npm i file-saver --save` <br>
  `npm i xlsx --save` <br>
  >**Note:** **file-saver** and **xlsx** libraries are mandatory in order to activate data export to file (xlsx/pdf/txt/csv)

<br>

## III. Averos Project configuration

Open the newly created project with your favorite IDE (VSCode is my friend) and procede with the following updates.

### III.1- Update **app.component.ts**

<br>

-  **remove** all default ngrx imports

    ```javascript
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([]),
        StoreRouterConnectingModule.forRoot()
    ```

<br>

-  **import** `AverosCoreModule` and `HttpClientModule`  
  **app.component.ts** will looks like :
    
    ```javascript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';

    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { AverosCoreModule } from '@wiforge/averos';
    import { HttpClientModule } from '@angular/common/http';

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AverosCoreModule.forRoot({beURL: 'http://localhost:3000'}),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
        
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

<br>

### III.2- Update **app-routing.module.ts** add default Averos use cases

Averos comes with a prebuilt use cases including:
   - Signing UP by registering a new user
   - Singing IN   
   - Profile view
   - Profile Edit

These predefined use cases could be enabled by adding their related routes configuration to app-routing.module.ts as shown below:


```javascript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard, CanDeactivateGuard, LoginComponent, 
         ProfileEditComponent, ProfileMainLayoutComponent, ProfileOverviewComponent, 
         RegisterComponent, SelectivePreloadingStrategyService, UnauthenticatedSpaceGuard, 
         UsersResolver } from '@wiforge/averos';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'public', loadChildren: () => import ('@wiforge/averos').then(module => module.PublicSpaceModule),
                canActivate: [UnauthenticatedSpaceGuard]},
  {
    path: 'user/profile',
    component: ProfileMainLayoutComponent,
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    resolve: { loggedUser: UsersResolver },
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: ProfileOverviewComponent,resolve: { loggedUser: UsersResolver }},
      { path: 'settings', pathMatch: 'prefix', component: ProfileEditComponent, canDeactivate: [CanDeactivateGuard],
        resolve: { loggedUser: UsersResolver }},
    ],
  },
{ path: '**', redirectTo: 'public'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: false,
      preloadingStrategy: SelectivePreloadingStrategyService,
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload'
    })
],
exports: [RouterModule]
})
export class AppRoutingModule { }

```

<br>

### III.3- Update **app.component.html**  

  Include the averos framework by **including** the averos framework container template.


  ```html
    <averos-application>
    </averos-application>
  ```

<br>

### III.4- Import Averos Styles 

<br>

#### III.4.1- Update **styles.css**   
 

Import Averos default styles and remove html and body global styles.

>**Note:**: Global html and body styles are already defined in the averos style

<br>

### styles.css :  


```javascript
@import '~@wiforge/averos/src/styles/application-theme.scss';
```
<br>

#### III.4.2- Include Averos ressources - update **angular.json**

<br>
Averos framework comes with a set of bundled ressources such as country icons or picture backgrounds.
These files should be imported so that the application could be rendered correctly. 

<br>

Update the **angular.json** by adding averos custom images assets to the `projects.$projectName.architect.build.assets` section as shown below:<br>	

<br>

```json
{
"assets": 
    [
        "src/favicon.ico",
        "src/assets",
        { 
        "glob": "**/*",
        "input": "./node_modules/@wiforge/averos/src/assets/images", 
        "output": "assets/images" 
        },
        { 
        "glob": "**/*",
        "input": "./node_modules/@wiforge/averos/src/assets/menu", 
        "output": "assets/menu" 
        }
    ]
}
```

<br>


### III.5- I18N configuration 

<br>
Averos framework comes with a set of supported languages which inludes **english**, **german**, **french**, **arabic**, **swedish** and **Norwegian**.  

The `AverosTranslationModule`, holding all the averos framework translation capabilities, is designed to support different types of languages.  

Each language is controlled by a json configuration file that could be created beforehand and placed in the project's `asset/i18n/` folder.
The translation file naming follow a naming convention defined by `${country_code}.json` (example: **en.json**).  

A set of translation files examples are located in this project starter assets/i18n folder and could be updated at your convenience.  


### III.6- Update **index.html** (OPTIONAL) 

The application font can be updated in the index.html by adding a reference to the target font.  
I personally enjoy to work with the `cairo` font as it gives a beautifull look and feel.  

In order to enable the `cairo` font update **index.html** by adding the following resource reference to html `head` section:  
<br>


```html
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
```  

Similarly, a LOADING indicator could be added to the `app-root` as shown below:

```html
<app-root>
    <span>LOADING...</span>
</app-root>
```
<br>




















