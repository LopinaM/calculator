import React from "react";
import Button from "./Button";
import DraggableItem, {
  DraggableItemProps,
} from "../../DraggableContainer/DraggableContainer";
import s from "./CalculatorItem.module.css";

const numButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","];

const NumPud = (props: DraggableItemProps) => {
  return (
    <DraggableItem {...props}>
      <div className={s.num_buttons}>
        {numButtons.map((value) => (
          <Button key={value} value={value} />
        ))}
      </div>
    </DraggableItem>
  );
};

export default NumPud;
