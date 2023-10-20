import { useEffect, useRef, useState } from "react";
import monthRangeStyle from "./monthRangePicker.module.css";
const MonthRangePicker = ({
  containerWidth,
  setStartMonth,
  setEndMonth,
  openState,
  parentRef,
  focusState,
  applyFunc,
  cancelFunc,
}) => {
  const containerRef = useRef(null);

  const compareMonth = (firstMonth, firstYear, lastMonth, lastYear) => {
    if (lastYear > firstYear) {
      return true;
    }
    if (lastYear === firstYear) {
      if (lastMonth >= firstMonth) {
        return true;
      }

      return false;
    }

    return false;
  };

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const [year1, setYear1] = useState(2022);
  const [year2, setYear2] = useState(2023);

  const [hoverMonth, setHoverMonth] = useState(null);
  const [hoverYear, setHoverYear] = useState(null);

  const [selectedFirstMonth, setSelectedFirstMonth] = useState(null);
  const [selectedFirstYear, setSelectedFirstYear] = useState(null);

  const [selectedLastMonth, setSelectedLastMonth] = useState(null);
  const [selectedLastYear, setSelectedLastYear] = useState(null);

  function handleClickOutside(event) {
    event.preventDefault();
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      !parentRef.current.contains(event.target)
    ) {
      openState(false);
      focusState(false);
    }
  }

  const getColor = (month, year) => {
    if (selectedFirstMonth === month && selectedFirstYear === year) {
      return monthRangeStyle.calenderCellStart;
    }
    if (selectedLastMonth === month && selectedLastYear === year) {
      return monthRangeStyle.calenderCellEnd;
    }
    if (selectedFirstMonth !== null && selectedLastMonth !== null) {
      if (
        compareMonth(selectedFirstMonth, selectedFirstYear, month, year) &&
        compareMonth(month, year, selectedLastMonth, selectedLastYear)
      ) {
        return monthRangeStyle.calenderCellInbetween;
      }
    }
    if (selectedFirstMonth !== null && selectedLastMonth === null) {
      if (
        compareMonth(selectedFirstMonth, selectedFirstYear, month, year) &&
        compareMonth(month, year, hoverMonth, hoverYear)
      ) {
        return monthRangeStyle.calenderCellInbetween;
      }
    }
    return monthRangeStyle.calenderCellNormal;
  };

  const calenderClick = (month, year) => {
    if (selectedLastYear !== null && selectedLastMonth !== null) {
      setSelectedLastYear(null);
      setSelectedLastMonth(null);
      setSelectedFirstYear(year);
      setSelectedFirstMonth(month);
      return;
    }

    if (selectedFirstYear !== null && selectedFirstMonth !== null) {
      if (month === selectedFirstMonth && year === selectedFirstYear) {
        return;
      }

      if (compareMonth(selectedFirstMonth, selectedFirstYear, month, year)) {
        setSelectedLastMonth(month);
        setSelectedLastYear(year);
      } else {
        setSelectedFirstMonth(month);
        setSelectedFirstYear(year);
      }
      return;
    }
    setSelectedFirstMonth(month);
    setSelectedFirstYear(year);
  };

  const resetAll = () => {
    setSelectedFirstMonth(null);
    setSelectedFirstYear(null);
    setSelectedLastMonth(null);
    setSelectedLastYear(null);
    setHoverMonth(null);
    setHoverYear(null);
    openState(false);
    focusState(false);
  };

  const applyMonths = () => {
    setStartMonth({ selectedFirstMonth, selectedFirstYear });
    setEndMonth({ selectedLastMonth, selectedLastYear });
    applyFunc && applyFunc();
    resetAll();
  };

  const cancelButton = () => {
    setStartMonth({ selectedFirstMonth: null, selectedFirstYear: null });
    setEndMonth({ selectedLastYear: null, setSelectedLastYear: null });
    cancelFunc && cancelFunc();
    resetAll();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const containerTheme = {
    width: containerWidth,
  };
  return (
    <>
      <div
        ref={containerRef}
        className={monthRangeStyle.monthRangeContainer}
        style={containerTheme}
      >
        <div className={monthRangeStyle.monthRangePicker}>
          <div className={monthRangeStyle.leftCalender}>
            <div className={monthRangeStyle.upperLayer}>
              <button
                className={`${monthRangeStyle.upperButton}`}
                onClick={() => {
                  setYear1(year1 - 1);
                  setYear2(year2 - 1);
                }}
              >
                {"<"}
              </button>
              <div className={`${monthRangeStyle.yearName}`}>{year1}</div>
            </div>
            <div className={monthRangeStyle.blockContainer}>
              {months.map((month, i) => {
                return (
                  <div
                    key={`${i} ${year1}`}
                    className={`${monthRangeStyle.calenderCell} ${getColor(
                      i,
                      year1
                    )}`}
                    onMouseEnter={() => {
                      setHoverYear(year1);
                      setHoverMonth(i);
                    }}
                    onMouseLeave={() => {
                      setHoverYear(null);
                      setHoverMonth(null);
                    }}
                    onClick={() => {
                      calenderClick(i, year1);
                    }}
                  >
                    {month}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={monthRangeStyle.rightCalender}>
            <div className={monthRangeStyle.upperLayer}>
              <div className={`${monthRangeStyle.yearName}`}>{year2}</div>
              <button
                className={`${monthRangeStyle.upperButton}`}
                onClick={() => {
                  setYear1(year1 + 1);
                  setYear2(year2 + 1);
                }}
              >
                {">"}
              </button>
            </div>
            <div className={monthRangeStyle.blockContainer}>
              {months.map((month, i) => {
                return (
                  <div
                  key={`${i} ${year2}`}
                    className={`${monthRangeStyle.calenderCell} ${getColor(
                      i,
                      year2
                    )}`}
                    onMouseEnter={() => {
                      setHoverYear(year2);
                      setHoverMonth(i);
                    }}
                    onMouseLeave={() => {
                      setHoverYear(null);
                      setHoverMonth(null);
                    }}
                    onClick={() => {
                      calenderClick(i, year2);
                    }}
                  >
                    {month}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={monthRangeStyle.accessories}>
          <button
            className={`${monthRangeStyle.buttonCommon} ${monthRangeStyle.applyButton}`}
            onClick={applyMonths}
            disabled={
              !(
                (selectedLastMonth || selectedLastMonth === 0) &&
                selectedLastYear
              )
            }
          >
            Apply
          </button>
          <button
            className={`${monthRangeStyle.buttonCommon} ${monthRangeStyle.cancelButton}`}
            onClick={cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default MonthRangePicker;
