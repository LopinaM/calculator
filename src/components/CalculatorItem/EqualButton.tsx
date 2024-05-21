import React from "react";
import Button from "./Button";
import DraggableItem, {
  DraggableItemProps,
} from "../../DraggableContainer/DraggableContainer";
import s from "./CalculatorItem.module.css";

const EqualButton = (props: DraggableItemProps) => {
  return (
    <DraggableItem {...props}>
      <div className={s.equalButton}>
        <Button value={"="} />
      </div>
    </DraggableItem>
  );
};

export default EqualButton;
