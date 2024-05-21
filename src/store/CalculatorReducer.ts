import { CALCULATE, PLACE_BLOCK, REMOVE_BLOCK, SET_MODE } from "./actions";
import { MAXdisplay, evaluate, isNumber, isOperator } from "../utils";

interface CalculatorState {
  blocks: Array<{ name: string }>;
  placedBlocks: string[];
  result: string;
  operand1: string;
  operand2: string;
  operator: string | null;
  mode: string;
}

const initialState: CalculatorState = {
  blocks: [
    {
      name: "Display",
    },
    {
      name: "OperandButtons",
    },
    {
      name: "NumPud",
    },
    {
      name: "EqualButton",
    },
  ],
  placedBlocks: [],
  result: "0",
  operand1: "",
  operand2: "",
  operator: null,
  mode: "constructor",
};

const calculatorReducer = (
  state = initialState,
  action: any
): CalculatorState => {
  switch (action.type) {
    case CALCULATE:
      return handleCalculation(state, action.payload);
    case SET_MODE:
      if (action.payload === "constructor") return initialState;
      return { ...state, mode: action.payload };
    case PLACE_BLOCK:
      if (action.payload.dragOrigin === "BlocksSection") {
        if (state.placedBlocks.includes(action.payload.blockName)) {
          return state;
        }
        return {
          ...state,
          placedBlocks: [
            ...state.placedBlocks.slice(0, action.payload.position),
            action.payload.blockName,
            ...state.placedBlocks.slice(action.payload.position),
          ],
        };
      } else if (action.payload.dragOrigin === "BuildZoneSection") {
        const index = state.placedBlocks.indexOf(action.payload.blockName);
        const blockToMove = state.placedBlocks[index];

        const updatedPlacedBlocks = [
          ...state.placedBlocks.slice(0, index),
          ...state.placedBlocks.slice(index + 1),
        ];

        return {
          ...state,
          placedBlocks: [
            ...updatedPlacedBlocks.slice(0, action.payload.position),
            blockToMove,
            ...updatedPlacedBlocks.slice(action.payload.position),
          ],
        };
      }
      return state;

    case REMOVE_BLOCK:
      return {
        ...state,
        placedBlocks: state.placedBlocks.filter(
          (blockName) => blockName !== action.payload
        ),
      };

    default:
      return state;
  }
};

const handleCalculation = (
  state: CalculatorState,
  value: string
): CalculatorState => {
  if (isNumber(value) || value === ",") {
    if (
      (state.operand1.length >= MAXdisplay && state.operator === null) ||
      (state.operand2.length >= MAXdisplay && state.operator)
    ) {
      return state;
    } else {
      if (value === "," && state.operator === null && state.operand1 === "") {
        return {
          ...state,
          operand1: "0,",
          result: "0,",
        };
      } else if (
        value === "," &&
        state.operator !== null &&
        state.operand2 === ""
      ) {
        return {
          ...state,
          operand2: "0,",
          result: "0,",
        };
      } else if (
        value === "," &&
        state.operand1.includes(",") &&
        state.operator === null
      ) {
        return state;
      } else if (
        value === "," &&
        state.operand2.includes(",") &&
        state.operator !== null
      ) {
        return state;
      } else {
        if (state.operator === null) {
          return {
            ...state,
            operand1: state.operand1 + value,
            result: state.operand1 + value,
          };
        } else {
          return {
            ...state,
            operand2: state.operand2 + value,
            result: state.operand2 + value,
          };
        }
      }
    }
  } else if (isOperator(value)) {
    if (state.operand1 && state.operand2 && state.operator) {
      const result = evaluate(state.operand1, state.operand2, state.operator);
      return {
        ...state,
        operand1: result,
        operand2: "",
        operator: value,
        result: result,
      };
    } else {
      return {
        ...state,
        operator: value,
        result: state.operand1,
      };
    }
  } else if (value === "=") {
    if (state.operand1 && state.operator) {
      const result = evaluate(state.operand1, state.operand2, state.operator);
      return {
        ...state,
        result,
        operand1: result,
        operand2: "",
        operator: null,
      };
    } else {
      return state;
    }
  }
  return state;
};

export default calculatorReducer;
