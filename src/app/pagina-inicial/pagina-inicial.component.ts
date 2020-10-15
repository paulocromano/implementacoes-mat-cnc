import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})

export class PaginaInicialComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public redirecionarRota(rota: string): void {
    this.router.navigate([rota]);
  }
}
