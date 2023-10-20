import React from 'react';
import { useEffect, useRef, useState } from "react";
import MonthRangePicker from "./monthRangePicker";
import monthPickStyle from "./monthPickParent.module.css";

const MonthPickParent = ({ getDateRangeState, applyFunc, cancelFunc,containerWidth }) => {
  const [open, setOpen] = useState(false);
  const [focusState, setFocusState] = useState(false);
  const parentRef = useRef(null);
  const [startMonth, setStartMonth] = useState({
    selectedFirstMonth: null,
    selectedFirstYear: null,
  });
  const [endMonth, setEndMonth] = useState({
    selectedLastMonth: null,
    selectedLastYear: null,
  });

  const togglePicker = () => {
    setOpen((prev) => !prev);
    setFocusState((prev) => !prev);
  };

  function digitToMonth(monthDigit) {
    const date = new Date(2000, monthDigit, 1);
    const monthName = date.toLocaleString("en-US", { month: "long" });
    return monthName;
  }

  useEffect(() => {
    if(!getDateRangeState)
    {
        return;
    }
    if (startMonth && startMonth.selectedFirstMonth !== null) {
      getDateRangeState(
        `${digitToMonth(startMonth.selectedFirstMonth)} ${
          startMonth.selectedFirstYear
        } - ${digitToMonth(endMonth.selectedLastMonth)} ${
          endMonth.selectedLastYear
        }`
      );
    }
    else
    {
        getDateRangeState('');
    }
  },[startMonth]);

  return (
    <div className={`${monthPickStyle.mainContainer}`}>
      <div
        ref={parentRef}
        className={`${monthPickStyle.textField} ${
          focusState ? monthPickStyle.focusedBorder : ""
        }`}
        onClick={togglePicker}
      >
        <div className={`${monthPickStyle.dateView}`}>
          {startMonth &&
          (startMonth.selectedFirstMonth || startMonth.selectedFirstMonth === 0)
            ? `${digitToMonth(startMonth.selectedFirstMonth)} ${
                startMonth.selectedFirstYear
              } - ${digitToMonth(endMonth.selectedLastMonth)} ${
                endMonth.selectedLastYear
              }`
            : "No Date Selected"}
        </div>
        <div className={`${monthPickStyle.calender}`}>📅</div>
      </div>
      {open && (
        <MonthRangePicker
          containerWidth={containerWidth?containerWidth:"400px"}
          setStartMonth={setStartMonth}
          setEndMonth={setEndMonth}
          openState={setOpen}
          focusState={setFocusState}
          parentRef={parentRef}
          applyFunc={applyFunc}
          cancelFunc={cancelFunc}
        />
      )}
    </div>
  );
};

export default MonthPickParent;
