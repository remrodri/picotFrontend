/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import * as stylex from "@stylexjs/stylex";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import "../../../assets/styles/datepicker-custom.css";

registerLocale("es", es);

const styles = stylex.create({
  base: () => ({
    // height: "100%",
    // width: "100%",
    padding: "1rem",
    // width: "74.7rem",
    width: "100.8rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    // outline: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "1rem",
  }),
  calendarStyle: () => ({
    fontSize: "1.3rem",
  }),
  titleContainer: () => ({
    height: "3rem",
    fontSize: "1.5rem",
    color: "aliceblue",
    textAlign: "center",
  }),
});

function AvailableDatesForm({ availableDates, setFieldValue }) {
  // console.log("availableDates::: ", availableDates);
  const [selectedDates, setSelectedDates] = useState(
    // availableDates.map((date) => new Date(date))
    availableDates||[]
  );
  
  useEffect(() => {
    setFieldValue("availableDates", selectedDates);
    // console.log('selectedDates::: ', selectedDates);
  }, [selectedDates, setFieldValue]);
  
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };
  

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.titleContainer())}>
        <label htmlFor="">Selecciona las fechas disponibles</label>
      </div>
      <DatePicker
        selectedDates={availableDates}
        locale={"es"}
        selected={null}
        onChange={handleDateChange}
        inline
        selectsMultiple
        monthsShown={3}
      />
    </div>
  );
}

export default AvailableDatesForm;
