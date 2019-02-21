import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropDownDirective } from './dropdown.directive';

/*
don't provide services on a shared module
services should be provided at the level they are needed.
otherwise you might not get the instance of the service you want.
*/

@NgModule({
    declarations: [
        DropDownDirective
    ],
    exports: [
        CommonModule,
        DropDownDirective
    ]
})

export class SharedModule{}