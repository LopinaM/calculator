export const MAXdisplay = 15;

const roundResult = (result: number) => {
  return parseFloat(result.toFixed(MAXdisplay - 5))
    .toString()
    .replace(".", ",");
};

export const evaluate = (
  operand1: string,
  operand2: string,
  operator: string | null
): string => {
  const num1 = parseFloat(operand1.replace(",", ".")) || 0;
  const num2 = parseFloat(operand2.replace(",", ".")) || 0;
  let result: number;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "÷":
      if (num2 === 0) {
        return "0";
      } else {
        result = num1 / num2;
      }
      break;
    default:
      return "0";
  }

  return roundResult(result);
};

export const isNumber = (value: string) => !isNaN(parseFloat(value));
export const isOperator = (value: string) =>
  ["+", "-", "x", "÷"].includes(value);
