import * as stylex from "@stylexjs/stylex";
import formStyles from "../../assets/styles/styles.stylex";
import { ErrorMessage, Field, FieldArray } from "formik";

const styles = stylex.create({
  base: () => ({
    width:"100%"
  }),
  fieldContainer: () => ({
    marginBottom:'1rem'
  }),
  localFieldStyle: () => ({
    margin:"0 1rem 0 0"
  })
})

function ActivitiesAndAtractionsForm() {
  return (
    <div {...stylex.props(formStyles.base())}>
      <div {...stylex.props(formStyles.titleContainer())}>
        <label htmlFor="title">Informacion de atracciones</label>
      </div>
      <div {...stylex.props(formStyles.inputContainer("20rem"))}>
        <label
          htmlFor="atractions"
          {...stylex.props(formStyles.labelInputStyle())}
        >
          Atracciones
        </label>
        <FieldArray name="attractions">
          {({ form, remove, push }) => (
            <div>
              {form.values.attractions.map((_, index) => (
                <div key={index} {...stylex.props(styles.base(),styles.fieldContainer())}>
                  <Field
                    name={`attractions[${index}].name`}
                    placeholder="Nombre de la atraccion"
                    
                    {...stylex.props(formStyles.fieldStyle("70%"),styles.localFieldStyle())}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    Eliminar
                  </button>
                  <ErrorMessage
                    name={`attractions[${index}].name`}
                    component={"div"}
                    // style={{ color: "red" }}
                  />
                </div>
              ))}
              <button type="button" onClick={() => push({ name: "" })}>
                agregar
              </button>
            </div>
          )}
        </FieldArray>
        <ErrorMessage name="atractions" component={"div"} />
      </div>
    </div>
  );
}
export default ActivitiesAndAtractionsForm;
