import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';


// routes are first come first serve have static routes before dynamic routes
const authRoutes: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
];

@NgModule({
    // only call forRoot in the app module all other routes must use forChild
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {
    
}