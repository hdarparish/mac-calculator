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

const loadCalculator = () => {
  updateDateTime();
  setTimeout(() => {
    calculatorSection.style.visibility = "visible";
    calculatorSection.style.animation = "1s ease-out wait2";
    menuItems.forEach((item) => {
      item.style.visibility = "visible";
    });
  }, 7000);
};

//update the date and time every 60secons/1min
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
};

/* const desktopWidth = window.matchMedia("(max-width: 1300px)");
const smallDesktopWidth = window.matchMedia("(max-width: 1070px)");
const tabletWidth = window.matchMedia("(max-width: 810px)");
const mobileWidth = window.matchMedia("(max-width: 560px)");

const pagesImage = document.querySelector("[data-pages-image]");
const numbersImage = document.querySelector("[data-numbers-image]");
const safariImage = document.querySelector("[data-safari-image]");
const xcodeImage = document.querySelector("[data-xcode-image]");
const musiclImage = document.querySelector("[data-music-image]");
const facetimeImage = document.querySelector("[data-facetime-image]");
const mailImage = document.querySelector("[data-mail-image]");
const photosImage = document.querySelector("[data-photos-image]");
const systemImage = document.querySelector("[data-system-image]");
const remindersImage = document.querySelector("[data-reminders-image]");

desktopWidth.addEventListener("change", (e) => {
  if (e.matches) {
    remindersImage.style.display = "none";
    pagesImage.style.display = "none";
    applicationSection.style.maxWidth = "1060px";
    //   console.log(document.querySelector("[data-reminders-image]"));
    //document.querySelector(".calculator-icon").style.display = "none"; 
  } else {
    document.querySelector(".calculator-icon").style.display = "";
    remindersImage.style.display = "";
    pagesImage.style.display = "";
    applicationSection.style.maxWidth = "";
  }
});

smallDesktopWidth.addEventListener("change", (e) => {
  if (e.matches) {
    numbersImage.style.display = "none";
    systemImage.style.display = "none";
    mailImage.style.display = "none";
    applicationSection.style.maxWidth = "815px";

  } else {
    document.querySelector(".calculator-icon").style.display = "";
    numbersImage.style.display = "";
    systemImage.style.display = "";
    mailImage.style.display = "";
    applicationSection.style.maxWidth = "";
  }
});

tabletWidth.addEventListener("change", (e) => {
  if (e.matches) {
    safariImage.style.display = "none";
    facetimeImage.style.display = "none";
    musiclImage.style.display = "none";
    applicationSection.style.maxWidth = "570px";

  } else {
    document.querySelector(".calculator-icon").style.display = "";
    safariImage.style.display = "";
    facetimeImage.style.display = "";
    musiclImage.style.display = "";
    applicationSection.style.maxWidth = "";
  }
});
mobileWidth.addEventListener("change", (e) => {
  if (e.matches) {
    photosImage.style.display = "none";
    xcodeImage.style.display = "none";
    applicationSection.style.maxWidth = "390px";
  } else {
    document.querySelector(".calculator-icon").style.display = "";
    photosImage.style.display = "";
    xcodeImage.style.display = "";
    applicationSection.style.maxWidth = "";
  }
});
 */
