import React, { Dispatch, SetStateAction, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { dropdownItem } from "../../models/DropdownItem";

interface DropdownProps {
  currentValue: string;
  setCurrentValue: Dispatch<SetStateAction<string>>;
  items: dropdownItem[];
  map?: boolean
}
export const Dropdown = ({currentValue, setCurrentValue, items, map}: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropDownPicker
      open={open}
      value={currentValue}
      items={items}
      setOpen={setOpen}
      setValue={setCurrentValue}
      style={{width: map ? "50%" : "100%", position: map ? "absolute" : "relative", margin: 5,}}
    />
  );
};
