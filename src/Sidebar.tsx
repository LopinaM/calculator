import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Display from "./components/CalculatorItem/Display";
import OperandButtons from "./components/CalculatorItem/OperandButtons";
import NumPud from "./components/CalculatorItem/NumPud";
import EqualButton from "./components/CalculatorItem/EqualButton";

const Sidebar = () => {
  const placedBlocks = useSelector(
    (state: RootState) => state.calculator.placedBlocks
  );

  return (
    <div className="calculator">
      <Display
        name="Display"
        section="BlocksSection"
        canDrag={!placedBlocks.includes("Display")}
        children={null}
      />
      <OperandButtons
        name="OperandButtons"
        section="BlocksSection"
        canDrag={!placedBlocks.includes("OperandButtons")}
        children={null}
      />
      <NumPud
        name="NumPud"
        section="BlocksSection"
        canDrag={!placedBlocks.includes("NumPud")}
        children={null}
      />
      <EqualButton
        name="EqualButton"
        section="BlocksSection"
        canDrag={!placedBlocks.includes("EqualButton")}
        children={null}
      />
    </div>
  );
};
export default Sidebar;
