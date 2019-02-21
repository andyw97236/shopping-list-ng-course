import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient  } from "@angular/common/http";

import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';


@Injectable()

export class DataStorageService {

    constructor(private http: HttpClient,
            private recipeService: RecipeService,
            private authService: AuthService){}

    getHttpHeaders(){      
        return new HttpHeaders({
            'Content-type' : 'application/json'
        });
    }

    storeRecipes() {
        if (this.recipeService.getRecipes().length == 0) return;
        const token =  this.authService.getToken();
        return this.http.put('https://shopping-list-ng-course.firebaseio.com/recipes.json?auth=' + token,
                          this.recipeService.getRecipes(),
                           {headers: this.getHttpHeaders()  }
                          );

    }

    getRecipes() {
        const token =  this.authService.getToken();
        return  this.http.get<Recipe[]>('https://shopping-list-ng-course.firebaseio.com/recipes.json?auth=' + token, {
            headers: this.getHttpHeaders()
        })
        .subscribe(
         (recipes: Recipe[]) => {
            for(const recipe of recipes){
                if(!recipe['ingredients']) {
                 recipe['ingredients'] = [];
                }
     
              }
            this.recipeService.setRecipes(recipes);
    
        },
         (error) =>  console.log('Something went wrong')
      );
    
      }
}