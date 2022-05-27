/*
Funcionalidade calculadora
(Beba água, levante, alongue-se, vá dar uma volta, não se force camarada ;D )
*/
const numberButtons = document.querySelectorAll("[data-number]");

const opButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-all-clear]");
const previousOpText = document.querySelector("[data-previous-op]");
const currentOpText = document.querySelector("[data-current-op]");

class Calculadora {
  constructor(previousOpText, currentOpText) {
    this.previousOpText = previousOpText;
    this.currentOpText = currentOpText;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  appendNumber(number) {
    if (number === ",") {
      if (this.currentOp.includes(".")) return;
      this.currentOp = `${this.currentOp}.`;
    } else {
      this.currentOp = `${this.currentOp}${number.toString()}`;
    }
  }

  chooseOp(operation) {
    if (this.currentOp === "") return;
    if (this.previousOp !== "") {
      this.calculate();
    }
    this.operation = operation;

    this.previousOp = this.currentOp;
    this.currentOp = "";
  }

  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  clear() {
    this.previousOp = "";
    this.currentOp = "";
    this.operation = undefined;
  }

  calculate() {
    let result;

    const _previousOp = parseFloat(this.previousOp);
    const _currentOp = parseFloat(this.currentOp);

    if (isNaN(_previousOp) || isNaN(_currentOp)) return;

    switch (this.operation) {
      case "+":
        result = _previousOp + _currentOp;
        break;
      case "-":
        result = _previousOp - _currentOp;
        break;
      case "÷":
        result = _previousOp / _currentOp;
        break;
      case "*":
        result = _previousOp * _currentOp;
        break;
      default:
        return;
    }

    this.currentOp = result;
    this.operation = undefined;
    this.previousOp = "";
  }

  updateDipslay() {
    this.previousOpText.innerText = `${this.formatDisplayNumber(
      this.previousOp
    )} ${this.operation || ""}`;
    this.currentOpText.innerText = this.formatDisplayNumber(this.currentOp);
  }
}

const calc = new Calculadora(previousOpText, currentOpText);

for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calc.appendNumber(numberButton.innerText);
    calc.updateDipslay();
  });
}

for (let opButton of opButtons) {
  opButton.addEventListener("click", () => {
    calc.chooseOp(opButton.innerText);
    calc.updateDipslay();
  });
}

equalsButton.addEventListener("click", () => {
  calc.calculate();
  calc.updateDipslay();
});

deleteButton.addEventListener("click", () => {
  calc.delete();
  calc.updateDipslay();
});

clearAllButton.addEventListener("click", () => {
  calc.clear();
  calc.updateDipslay();
});
