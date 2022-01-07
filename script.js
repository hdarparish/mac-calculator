class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current =
      this.operation === "%" ? 1 : parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "%":
        computation = prev / 100;

        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
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

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const calculatorSection = document.getElementById("calculator");
const applicationSection = document.getElementById("applications");

const menuItems = document.querySelectorAll("[data-menu]");
const numberButtons = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const percentageButton = document.querySelector("[data-percentage]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const datetimeTextElement = document.querySelector("[data-date]");
const datetimeMobileTextElement = document.querySelector("[data-date-mobile]");
const calculatorIcon = document.querySelector("[data-calculator-image]");

const mobileSize = window.matchMedia("screen and (max-width: 560px)");
let calculatorAnimationEnd = false;

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

percentageButton.addEventListener("click", () => {
  calculator.chooseOperation(percentageButton.innerText);
  calculator.updateDisplay();
  calculator.compute();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

//check if the calculator icon animation has ended and display the calculator app
calculatorIcon.addEventListener("animationend", () => {
  calculatorAnimationEnd = true;
  calculatorSection.style.visibility = "visible";
  calculatorSection.style.animation = "1s ease-out waitForCalculator";

  mobileView();
});

const mobileView = () => {
  //check if the calculator icon has animation, to prevent triggering animation
  calculatorIcon.style.animation =
    calculatorSection.style.visibility === "visible"
      ? ""
      : "1s linear 1s 6 alternate popUp";

  //if it is mobile width, change the background and stop displaying the applications icons
  if (mobileSize.matches && calculatorAnimationEnd) {
    applicationSection.style.display = "none";
    document.querySelector("body").style.background = "#000";
  } else {
    //display the applications icons and calculator menu
    applicationSection.style.display = "flex";
    document.querySelector("body").style.background = "";
    menuItems.forEach((item) => {
      item.style.visibility = "visible";
    });
  }
};

//add even listener for mobile screen size
mobileSize.addEventListener("change", mobileView);

//on load check the screen size and update the date & time
const loadCalculator = () => {
  mobileView();
  updateDateTime();
};

//update the date and time every 60secons / 1min
setInterval(() => {
  updateDateTime();
}, 60000);

const updateDateTime = () => {
  const currentDate = new Date();
  const newDate = currentDate.toDateString().split(" ");
  newDate.pop();
  //update the element with date and time, remove the seconds
  datetimeTextElement.innerText = `${newDate.join(" ")} ${currentDate
    .toLocaleTimeString()
    .replace(/(.*)\D\d+/, "$1")}`;
  datetimeMobileTextElement.innerText = `${currentDate
    .toLocaleTimeString()
    .replace(/(.*)\D\d+/, "$1")}`;
};
