import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntegracaoNumericaComponent } from './calculo-numerico-computacional/integracao-numerica/integracao-numerica.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { MatrizMudancaBaseComponent } from './matematica/matriz-mudanca-base/matriz-mudanca-base.component';

const routes: Routes = [
  { path: 'matematica/mudanca-base', component: MatrizMudancaBaseComponent },
  { path: 'calculo-numerico/integracao-numerica', component: IntegracaoNumericaComponent },
  { path: '**', component: PaginaInicialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
