/* eslint-disable react/prop-types */
import { ErrorMessage, Field, FieldArray } from "formik";
import * as Yup from "yup";


const ItineraryForm = ({ values }) => (
  <FieldArray name="itinerary">
    {({ push, remove }) => (
      <div>
        {values.itinerary.length > 0 &&
          values.itinerary.map((activity, index) => (
            <div key={index}>
              <div>
                <label htmlFor={`itinerary.${index}.time`}>Hora</label>
                <Field name={`itinerary.${index}.time`} type="time" />
                <ErrorMessage
                  name={`itinerary.${index}.time`}
                  component={"div"}
                />
              </div>
              <div>
                <label htmlFor={`itinerary.${index}.activity`}>Actividad</label>
                <Field name={`itinerary.${index}.activity`} type="text" />
                <ErrorMessage
                  name={`itinerary.${index}.activity`}
                  component={"div"}
                />
              </div>
              <div>
                <button type="button" onClick={() => remove(index)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        <button type="button" onClick={() => push({ time: "", activity: "" })}>
          Agregar
        </button>
      </div>
    )}
  </FieldArray>
);

const itinearyValidadtionSchema = Yup.array().of(
  Yup.object().shape({
    time: Yup.string()
      .required("La hora es requerida")
      .test("unique-time", "hora ya utilizada", function (value) {
        const { parent, context } = this;
        const allTimes = context.itinerary.map(item => item.time);
        const currentIndex = context.itinerary.indexOf(parent);
        const filteredTimes = allTimes.filter(
          (time, index) => index !== currentIndex
        );
        return !filteredTimes.includes(value);
      }),
    activity: Yup.string().required("La actividad es requerida"),
  })
);

// eslint-disable-next-line react-refresh/only-export-components
export { ItineraryForm, itinearyValidadtionSchema };
