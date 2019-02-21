import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];
    
    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngrediants(ingredients: Ingredient[]){
        //not a good approach addIngredient fires an event when added so wait until the end
        // for (let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        /// ... converts array to a list so that push adds our ingredients to the predefined array
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}