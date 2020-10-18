import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-integracao-numerica',
  templateUrl: './integracao-numerica.component.html',
  styleUrls: ['./integracao-numerica.component.css']
})

/**
 * @author Paulo Romano
 * @description Componente responsável por efetuar o Cálculo de Integração
 */
export class IntegracaoNumericaComponent implements OnInit {

  public limiteSuperior: number = 0;
  public limiteInferior: number = 0;

  public funcao: string;
  public h: number = 0;
  private x = new Array<number>();

  public resultado: number = 0;
  public formulaResultado: string;
  public exibirResolucao: boolean = false;
  public processoResultado: string;

  constructor() { }

  ngOnInit(): void { }

  /**
   * @description Método responsável por realizar o cálculo da Integração Numérica
   */
  public calcular(): void {
    this.exibirResolucao = true;

    this.h = this.converterParaFloat((this.limiteSuperior - this.limiteInferior) / this.limiteSuperior);
    let x = this.calcularValoresDeX();

    this.gerarFormulaResultado();
    this.efetuarCalculoComOperadorEncontrado('+', this.x[0]);
    this.calcularResultadoFinal(x);
  }

  /**
   * @description Método responsável por gerar a fórmula utilizada para a Integração Numérica
   */
  private gerarFormulaResultado(): void {
    this.formulaResultado = 'h/2 . [f(x0)';
    let i = 1;

    for (; i < this.x.length - 1; i++) {
      this.formulaResultado += ' + 2f(x' + i +')';
    }

    this.formulaResultado += ' + f(x' + i + ')]';
  }

  /**
   * @description Método responsável por calcular os valores de X
   * @returns number[] - Contendo os valores de X
   */
  private calcularValoresDeX(): number[] {
    this.x.push(this.limiteInferior, this.h + this.limiteInferior);

    let i = 2;
    for (; this.x[i - 1] < this.limiteSuperior; i++) {
      this.x.push(this.converterParaFloat(this.x[i - 1] + this.h));
    }

    console.log(this.x);

    return this.x;
  }

  /**
   * @description Método responsável por calcular o resultado final
   */
  private calcularResultadoFinal(x: number[]): void {

  }

  /**
   * @description Método responsável efetuar o cálculo com base no operador
   * @param operador string
   * @param valorAtual_X number
   */
  private efetuarCalculoComOperadorEncontrado(operador: string, valorAtual_X: number): void {
    let valores = this.verificarSeExisteOperador(operador);
    let tamanho = valores.length;
    let valoresAntesOperador = valores[tamanho - 2];
    let valoresDepoisOperador = valores[tamanho - 1];

    //Antes do Operador
    let resultadoParcialAntesOperador: number = this.resultadoParcial(valores, valoresAntesOperador, valorAtual_X);

    //Depois do Operador
    let resultadoParcialDepoisOperador: number = this.resultadoParcial(valores, valoresDepoisOperador, valorAtual_X);

    console.log(resultadoParcialAntesOperador);
    console.log(resultadoParcialDepoisOperador);
    
    this.resultado = this.efetuarCalculo(resultadoParcialAntesOperador, operador, resultadoParcialDepoisOperador);
    console.log('resultado: ', this.resultado);
  }

  /**
   * @description Método responsável por calcular o resultado parcial da função
   * @param valores string[]
   * @param valorParcial string
   * @param valorAtual_X string
   * @returns number - Valor parcial
   */
  private resultadoParcial(valores: string[], valorParcial: string, valorAtual_X: number): number {
    let resultadoParcial: number;
    
    if (valores.length > 1) {  
      let funcao: string[];
      let constante: number;
      let valorAntesExpoente: string;

      if (valorParcial === 'x') { //Quando houver apenas a variável
        resultadoParcial = valorAtual_X;
      }
      else if (this.verificarSeExisteOperador('^', valorParcial).length > 1) { //Quando houver expoente
        funcao = this.verificarSeExisteOperador('^', valorParcial);
        valorAntesExpoente = funcao[0];
          
        if (valorAntesExpoente === 'x') { //Quando houver apenas a variável com expoente
          resultadoParcial = this.calcularExpoente(valorAtual_X, funcao[1]);
        }
        else if (parseFloat(valorAntesExpoente.split('x')[0])) { //Quando houver constante e variável com expoente
          constante = parseFloat(valorAntesExpoente.split('x')[0]);
          resultadoParcial = this.calcularExpoente(valorAtual_X, funcao[1], constante);
        }
      }
      else if (this.verificarSeExisteOperador('sen', valorParcial).length > 1) {
        resultadoParcial = this.calcularAngulo('sen', valorParcial, valorAtual_X);
      }
      else if (valorParcial !== 'x') { //Quando houver apenas uma constante
        resultadoParcial = parseFloat(valorParcial);
      }
    }

    return this.converterParaFloat(resultadoParcial);
  }

