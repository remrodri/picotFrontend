import * as stylex from "@stylexjs/stylex";
import formStyles from "../../assets/styles/styles.stylex";
import { ErrorMessage, Field } from "formik";

function TransportationInfoForm() {
  return (
    <div {...stylex.props(formStyles.base())}>
      <div {...stylex.props(formStyles.titleContainer())}>
        <label htmlFor="title">Informacion del transporte</label>
      </div>
      <div {...stylex.props(formStyles.inputContainer())}>
        <label
          htmlFor="departureTime"
          {...stylex.props(formStyles.labelInputStyle())}
        >
          Hora de salida
        </label>
        <Field
          type="time"
          name="departureTime"
          {...stylex.props(formStyles.fieldStyle("40%"))}
        />
        <ErrorMessage name="departureTime" component={"div"} />
      </div>
      <div {...stylex.props(formStyles.inputContainer())}>
        <label
          htmlFor="arrivalTime"
          {...stylex.props(formStyles.labelInputStyle())}
        >
          Hora de llegada
        </label>
        <Field
          type="time"
          name="arrivalTime"
          {...stylex.props(formStyles.fieldStyle("40%"))}
        />
        <ErrorMessage name="arrivalTime" component={"div"} />
      </div>
    </div>
  );
}
export default TransportationInfoForm;
