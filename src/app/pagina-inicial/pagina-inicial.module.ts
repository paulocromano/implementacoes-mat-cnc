import { PaginaInicialComponent } from './pagina-inicial.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PaginaInicialComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PaginaInicialModule { }
