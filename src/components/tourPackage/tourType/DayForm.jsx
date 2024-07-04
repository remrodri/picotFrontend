/* eslint-disable react/prop-types */
import { Field, FieldArray, ErrorMessage } from "formik";

function DayForm({ values, dayIndex }) {
  return (
    <FieldArray name={`itinerary[${dayIndex}].activities`}>
      {({ remove, push }) => (
        <div>
          {values.itinerary[dayIndex].activities.map((activity, activityIndex) => (
            <div key={activityIndex}>
              <Field
                type="time"
                name={`itinerary[${dayIndex}].activities[${activityIndex}].hour`}
              />
              <ErrorMessage
                name={`itinerary[${dayIndex}].activities[${activityIndex}].hour`}
                component="div"
              />
              <Field
                type="text"
                name={`itinerary[${dayIndex}].activities[${activityIndex}].activity`}
                placeholder="Actividad"
              />
              <ErrorMessage
                name={`itinerary[${dayIndex}].activities[${activityIndex}].activity`}
                component="div"
              />
              <button type="button" onClick={() => remove(activityIndex)}>
                Eliminar actividad
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => push({ hour: "", activity: "" })}
          >
            Agregar actividad
          </button>
        </div>
      )}
    </FieldArray>
  );
}

export default DayForm;
