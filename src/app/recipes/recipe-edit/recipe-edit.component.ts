import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  private subscription: any;
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    //best practice unsub from events onDestroy
    this.subscription = this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  ngOnDestroy(){
    //best practice unsub from events onDestroy
    this.subscription.unsubscribe();
  }

  onAddIngredient(){
    // must cast to be treated as FormArray otherwise typescript gets confused
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          // we do call this as a method because pattern is a factory that returns a ref to the configed validator
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getIngredientControls(){
    return (<FormGroup>this.recipeForm.get('ingredients')).controls
  }

  onSubmit(){
    // because our form has the exact same values as our recipe model we can simplfy this
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  // we do call this as a method because pattern is a factory that returns a ref to the configed validator
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      //only pass reference to Validators don't call it by omitting parathesis
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
