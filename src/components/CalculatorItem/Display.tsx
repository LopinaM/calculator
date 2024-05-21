import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DraggableItem, {
  DraggableItemProps,
} from "../../DraggableContainer/DraggableContainer";
import s from "./CalculatorItem.module.css";

const Display = (props: DraggableItemProps) => {
  const result = useSelector((state: RootState) => state.calculator.result);

  return (
    <DraggableItem {...props}>
      <div className={s.display}>
        <span>{result}</span>
      </div>
    </DraggableItem>
  );
};
export default Display;
