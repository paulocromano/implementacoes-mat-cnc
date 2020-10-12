
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';

import { MatrizMudancaBaseComponent } from './matriz-mudanca-base.component';

@NgModule({
  declarations: [
    MatrizMudancaBaseComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    InputTextModule
  ]
})
export class MatrizMudancaBaseModule { }
