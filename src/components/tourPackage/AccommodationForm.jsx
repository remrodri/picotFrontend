import * as stylex from "@stylexjs/stylex";
import formStyles from "../../assets/styles/styles.stylex";
import { ErrorMessage, Field } from "formik";

function AccommodationForm() {
  return (
    <div {...stylex.props(formStyles.base("17rem"))}>
      <div {...stylex.props(formStyles.titleContainer())}>
        <label htmlFor="title">Informacion del hospedaje</label>
      </div>
      <div {...stylex.props(formStyles.inputContainer())}>
        <label htmlFor="accommodationType" {...stylex.props(formStyles.labelInputStyle())}>
          Tipo de alojamiento
        </label>
        <Field
          type="text"
          name="accommodationType"
          {...stylex.props(formStyles.fieldStyle())}
        />
        <ErrorMessage name="accommodationType" component={"div"} />
      </div>
      <div {...stylex.props(formStyles.inputContainer())}>
        <label
          htmlFor="services"
          {...stylex.props(formStyles.labelInputStyle())}
        >
          Servicios
        </label>
        <Field
          type="text"
          name="services"
          {...stylex.props(formStyles.fieldStyle())}
        />
        <ErrorMessage name="services" component={"div"} />
      </div>
    </div>
  );
}
export default AccommodationForm;
