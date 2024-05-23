import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DraggableItem, {
  DraggableItemProps,
} from "../../DraggableContainer/DraggableContainer";
import s from "./CalculatorItem.module.css";
import { calculateFontSize } from "../../utils/calcFS";

const Display = (props: DraggableItemProps) => {
  const result = useSelector((state: RootState) => state.calculator.result);

  return (
    <DraggableItem {...props}>
      <div className={s.display}>
        <span style={{ fontSize: `${calculateFontSize(result)}` }}>
          {result}
        </span>
      </div>
    </DraggableItem>
  );
};
export default Display;
