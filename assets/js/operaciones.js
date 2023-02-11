const calculadora = {
    displayValue: '0',
    primerOperando: null,
    siguienteSegundoOperando: false,
    operador: null,
    borrar: null
  };
  
  function inputDigital(digital) {
    const { displayValue, siguienteSegundoOperando } = calculadora;
  
    if (siguienteSegundoOperando === true) {
      calculadora.displayValue = digital;
      calculadora.siguienteSegundoOperando = false;
    } else {
      calculadora.displayValue = displayValue === '0' ? digital : displayValue + digital;
    }
  }
  
  function inputDecimal(punto) {

    if (!calculadora.displayValue.includes(punto)) {      
      calculadora.displayValue += punto;
    }
  }
  
  function handleoperador(siguienteoperador) {
    const { primerOperando, displayValue, operador } = calculadora
    const inputValue = parseFloat(displayValue);
  
    if (operador && calculadora.siguienteSegundoOperando)  {
      calculadora.operador = siguienteoperador;
      return;
    }
  
    if (primerOperando == null) {
      calculadora.primerOperando = inputValue;
    } else if (operador) {
      const currentValue = primerOperando || 0;
      const result = realizarCalculo[operador](currentValue, inputValue);
  
      calculadora.displayValue = String(result);
      calculadora.primerOperando = result;
    }
  
    calculadora.siguienteSegundoOperando = true;
    calculadora.operador = siguienteoperador;
  }
  
  const realizarCalculo = {
    '/': (primerOperando, segundoOperadndo) => primerOperando / segundoOperadndo,
  
    '*': (primerOperando, segundoOperadndo) => primerOperando * segundoOperadndo,
  
    '+': (primerOperando, segundoOperadndo) => primerOperando + segundoOperadndo,
  
    '-': (primerOperando, segundoOperadndo) => primerOperando - segundoOperadndo,
  
    '=': (primerOperando, segundoOperadndo) => segundoOperadndo
  };
  
  function resetCalculadora() {
    calculadora.displayValue = '0';
    calculadora.primerOperando = null;
    calculadora.siguienteSegundoOperando = false;
    calculadora.operador = null;
  }

  function borrarCalculadora() {
    calculadora.displayValue = calculadora.displayValue.slice(0,-1);
  }

  
  function updateDisplay() {
    const display = document.querySelector('.calculadora-screen');
    display.value = calculadora.displayValue;
    console.log(display.value);
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculadora-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('operador')) {
      handleoperador(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('cero')) {
      resetCalculadora();
      updateDisplay();
      return;
    }   
    if (target.classList.contains('borrar')) {      
      borrarCalculadora();
      updateDisplay();
      return;
    } 
  
    inputDigital(target.value);
    updateDisplay();

});