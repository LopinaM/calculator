import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDrag } from "react-dnd";
import { remove } from "../store/actions";
import s from "./DraggableContainer.module.css";

export interface DraggableItemProps {
  name: string;
  section: "BuildZoneSection" | "BlocksSection";
  canDrag?: boolean;
  children: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  name,
  section,
  canDrag = true,
  children,
}) => {
  const dispatch = useDispatch();
  const canDragRef = useRef(canDrag);
  canDragRef.current = canDrag;

  const mode = useSelector((state: RootState) => state.calculator.mode);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  const [, drag] = useDrag(() => ({
    type: "block",
    item: { blockName: name, dragOrigin: section },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => {
      return canDragRef.current;
    },
  }));

  const disabledClass =
    !canDrag && section !== "BuildZoneSection" ? " " + s.disabled : "";
  const dClass = canDrag ? " " + s.dcursor : "";
  const disabledCursor =
    !canDrag && mode !== "runtime" ? " " + s.disabled_cursor : " ";
  const shadowCursor =
    !canDrag && mode === "runtime" ? " " + s.disabled_box_shadow : "";

  return (
    <div
      onDoubleClick={() => {
        if (
          section === "BuildZoneSection" &&
          modeRef.current === "constructor"
        ) {
          dispatch(remove(name));
        }
      }}
      ref={drag}
      className={
        s.calc_block + dClass + disabledClass + disabledCursor + shadowCursor
      }
    >
      {children}
    </div>
  );
};

export default DraggableItem;
