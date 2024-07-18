/* eslint-disable react/prop-types */
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import * as stylex from "@stylexjs/stylex";

registerLocale("es", es);

const styles = stylex.create({
  base: () => ({
    // width:"100rem"
  }),
});

function CalendarModal({ availableDates }) {
  // console.log("availableDates::: ", availableDates);
  // console.log('new Date()::: ', new Date(availableDates[0]));
  // const dates = [new Date(availableDates[0])]
  const formatedDates = availableDates.map(
    (availableDate) => new Date(availableDate)
  );
  // console.log('formatedDates::: ', availableDates);

  return (
    <div {...stylex.props(styles.base())}>
      {availableDates.length > 0 ? (
        <DatePicker
          locale={"es"}
          // selected={null}
          inline
          monthsShown={3}
          minDate={new Date()}
          highlightDates={formatedDates}
        />
      ) : (
        <p>No hay fechas disponibles</p>
      )}
    </div>
  );
}

export default CalendarModal;
