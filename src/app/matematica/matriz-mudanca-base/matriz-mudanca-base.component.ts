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
  public calculoEfetuado: boolean = false;

  public matriz_X = new Array<number>();
  public resultanteMatriz_X = new Array<number>();

  public matriz_Y = new Array<number>();
  public resultanteMatriz_Y = new Array<number>();

  public v = new Array<number>(3);

  public verificacao: any[];
  public ordemMatriz: number;
  public matrizOrdenada: any[];

  constructor() { }

  ngOnInit(): void {
    this.ordemMatriz = 2;
    this.resetarValores();
  }

  /**
   * @description Método responsável por efetuar a Mudança de Base
   */
  public calcular(): void {
    this.resultanteMatriz_X = this.combinacaoLinear(this.matriz_Y, this.matriz_X);
    this.resultanteMatriz_Y = this.combinacaoLinear(this.matriz_X, this.matriz_Y);
    this.verificacaoMudancaDeBase();
    console.log('verificacao: ', this.verificacao);
    
    this.calculoEfetuado = true;
  }

  /**
   * @description Método responsável por gerar a Matriz Resultante da Combinação Linear
   * @param matriz number[]
   * @param vetorCombinacao number[] 
   * @returns number[] - Matriz com a resultante da Combinação Linear
   */
  private combinacaoLinear(matriz: number[], vetorCombinacao: number[]): number[] {
    let matrizResultante = new Array();

    for (let i = 0; i < this.ordemMatriz; i++) {
      this.reordenarMatriz(matriz, vetorCombinacao[i]);
      matrizResultante[i] = this.metodoGuassJordan(this.ordemMatriz);
    }

    return this.transformarLinhasEmColunasMatriz(matrizResultante);
  }

  /**
   * @description Método responsável pela reordenação da Matriz
   * @param matriz number[]
   * @param vetorCombinacao number 
   */
  private reordenarMatriz(matriz: number[], vetorCombinacao: number): void {
    this.matrizOrdenada = new Array<number>();

    for (let i = 0; i < this.ordemMatriz; i++) {
      this.matrizOrdenada[i] = new Array<number>();
      
      for (let j = 0; j < this.ordemMatriz; j++) {
        this.matrizOrdenada[i][j] = new Array<number>();
        this.matrizOrdenada[i][j] = matriz[j][i];
      }
    }

    for (let i = 0; i < this.ordemMatriz; i++) {
      this.matrizOrdenada[i][this.ordemMatriz] = vetorCombinacao[i]; 
    }
  }

  /**
   * @description Método responsável por efetuar a Combinação Linear através do Método de Guass Jordan
   * @param ordemMatriz number
   */
  private metodoGuassJordan(ordemMatriz: number): number[] {
    let vetorResultante = new Array<number>();
    let matrizAuxiliar = new Array(new Array());
    let auxiliar: number;
    let cloneMatriz = this.matrizOrdenada.slice();

    if (cloneMatriz[0][0] === 0) {
      matrizAuxiliar[[ordemMatriz + 1][ordemMatriz + 1]];

      for (let i = 0; i < ordemMatriz; i++) {
        if (cloneMatriz[i][0] !== 0) {
          for (let j = 0; j < ordemMatriz + 1; j++) {
            matrizAuxiliar[0][j] = cloneMatriz[i][j];
            cloneMatriz[0][j] = matrizAuxiliar[0][j];
          }
        }
        else {
          for (let j = 0; j < ordemMatriz + 1; j++) {
            matrizAuxiliar[i + 1][j] = cloneMatriz[i][j];   
          }
        }
      }
      cloneMatriz = matrizAuxiliar;
    }

    for (let j = 0; j < ordemMatriz; j++) {
      for (let i = 0; i < ordemMatriz; i++) {
        if (i !== j) {
          auxiliar = cloneMatriz[i][j] / cloneMatriz[j][j];

          for (let k = 0; k < ordemMatriz + 1; k++) {
            cloneMatriz[i][k] = cloneMatriz[i][k] - (auxiliar * cloneMatriz[j][k]);
          }
        }
      }
    }

    for (let i = 0; i < ordemMatriz; i++) {
      vetorResultante[i] = this.converterParaFloat(cloneMatriz[i][ordemMatriz] / cloneMatriz[i][i]);
    }

    return vetorResultante;
  }

  /**
   * @description Método responsável por transformar Linhas em Colunas da Matriz
   * @param matriz number[]
   * @returns number[] - Matriz transformada
   */
  private transformarLinhasEmColunasMatriz(matriz: number[]): number[] {
    let matrizClone = new Array();

    for (let j = 0; j < this.ordemMatriz; j++) {
      matrizClone[j] = new Array();

      for (let i = 0; i < this.ordemMatriz; i++) {
        matrizClone[j][i] = matriz[i][j];
      }
    }

    return matrizClone;
  }

  /**
   * @description Método responsável por fazer a verificação da Mudança de Base
   */
  private verificacaoMudancaDeBase(): void {
    for (let i = 0; i < this.ordemMatriz; i++) {
      for (let j = 0; j < this.ordemMatriz; j++) {
        this.verificacao[i][j] = 0;

        for (let k = 0; k < this.ordemMatriz; k++) {
          this.verificacao[i][j] += this.resultanteMatriz_X[i][k] * this.resultanteMatriz_Y[k][j];
        }       
      }
    }
  }

  /**
   * @description Método responsável por fixar duas casas decimais e converter de volta pra number
   * @param valor  number
   * @returns number - Valor convertido
   */
  private converterParaFloat(valor: number): number {
    return parseFloat(valor.toFixed(3));
  }

  /**
   * @description Método responsável por receber o índice da TabView
   * @param event  any - Evento da mudança de Aba da TabView
   */
  public checarAba(event: any): void {
    this.indexAba = event.index;

    if (this.indexAba === 0) {
      this.ordemMatriz = 2;
      this.resetarValores(); 
    }
    else {
      this.ordemMatriz = 3;
      this.resetarValores();
    }
  }

  /**
   * @description Método responsável por resetar os Valores
   */
  public resetarValores(): void {
    this.matriz_X = new Array();
    this.resultanteMatriz_X = new Array();

    this.matriz_Y = new Array();
    this.resultanteMatriz_Y = new Array();

    this.verificacao = new Array<number>();
    this.v = new Array<number>();

    this.resetarMatriz(this.matriz_X);
    this.resetarMatriz(this.matriz_Y);

    this.calculoEfetuado = false;
  }

  /**
   * Método responsável resetar uma Matriz
   * @param matriz any
   */
  private resetarMatriz(matriz: any): void {
    for (let i = 0; i < this.ordemMatriz; i++) {
      matriz[i] = new Array();
      this.verificacao[i] = new Array();
      this.v[i] = 0;

      for (let j = 0; j < this.ordemMatriz; j++) {
        matriz[i][j] = 0;
        this.verificacao[i][j] = 0
      }
    }
  }
}
