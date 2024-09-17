import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

const DatePicker = ({ label, selectedDate }) => {
  const options = {
    title: "Demo Title",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: "absolute top-full left-0  z-10",
    defaultDate: new Date("2022-01-01"),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  };

  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <span className="text-gray-600 font-sans font-semibold capitalize leading-5 pb-3 smallTablet:pb-0 ">
          {label}
        </span>
      </div>

      <div className="">
        <Datepicker
          options={options}
          onChange={handleChange}
          show={show}
          setShow={handleClose}
          value={selectedDate}
        />
      </div>
    </div>
  );
};

export default DatePicker;
