import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';

import { IntegracaoNumericaComponent } from './integracao-numerica.component';

@NgModule({
  declarations: [
    IntegracaoNumericaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputTextModule
  ]
})

export class IntegracaoNumericaModule { }
