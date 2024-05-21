export const CALCULATE = "CALCULATE";
export const SET_MODE = "SET_MODE";
export const PLACE_BLOCK = "PLACE_BLOCK";
export const REMOVE_BLOCK = "REMOVE_BLOCK";

export const calculate = (value: string) => ({
  type: CALCULATE,
  payload: value,
});

export const setMode = (mode: "constructor" | "runtime") => ({
  type: SET_MODE,
  payload: mode,
});

export const getPlacedBlocks = (
  blockName: string,
  dragOrigin: "BlocksSection" | "BuildZoneSection",
  position: number
) => ({
  type: PLACE_BLOCK,
  payload: { blockName, dragOrigin, position },
});

export const remove = (blockName: string) => ({
  type: REMOVE_BLOCK,
  payload: blockName,
});
