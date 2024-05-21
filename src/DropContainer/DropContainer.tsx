import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import s from "./DropContainer.module.css";
import Display from "../components/CalculatorItem/Display";
import OperandButtons from "../components/CalculatorItem/OperandButtons";
import NumPud from "../components/CalculatorItem/NumPud";
import EqualButton from "../components/CalculatorItem/EqualButton";
import { RootState } from "../store/store";
import { getPlacedBlocks } from "../store/actions";
import Empty from "../components/Empty";

interface ItemProps {
  blockName: string;
  dragOrigin: "BlocksSection" | "BuildZoneSection";
}

const blockComponents = {
  Display: Display,
  OperandButtons: OperandButtons,
  NumPud: NumPud,
  EqualButton: EqualButton,
};

const DropContainer: React.FC = () => {
  const [highlightedElemIndex, setHighlightedElemIndex] = useState<number>();
  const highlightedElemIndexRef = useRef<number>();
  highlightedElemIndexRef.current = highlightedElemIndex;

  const dispatch = useDispatch();
  const highlightsRef = useRef<Array<HTMLDivElement>>([]);

  const placedBlocks = useSelector(
    (state: RootState) => state.calculator.placedBlocks
  );
  const placedBlocksRef = useRef<string[]>([]);
  placedBlocksRef.current = placedBlocks;

  const mode = useSelector((state: RootState) => state.calculator.mode);

  const handleDrop = ({ blockName, dragOrigin }: ItemProps) => {
    let position = highlightedElemIndexRef.current ?? 0;

    if (dragOrigin === "BuildZoneSection") {
      const blockPlace = placedBlocksRef.current.findIndex(
        (blockName_) => blockName_ === blockName
      );

      if (
        highlightedElemIndexRef.current &&
        highlightedElemIndexRef.current > blockPlace + 1
      ) {
        position -= 1;
      }
    }

    dispatch(getPlacedBlocks(blockName, dragOrigin, position));
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: (item: ItemProps) => {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover(item, monitor) {
      const mousePos = monitor.getClientOffset();
      highlightsRef.current = highlightsRef.current.filter((e) => e !== null);

      if (item.blockName === "Display") {
        setHighlightedElemIndex(0);
        return;
      }

      let closestHighlightIndex = highlightsRef.current.reduce(
        (closestHighlightIndex, highlight, highlightIndex) => {
          const distanceToMouse1 = Math.abs(
            highlight.getBoundingClientRect().top - mousePos!.y
          );
          const closestHighlight = highlightsRef.current[closestHighlightIndex];
          const distanceToMouse2 = Math.abs(
            closestHighlight.getBoundingClientRect().top - mousePos!.y
          );

          return distanceToMouse1 < distanceToMouse2
            ? highlightIndex
            : closestHighlightIndex;
        },
        0
      );

      if (
        placedBlocksRef.current.includes("Display") &&
        closestHighlightIndex === 0
      ) {
        closestHighlightIndex = 1;
      }

      if (item.dragOrigin === "BuildZoneSection") {
        const blockPlace = placedBlocksRef.current.findIndex(
          (blockName) => blockName === item.blockName
        );

        if (closestHighlightIndex === blockPlace + 1) {
          closestHighlightIndex -= 1;
        }
      }

      setHighlightedElemIndex(closestHighlightIndex);
    },
  }));

  const empty = mode === "constructor" ? <Empty /> : <></>;

  const buildZoneWrapperClass = s.build_zone_wrapper;
  const buildZoneRuntimeClass = mode === "runtime" ? s.build_zone_runtime : "";
  const buildZoneHighlightClass = isOver ? s.build_zone_highlight : "";

  return (
    <div
      className={
        buildZoneWrapperClass +
        " " +
        buildZoneRuntimeClass +
        " " +
        buildZoneHighlightClass
      }
      ref={drop}
    >
      {!placedBlocks.length ? (
        empty
      ) : (
        <div className={s.build_zone}>
          <Highlight
            shouldBeShown={isOver && highlightedElemIndex === 0}
            key="highlight-0"
            refCallback={(el: HTMLDivElement) => {
              if (el) highlightsRef.current[0] = el;
            }}
          />

          {placedBlocks.map((blockName, i) => {
            const Block =
              blockComponents[blockName as keyof typeof blockComponents];
            return (
              <React.Fragment key={blockName}>
                <Block
                  name={blockName}
                  section="BuildZoneSection"
                  canDrag={blockName !== "Display" && mode === "constructor"}
                  children={blockName}
                />
                <Highlight
                  shouldBeShown={isOver && highlightedElemIndex === i + 1}
                  key={"highlight-" + (i + 1)}
                  refCallback={(el: HTMLDivElement) => {
                    if (el) highlightsRef.current[i + 1] = el;
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropContainer;

interface HighlightProps {
  refCallback: (el: HTMLDivElement) => void;
  shouldBeShown: boolean;
}

const Highlight: React.FC<HighlightProps> = ({
  refCallback,
  shouldBeShown,
}) => {
  return (
    <div
      className={s.highlight + (shouldBeShown ? " " + s.active : "")}
      ref={refCallback}
    />
  );
};
