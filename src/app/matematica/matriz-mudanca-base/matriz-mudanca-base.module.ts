import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';

import { MatrizMudancaBaseComponent } from './matriz-mudanca-base.component';

@NgModule({
  declarations: [
    MatrizMudancaBaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    InputTextModule
  ]
})
export class MatrizMudancaBaseModule { }
