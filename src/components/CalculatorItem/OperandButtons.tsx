import React from "react";
import Button from "./Button";
import DraggableItem, {
  DraggableItemProps,
} from "../../DraggableContainer/DraggableContainer";
import s from "./CalculatorItem.module.css";

const operandButtons = ["÷", "x", "-", "+"];

const OperandButtons = (props: DraggableItemProps) => {
  return (
    <DraggableItem {...props}>
      <div className={s.operand_buttons}>
        {operandButtons.map((value) => (
          <Button key={value} value={value} />
        ))}
      </div>
    </DraggableItem>
  );
};
export default OperandButtons;
