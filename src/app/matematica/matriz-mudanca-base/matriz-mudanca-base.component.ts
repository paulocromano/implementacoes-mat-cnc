import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-matriz-mudanca-base',
  templateUrl: './matriz-mudanca-base.component.html',
  styleUrls: ['./matriz-mudanca-base.component.css']
})

/**
 * @author Paulo Romano
 * @description Classe responsável por calcular Mudanças de Bases de Matrizes
 */
export class MatrizMudancaBaseComponent implements OnInit {

  public indexAba: number;
  public matriz_B = new Array();
  public matriz_C = new Array();

  constructor() { }

  ngOnInit(): void {
    this.resetarMatrizes(2);
  }

  public calcular() {
    console.log(this.matriz_B);
    console.log(this.matriz_C);
  }

  /**
   * @description Método responsável por receber o índice da TabView
   * @param event : any - Evento da mudança de Aba da TabView
   */
  public checarAba(event: any): void {
    this.indexAba = event.index;

    if (this.indexAba === 0) {
      this.resetarMatrizes(2); 
    }
    else {
      this.resetarMatrizes(3);
    }
  }

  /**
   * @description Método responsável por resetar as Matrizes
   * @param tamanho : number - Tamanho da Matriz Quadrada
   */
  private resetarMatrizes(tamanho: number): void {
    this.matriz_B = new Array();
    this.matriz_C = new Array();

    this.resetarMatriz(this.matriz_B, tamanho);
    this.resetarMatriz(this.matriz_C, tamanho);
  }

  /**
   * Método responsável resetar uma Matriz
   * @param matriz : any
   * @param tamanho : number - Tamanho da Matriz Quadrada
   */
  private resetarMatriz(matriz: any, tamanho: number): void {
    
    for (let i = 0; i < tamanho; i++) {
      matriz[i] = new Array();

      for (let j = 0; j < tamanho; j++) {
        matriz[i][j] = 0;
      }
    }
  }
}
