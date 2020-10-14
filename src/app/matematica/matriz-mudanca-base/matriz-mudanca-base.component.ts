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

  public indexAba: number = 0;

  public matriz_X = new Array<number>();
  public resultanteMatriz_X = new Array<number>();

  public matriz_Y = new Array<number>();
  public resultanteMatriz_Y = new Array<number>();

  constructor() { }

  ngOnInit(): void {
    this.resetarMatrizes(2);
  }

  public calcular() {
    console.log('Matriz B: ', this.matriz_X);
    console.log('Matriz C: ', this.matriz_Y);

    if (this.indexAba === 0) {
      this.resultanteMatriz_X[0] = this.combinacaoLinear2x2(this.matriz_Y, this.matriz_X[0]);
      this.resultanteMatriz_X[1] = this.combinacaoLinear2x2(this.matriz_Y, this.matriz_X[1]);

      console.log('Resultante: ', this.resultanteMatriz_X);
    }
    else {
      //TODO
    }
  }

  /**
   * @description Método responsável pela Combinação Linear da Matriz 2x2
   * @param matriz : any
   * @param vetorIgualdade : any
   * @returns Array - any
   */
  private combinacaoLinear2x2(matriz: any, vetorIgualdade: any): any {
    let vetor_A = new Array(matriz[0][0], matriz[1][0], vetorIgualdade[0]);
    let vetor_B = new Array(matriz[0][1], matriz[1][1], vetorIgualdade[1]);

    let zerarIncognitaEquacao = - 1 * (vetor_B[0] / vetor_A[0]); 

    console.log(vetor_A);
    console.log(vetor_B);
    console.log(zerarIncognitaEquacao);

    let variavel_B = ((vetor_A[2] * zerarIncognitaEquacao) + vetor_B[2]) / ((vetor_A[1] * zerarIncognitaEquacao) + vetor_B[1]);
    let variavel_A = (vetor_A[2] - (vetor_A[1] * variavel_B)) / vetor_A[0];

    console.log('Variavel A: ', variavel_A);
    console.log('Variavel B: ', variavel_B);
    
    return new Array(variavel_A, variavel_B);
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
  public resetarMatrizes(tamanho: number): void {
    this.matriz_X = new Array();
    this.matriz_Y = new Array();

    this.resetarMatriz(this.matriz_X, tamanho);
    this.resetarMatriz(this.matriz_Y, tamanho);
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
