import * as stylex from "@stylexjs/stylex";
import formStyles from "../../assets/styles/styles.stylex";
import { ErrorMessage, Field } from "formik";

const styles = stylex.create({
  priceFieldContainer: () => ({
    display: "flex",
    width: "90%",
    // alignContent:"flex-start"
  }),
  labelStyle: () => ({
    // height:"100%",
    fontSize: "1.3rem",
    color: "aliceblue",
    marginLeft: "1rem",
    display: "flex",
    alignItems:"center"
  }),
  fieldContainer: () => ({
    width:"45%"
  })
});

function PriceInfoForm() {
  return (
    <div {...stylex.props(formStyles.base())}>
      <div {...stylex.props(formStyles.titleContainer())}>
        <label htmlFor="title">Informacion del precio </label>
      </div>
      <div {...stylex.props(formStyles.inputContainer("7rem"))}>
        <label htmlFor="price" {...stylex.props(formStyles.labelInputStyle())}>
          Precio del paquete (por persona)
        </label>
        <div {...stylex.props(styles.priceFieldContainer())}>
          <div {...stylex.props(styles.fieldContainer())}>
            <Field
              type="number"
              step="0.01"
              name="price"
              {...stylex.props(formStyles.fieldStyle("100%"))}
            />
            <ErrorMessage name="price" component={"div"} />
          </div>
          <div {...stylex.props(styles.labelStyle())}>
            <label htmlFor="">Bolivianos</label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PriceInfoForm;
