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

  constructor() { }

  ngOnInit(): void { }

  /**
   * @description Método responsável por realizar o cálculo da Integração Numérica
   */
  public calcular(): void {
    this.exibirResolucao = true;

    this.h = this.converterParaFloat((this.limiteSuperior - this.limiteInferior) / this.limiteSuperior);
    let x = this.calcularValoresDeX();

    this.existeDivisao();
    this.gerarFormulaResultado();
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
    for (; this.x[i - 1] !== this.limiteSuperior; i++) {
      this.x.push(this.converterParaFloat(this.x[i - 1] + this.h));
    }

    console.log(this.x);

    return this.x;
  }

  /**
   * @description Método responsável por verificar se existe divisão na função e efetuar os cálculos
   */
  private existeDivisao() {
    let operador = this.retornarOperadorFuncao();
    console.log('sinal: ', operador)

    if (this.verificarSeExisteOperador('/').length > 1) {
      console.log('Com divisao');
      this.efetuarCalculoComOperadorEncontrado(operador);
    }
    else {
      console.log('Sem divisao');
      this.efetuarCalculoComOperadorEncontrado(operador);
    }
  }

  /**
   * @description Método responsável por retornar o operador utilizado na função
   * @returns string - Operador
   */
  private retornarOperadorFuncao(): string {
    for (let index = 0; index < this.funcao.length; index++) {
      let caracterAtual = this.funcao.charAt(index);

      if (caracterAtual === '+' || caracterAtual === '-' || caracterAtual === '*') {
        return caracterAtual;
      }
    }
  } 

  /**
   * @description Método responsável efetuar o cálculo com base no operador
   * @param operador string
   */
  private efetuarCalculoComOperadorEncontrado(operador: string): void {
    let valores = this.verificarSeExisteOperador(operador);
    let tamanho = valores.length;
    let vetorExpoente: string[];
    let valorExpoente: number;

    if (valores.length > 1) {

      // ANTES DO OPERADOR
      if (valores[tamanho - 2] === 'x') { // Valores antes do sinal quando há uma variável sem constante
        this.efetuarCalculo(this.h.toString(), operador, valores[tamanho - 1]);
      }

      else if (valores[tamanho - 2].split('^').length > 1) { // Quando houver expoente na função
        this.calcularExpoenteAntesDoSinal(vetorExpoente, valorExpoente, valores, tamanho, operador);
      }

      else if (valores[tamanho - 2].split('sen').length > 1) {
        let valorAngulo = this.calcularAngulo('sen', valores[tamanho - 2].split('sen'));
        this.efetuarCalculo(valorAngulo, operador, valores[tamanho - 1]);
      }

      else if (valores[tamanho - 2].split('cos').length > 1) {
        let valorAngulo = this.calcularAngulo('cos', valores[tamanho - 2].split('cos'));
        this.efetuarCalculo(valorAngulo, operador, valores[tamanho - 1]);
      }

      else if (valores[tamanho - 2].length > 1) { // Valores antes do sinal quando há uma variável com constante
        let constante = parseFloat(valores[tamanho - 2].split('x')[0]);
        this.efetuarCalculo((constante * this.h).toString(), operador, valores[tamanho - 1]);
      }      

/* ================================================================================================================================ */

      // DEPOIS DO OPERADOR
      else if (valores[tamanho - 1] === 'x') { // Valores depois do sinal quando há uma variável sem constante
        this.efetuarCalculo(valores[tamanho - 2], operador, this.h.toString());
      }

      else if (valores[tamanho - 1].split('^').length > 1) { // Quando houver expoente na função
        this.calcularExpoenteDepoisDoSinal(vetorExpoente, valorExpoente, valores, tamanho, operador);
      }

      else if (valores[tamanho - 1].split('sen').length > 1) { // Quando houver houver ângulo e for SEN
        let valorAngulo = this.calcularAngulo('sen', valores[tamanho - 1].split('sen'));
        this.efetuarCalculo(valores[tamanho - 2], operador, valorAngulo);
      }

      else if (valores[tamanho - 1].split('cos').length > 1) { // Quando houver houver ângulo e for COS
        let valorAngulo = this.calcularAngulo('cos', valores[tamanho - 1].split('cos'));
        this.efetuarCalculo(valores[tamanho - 2], operador, valorAngulo);
      }

      else if (valores[tamanho - 1].length > 1) { // Valores depois do sinal quando há uma variável com constante
        let constante = parseFloat(valores[tamanho - 1].split('x')[0]);
        this.efetuarCalculo(valores[tamanho - 2], operador, (constante * this.h).toString());
      }

      else { // Quando não há variável e/ou sinal no numerador
        this.efetuarCalculo(valores[tamanho - 2], operador, valores[tamanho - 1]);
      }
    }

    /* ================================================================================================================================ */

    // QUANDO HOUVER APENAS UM VALOR A SER CALCULADO
    else if (valores.length === 1) { 
      vetorExpoente = valores[0].split('^');

      if (valores[tamanho - 1].split('sen').length > 1) { // Quando houver houver ângulo e for SEN
        this.resultado = parseFloat(this.calcularAngulo('sen', valores[tamanho - 1].split('sen')));
      }

      else if (valores[tamanho - 1].split('cos').length > 1) { // Quando houver houver ângulo e for COS
        this.resultado = parseFloat(this.calcularAngulo('cos', valores[tamanho - 1].split('cos')));
      }

      else if (vetorExpoente.length > 1) {
        if (vetorExpoente[0] === 'x') { // Quando não houver constante com variável com expoente
          this.resultado = this.h * parseFloat(vetorExpoente[1]);
          console.log('Numerador: ', this.resultado);
        }
        else { // Quando houver constante, variável e expoente
          valorExpoente = parseFloat(vetorExpoente[1]);
          let constante = parseFloat(vetorExpoente[0].split('x')[0]);

          this.resultado = constante * Math.pow(this.h, valorExpoente);
          console.log('valor com expoente: ', this.resultado);
        }
      }
      else if (vetorExpoente.length === 1 && vetorExpoente[0] === 'x') { // Quando não houver constante 
        this.resultado = this.h;
        console.log('x: ', this.resultado);
      }
      else { // Quando houver apenas a constante
        this.resultado = parseFloat(vetorExpoente[0]);
        console.log('const: ', this.resultado);
      }
    }

    console.log('Valores: ', valores);
    console.log('Tamanho: ', tamanho);
    console.log('Resultado: ', this.resultado);
  }

  /**
   * @description Método responsável por calcular o valor do ângulo em radianos
   * @param eixoAngulo string
   * @param valores string[]
   */
  private calcularAngulo(eixoAngulo: string, valores: string[]): string {
    let valor: number;
    let expressaoAngulo = valores[1];

    if (eixoAngulo === 'sen') {
      if (expressaoAngulo === 'x') {
        valor = Math.sin(this.h);
        console.log('valor sem const: ', valor);
      }
      else if (expressaoAngulo.split('x').length > 1) {
        let constante = parseFloat(expressaoAngulo.split('x')[0]);
        valor = Math.sin(constante * this.h);

        console.log('angulo com const: ', valor);
      }
    }

    else if (eixoAngulo === 'cos') {
      if (expressaoAngulo === 'x') {
        valor = Math.cos(this.h);
        console.log('valor sem const: ', valor);
      }
      else if (expressaoAngulo.split('x').length > 1) {
        let constante = parseFloat(expressaoAngulo.split('x')[0]);
        valor = Math.cos(constante * this.h);

        console.log('angulo com const: ', valor);
      }
    } 

    return valor.toFixed(2);
  }

  /**
   * Método responsável por efetuar o cálculo de valores com expoente antes do sinal
   * @param vetorExpoente string[]
   * @param valorExpoente number
   * @param valores string[]
   * @param tamanho number
   * @param operador string
   */
  private calcularExpoenteAntesDoSinal(vetorExpoente: string[], valorExpoente: number, valores: string[], tamanho: number, operador: string): void {
    vetorExpoente = valores[tamanho - 2].split('^');
    console.log('vetorExpoente: ', vetorExpoente);

    if (vetorExpoente[tamanho - 2] === 'x') { // Se não houver constante explicita
      valorExpoente = Math.pow(this.h, parseFloat(vetorExpoente[1]));
      console.log('valorExpoente: ', valorExpoente);

      this.efetuarCalculo(valorExpoente.toString(), operador, valores[tamanho - 1]);
    }
    else { // Se houver constante explícita
      let constanteExpoente = parseFloat(vetorExpoente[tamanho - 2].split('x')[0]);
      console.log('constanteExpoente: ', constanteExpoente)
      valorExpoente = Math.pow(this.h, parseFloat(vetorExpoente[1]));

      this.efetuarCalculo((constanteExpoente * valorExpoente).toString(), operador, valores[tamanho - 1]);
    }
  }

  /**
   * Método responsável por efetuar o cálculo de valores com expoente após do sinal
   * @param vetorExpoente string[]
   * @param valorExpoente number
   * @param valores string[]
   * @param tamanho number
   * @param operador string
   */
  private calcularExpoenteDepoisDoSinal(vetorExpoente: string[], valorExpoente: number, valores: string[], tamanho: number, operador: string): void {
    vetorExpoente = valores[tamanho - 1].split('^');
    console.log('vetorExpoente: ', vetorExpoente);
   
    if (vetorExpoente[tamanho - 2] === 'x') { // Se não houver constante explicita
      valorExpoente = Math.pow(this.h, parseFloat(vetorExpoente[1]));

      this.efetuarCalculo(valores[tamanho - 2], operador, valorExpoente.toString());
    }
    else { // Se houver constante explícita
      let constanteExpoente = parseFloat(vetorExpoente[tamanho - 2].split('x')[0]);
      console.log('constanteExpoente: ', constanteExpoente)
      valorExpoente = Math.pow(this.h, parseFloat(vetorExpoente[1]));

      this.efetuarCalculo(valores[tamanho - 2], operador, (constanteExpoente * valorExpoente).toString());
    }
  }

  /**
   * @description Método responsável por efetuar um cálculo com base no operador passado
   * @param valor string
   * @param operador string
   * @param valor2 string
   */
  private efetuarCalculo(valor: string, operador: string, valor2: string): void {
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
   * @param regex string
   * @returns string[]
   */
  private verificarSeExisteOperador(regex: string): string[] {
    return this.funcao.split(regex);
  }

  /**
   * @description Método responsável por fixar duas casas decimais e converter de volta pra number
   * @param valor number
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
    this.exibirResolucao = false;
    this.x = new Array<number>();
    this.formulaResultado = null;
    this.resultado = 0;
  } 
}
