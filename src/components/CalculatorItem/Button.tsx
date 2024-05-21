import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculate } from "../../store/actions";
import { RootState } from "../../store/store";

const Button = ({ value }: { value: string }) => {
  const mode = useSelector((state: RootState) => state.calculator.mode);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (mode !== "constructor") {
      dispatch(calculate(value));
    }
  };

  return <button onClick={handleClick}>{value}</button>;
};

export default Button;