  /**
   * @description Método responsável por calcular o Ângulo
   * @param eixoAngulo string
   * @param funcao string
   * @param valor_X number
   * @returns number - Valor do Ângulo
   */
  private calcularAngulo(eixoAngulo: string, funcao: string, valor_X: number): number {
    let resultado: number;
    let funcaoAngulo = funcao.split(eixoAngulo)[1];
    let constante: number = parseFloat(funcaoAngulo.split('x')[0]);

    if (eixoAngulo === 'sen') {
      if (funcaoAngulo === 'x') {
        resultado = Math.sin(valor_X);
      }
      else if (funcaoAngulo.length > 1) {
        resultado = Math.sin(constante * valor_X);
      }
      else {
        resultado = Math.sin(constante);
      }
    }

    else if (eixoAngulo === 'cos') {
      if (funcaoAngulo === 'x') {
        resultado = Math.cos(valor_X);
      }
      else if (funcaoAngulo.length > 1) {
        resultado = Math.cos(constante * valor_X);
      }
      else {
        resultado = Math.cos(constante);
      }
    }

    return this.converterParaFloat(resultado);
  }

  /**
   * @description Método responsável por calcular o expoente
   * @param valor_X number
   * @param expoente string
   * @param constante? number
   * @returns number
   */
  private calcularExpoente(valor_X: number, expoente: string, constante?: number): number {
    if (constante) {
      return constante * Math.pow(valor_X, parseFloat(expoente));
    }
    return Math.pow(valor_X, parseFloat(expoente));
  }

  /**
   * @description Método responsável por retornar o operador utilizado na função
   * @param funcao? string
   * @returns string - Operador
   */
  private retornarOperadorFuncao(funcao?: string): string {
    funcao = (funcao) ? funcao : this.funcao;

    for (let i = 0; i < funcao.length; i++) {
      let caracterAtual = funcao.charAt(i);

      if (caracterAtual === '+' || caracterAtual === '-' || caracterAtual === '*') {
        return caracterAtual;
      }
    }
  } 

  /**
   * @description Método responsável por efetuar um cálculo com base no operador passado
   * @param valor number
   * @param operador string
   * @param valor2 number
   * @returns number - Resultado da operação
   */
  private efetuarCalculo(valor: number, operador: string, valor2: number): number {
    switch(operador) {
      case '+': return valor + valor2;
      case '-': return valor - valor2;
      case '*': return valor * valor2;
      case '/': return valor / valor2;
      case '^': return Math.pow(valor, valor2);
    }
  }

  /**
   * @description Método responsável por verificar se existe operador
   * @param regex string
   * @param funcao? string
   * @returns string[]
   */
  private verificarSeExisteOperador(regex: string,funcao?: string): string[] {
    return (funcao) ? funcao.split(regex) : this.funcao.split(regex);
  }

  /**
   * @description Método responsável por fixar duas casas decimais e converter de volta pra number
   * @param valor number
   * @returns number - Valor convertido
   */
  private converterParaFloat(valor: number): number {
    return parseFloat(valor.toFixed(3));
  }

  /**
   * Resetar os valores da Integração
   */
  public resetarValores(): void {
    this.limiteSuperior = 0;
    this.limiteInferior = 0;
    this.funcao = null;
    this.h = null;
    this.exibirResolucao = false;
    this.x = new Array<number>();
    this.formulaResultado = null;
    this.resultado = 0;
  } 
}
