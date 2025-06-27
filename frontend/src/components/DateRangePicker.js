import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DateRangePicker = ({ setSelectedDates, asSingle = false }) => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    return (
        <Datepicker
            value={value}
            onChange={newValue => {
                setValue(newValue);
                setSelectedDates(newValue);
            }}
            showShortcuts={true}
            useRange={true}
            asSingle={asSingle}
            displayFormat={"YYYY-MM-DD"}
            primaryColor={"blue"}
            maxDate={new Date()}
        />
    );
};

export default DateRangePicker;