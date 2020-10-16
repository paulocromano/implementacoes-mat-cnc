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

  public resultado: number = 0;

  constructor() { }

  ngOnInit(): void { }

  public calcular(): void {
    this.h = this.converterParaFloat((this.limiteSuperior - this.limiteInferior) / this.limiteSuperior);
    let x = this.calcularValoresDeX();

    this.existeDivisao();

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

  private existeDivisao() {
    if (this.verificarSeExisteOperador('/').length > 1) {
      console.log('Com divisao');
      this.efetuarCalculoComOperadorEncontrado('+');
    }
    else {
      console.log('Sem divisao');
      this.efetuarCalculoComOperadorEncontrado('+');/*
      this.efetuarCalculoComOperadorEncontrado('-');
      this.efetuarCalculoComOperadorEncontrado('*');
      this.efetuarCalculoComOperadorEncontrado('^');*/
    }
  }

//FAZER VÁRIOS INPUTS SEPARADOS PELO OPERADOR
  private efetuarCalculoComOperadorEncontrado(operador: string) {
    let valores = this.verificarSeExisteOperador(operador);
    let tamanho = valores.length;

    if (valores.length > 1) {

      // Valores antes do sinal quando há uma variável sem constante
      if (valores[tamanho - 2] === 'x') {
        this.efetuarCalculo(this.h.toString(), operador, valores[tamanho - 1]);
      }
      // Valores antes do sinal quando há uma variável com constante
      else if (valores[tamanho - 2].length > 1) {
        let constante = parseFloat(valores[tamanho - 2].split('x')[0]);
        this.efetuarCalculo((constante * this.h).toString(), operador, valores[tamanho - 1]);
      }

      // Valores depois do sinal quando há uma variável sem constante
      else if (valores[tamanho - 1] === 'x') {
        this.efetuarCalculo(valores[tamanho - 2], operador, this.h.toString());
      }
      else if (valores[tamanho - 1].split('^').length > 1) {
        let v = valores[tamanho - 1].split('^');
        let valorExpoente: number;
        console.log('v: ', v);

        if (v[tamanho - 2] === 'x') {
          valorExpoente = Math.pow(this.h, parseFloat(v[1]));
          this.efetuarCalculo(valores[tamanho - 2], operador, valorExpoente.toString());
        }
        else {

        }
      }
      // Valores depois do sinal quando há uma variável com constante
      else if (valores[tamanho - 1].length > 1) {
        let constante = parseFloat(valores[tamanho - 1].split('x')[0]);
        this.efetuarCalculo(valores[tamanho - 2], operador, (constante * this.h).toString());
      }

      // Quando não há variável no cálculo
      else {
        this.efetuarCalculo(valores[tamanho - 2], operador, valores[tamanho - 1]);
      }
    }

    console.log('Valores: ', valores);
    console.log('Tamanho: ', tamanho);
    console.log('Resultado: ', this.resultado);
  }

  private efetuarCalculo(valor: string, operador: string, valor2: string) {
    let value = parseFloat(valor);
    let value2 = parseFloat(valor2);

    switch(operador) {
      case '+': this.resultado = value + value2; break;
      case '-': this.resultado = value - value2; break;
      case '*': this.resultado = value * value2; break;
      case '^': this.resultado = Math.pow(value, value2); break;
    }
  }

  /**
   * @description Método responsável por verificar se existe operador
   * @param regex : string
   * @returns string[]
   */
  private verificarSeExisteOperador(regex: string): string[] {
    return this.funcao.split(regex);
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
