import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Sidebar from "./Sidebar";
import DropContainer from "./DropContainer/DropContainer";
import OptionButton from "./components/OptionButton/OptionButton";

const App = () => {
  const mode = useSelector((state: RootState) => state.calculator.mode);

  return (
    <div className="app_wrapper">
      <div className="app_header grid_center">
        <OptionButton />
      </div>
      <div className="app_sidebar grid_center">
        {mode === "constructor" ? <Sidebar /> : <></>}
      </div>
      <div className="app_dropContainer grid_center">
        <DropContainer />
      </div>
    </div>
  );
};

export default App;
