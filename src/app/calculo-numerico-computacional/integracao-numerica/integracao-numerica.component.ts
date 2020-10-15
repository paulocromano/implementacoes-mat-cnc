import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integracao-numerica',
  templateUrl: './integracao-numerica.component.html',
  styleUrls: ['./integracao-numerica.component.css']
})

export class IntegracaoNumericaComponent implements OnInit {

  public limiteSuperior: number = 0;
  public limiteInferior: number = 0;

  public funcao: string;
  public h: number;

  constructor() { }

  ngOnInit(): void { }

  public calcular(): void {
    this.h = this.converterParaFloat((this.limiteSuperior - this.limiteInferior) / this.limiteSuperior);
    let x = this.calcularValoresDeX();

    //this.verificarSeExisteDivisao();

  }

  /**
   * @description Método responsável por calcular os valores de X
   * @returns number[] - Contendo os valores de X
   */
  private calcularValoresDeX(): number[] {
    let x = new Array<number>();

    x.push(this.limiteInferior, this.h + this.limiteInferior);

    let i = 2;
    for (; x[i - 1] !== this.limiteSuperior; i++) {
      x.push(this.converterParaFloat(x[i - 1] + this.h));
    }

    console.log(x);

    return x;
  }

  /**
   * @description Método responsável por verificar se existe divisão
   * @returns string[]
   */
  private verificarSeExisteDivisao(): string[] {
    return this.funcao.split("/");
  }

  /**
   * @description Método responsável por fixar duas casas decimais e converter de volta pra number
   * @param valor : number
   * @returns number - Valor convertido
   */
  private converterParaFloat(valor: number): number {
    return parseFloat(valor.toFixed(2));
  }

  /**
   * Resetar os valores da Integração
   */
  public resetarValores(): void {
    this.limiteSuperior = 0;
    this.limiteInferior = 0;
    this.funcao = null;
    this.h = null;
  } 
}
