import * as stylex from "@stylexjs/stylex";
import { ErrorMessage, Field } from "formik";
import formStyles from "../../assets/styles/styles.stylex";

function BasicInfoForm() {
  return (
    <div {...stylex.props(formStyles.base())}>
      <div {...stylex.props(formStyles.titleContainer())}>
        <label htmlFor="title">Informacion basica</label>
      </div>
      <div {...stylex.props(formStyles.inputContainer())}>
        <label htmlFor="packageName" {...stylex.props(formStyles.labelInputStyle())}>
          Nombre del paquete turistico
        </label>
        <Field
          type="text"
          name="packageName"
          {...stylex.props(formStyles.fieldStyle())}
        />
        <ErrorMessage name="packageName" component={"div"} />
      </div>
      <div {...stylex.props(formStyles.inputContainer())}>
        <label
          htmlFor="destination"
          {...stylex.props(formStyles.labelInputStyle())}
        >
          Destino
        </label>
        <Field
          type="text"
          name="destination"
          {...stylex.props(formStyles.fieldStyle())}
        />
        <ErrorMessage name="destination" component={"div"} />
      </div>
      <div {...stylex.props(formStyles.inputContainer())}>
        <label
          htmlFor="duration"
          {...stylex.props(formStyles.labelInputStyle())}
        >
          Duracion(dias)
        </label>
        <Field
          type="number"
          name="duration"
          {...stylex.props(formStyles.fieldStyle("30%"))}
        />
        <ErrorMessage name="duration" component={"div"} />
      </div>
    </div>
  );
}

export default BasicInfoForm;
