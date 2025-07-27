let number1;
let number2;
let operator;
let reset = true;

const buttons = document.querySelector(`.calculator`);
const digits = document.querySelector(`.digits`);

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {

  return a / b;
}

function operate(operator, a, b) {
  let result;
  switch (operator) {
    case `+`:
      result = add(a, b);
      break;
    case `-`:
      result = subtract(a, b);
      break;
    case `*`:
      result = multiply(a, b);
      break;
    case `/`:
      if (b === 0) return 'Error';
      result = divide(a, b);
      break;
  }

  return result;
}

function assignNumbers(operatorClicked) {
  if (number1 !== undefined && operator !== undefined) {
    number2 = Number(digits.textContent);
    digits.textContent = operate(operator, number1, number2);
    operator = operatorClicked;
    reset = true;
    number2 = undefined;
    number1 = Number(digits.textContent);
  } else {
    number1 = Number(digits.textContent);
    operator = operatorClicked;
    reset = true;
  }
}

function removeCharacter() {
  if (digits.textContent.length === 1) {
    digits.textContent = `0`;
    reset = true;
    return;
  }
  let str = digits.textContent;
  let arr = str.split(``);
  arr.pop();
  str = arr.join(``);
  digits.textContent = str;
}

function resetEverything() {
  number1 = undefined;
  number2 = undefined;
  operator = undefined;
  reset = true;
}

buttons.addEventListener(`click`, populateDisplay);

function populateDisplay(event) {
  const target = event.target.closest(`.button`)
  if (!target) return;
  let button = target.textContent;
  switch (button) {
    case `C`:
      digits.textContent = `0`;
      resetEverything();
      break;
    case `⌫`:
      removeCharacter();
      break;
    case `+`:
    case `-`:
    case `*`:
    case `/`:
      assignNumbers(button);
      break;
    case `=`:
      if (number1 !== undefined && operator !== undefined) {
        number2 = Number(digits.textContent);
        digits.textContent = operate(operator, number1, number2);
        resetEverything();
        break;
      } else {
        break;
      }
    case `.`:
      if (!digits.textContent.includes(`.`)) {
        digits.textContent += button;
        break;
      } else {
        break;
      }
    default:
      if (digits.textContent.length < 9) {
        if (reset) {
          reset = false;
          digits.textContent = ``;
          digits.textContent += button;
        } else {
          digits.textContent += button;
        }
      }
      break;
  }
}


