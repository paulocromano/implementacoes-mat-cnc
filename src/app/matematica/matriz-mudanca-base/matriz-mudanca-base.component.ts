import { Component, OnInit } from '@angular/core';

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
  public resultanteMatriz_B = new Array();
  
  public matriz_C = new Array();
  public resultanteMatriz_C = new Array();

  constructor() { }

  ngOnInit(): void {
    this.resetarMatrizes(2);
  }

  public calcular() {
    console.log(this.matriz_B);
    console.log(this.matriz_C);

    this.combinacaoLinear(this.matriz_B, this.resultanteMatriz_B);
    console.log(this.resultanteMatriz_B);
  }

  /**
   * @description Método responsável pela Combinação Linear da Matriz
   * @param matriz : any
   * @param resultante : any
   */
  private combinacaoLinear(matriz: any, resultante: any): void {
    let tamanho = matriz.length;

    for (let j = 0; j < tamanho; j++) {
      for (let i = 0; i < tamanho; i++) {
        if (i !== j) {
          let auxiliar = matriz[i][j] / matriz[j][j];

          for (let k = 0; k <= tamanho; k++) {
            matriz[i][k] = matriz [i][k] - auxiliar * matriz[j][k];
          } 
        }
      }
    }

    for (let i = 0; i < tamanho; i++) {
      resultante[i] = matriz[i][tamanho + 1] / matriz[i][i];
    }
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
