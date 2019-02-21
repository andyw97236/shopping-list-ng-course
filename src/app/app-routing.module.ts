import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './Core/home/home.component';

// routes are first come first serve have static routes before dynamic routes
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},//lazy loading on demand
    { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
    // only call forRoot in the app module all other routes must use forChild - PRELOAD Lazy loading
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}