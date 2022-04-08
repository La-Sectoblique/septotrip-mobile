import React, { Dispatch, SetStateAction, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

import { dropdownItem } from '../../models/DropdownItem';


interface DropdownProps {
    currentValue: string
    setCurrentValue: Dispatch<SetStateAction<string>>
    items: dropdownItem[]
}
export const Dropdown = (props: DropdownProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <DropDownPicker
        open={open}
        value={props.currentValue}
        items={props.items}
        setOpen={setOpen}
        setValue={props.setCurrentValue}
      />
    );
};
