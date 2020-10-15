import { PaginaInicialModule } from './pagina-inicial/pagina-inicial.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatrizMudancaBaseModule } from './matematica/matriz-mudanca-base/matriz-mudanca-base.module';
import { IntegracaoNumericaModule } from './calculo-numerico-computacional/integracao-numerica/integracao-numerica.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatrizMudancaBaseModule,
    IntegracaoNumericaModule,
    PaginaInicialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
