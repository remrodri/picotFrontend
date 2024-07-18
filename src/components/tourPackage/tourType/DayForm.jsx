/* eslint-disable react/prop-types */
import { Field, FieldArray, ErrorMessage } from "formik";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    width: "100%",
    // padding: "1rem",
  }),
  titleContainer: () => ({
    height: "3rem",
    display: "flex",
    justifyContent: "center",
    color: "aliceblue",
    fontSize: "1.5rem",
  }),
  subTitlesContainer: () => ({
    display: "flex",
    fontSize: "1.3rem",
    gap: "1rem",
    color: "aliceblue",
  }),
  hourSubtitleContainer: () => ({
    width: "10rem",
    display: "flex",
    justifyContent: "center",
  }),
  activitySubtitleContainer: () => ({
    width: "70rem",
    display: "flex",
    justifyContent: "center",
  }),
  activityContainer: () => ({
    height: "4rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  }),
  hourFieldStyle: () => ({
    height: "2.5rem",
    width: "10rem",
    border: "none",
    fontFamily: "Poppins",
    paddingLeft: "0.5rem",
    borderRadius: "0.4rem",
  }),
  textFieldStyle: () => ({
    height: "2.5rem",
    width: "70rem",
    paddingLeft: "1rem",
    border: "none",
    fontFamily: "Poppins",
    borderRadius: "0.4rem",
  }),
  buttonContainer: () => ({
    height: "2.5rem",
  }),
  buttonStyle: () => ({
    height: "2.5rem",
    fontFamily: "Poppins",
    fontSize: "1.3rem",
    width: "15rem",
    border: "none",
    borderRadius: "0.4rem",
  }),
});
function DayForm({ values, dayIndex }) {
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.titleContainer())}>
        <label htmlFor="title">{`Dia ${dayIndex + 1}`}</label>
      </div>
      <div {...stylex.props(styles.subTitlesContainer())}>
        <div {...stylex.props(styles.hourSubtitleContainer())}>
          <label htmlFor="hour">Hora</label>
        </div>
        <div {...stylex.props(styles.activitySubtitleContainer())}>
          <label htmlFor="Activity">Actividad</label>
        </div>
      </div>
      <FieldArray name={`itinerary[${dayIndex}].activities`}>
        {({ remove, push }) => (
          <div>
            {values.itinerary[dayIndex].activities.map(
              (activity, activityIndex) => (
                <div
                  key={activityIndex}
                  {...stylex.props(styles.activityContainer())}
                >
                  <div>
                    <Field
                      type="time"
                      name={`itinerary[${dayIndex}].activities[${activityIndex}].hour`}
                      {...stylex.props(styles.hourFieldStyle())}
                    />
                    <ErrorMessage
                      name={`itinerary[${dayIndex}].activities[${activityIndex}].hour`}
                      component="div"
                    />
                  </div>
                  <div>
                    <Field
                      type="text"
                      name={`itinerary[${dayIndex}].activities[${activityIndex}].activity`}
                      placeholder="Actividad"
                      {...stylex.props(styles.textFieldStyle())}
                    />
                    <ErrorMessage
                      name={`itinerary[${dayIndex}].activities[${activityIndex}].activity`}
                      component="div"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(activityIndex)}
                    {...stylex.props(styles.buttonStyle())}
                  >
                    Eliminar actividad
                  </button>
                </div>
              )
            )}
            <button
              type="button"
              onClick={() => push({ hour: "", activity: "" })}
              {...stylex.props(styles.buttonStyle())}
            >
              Agregar actividad
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

export default DayForm;
