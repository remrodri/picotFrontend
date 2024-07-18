import * as stylex from "@stylexjs/stylex";
import { ErrorMessage, Field, FieldArray } from "formik";

const styles = stylex.create({
  base: () => ({
    width: "70rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "0 1rem 1rem 0",
    padding: "1rem",
    display: "flex",
    // justifyContent: "center",
    color: "aliceblue",
    fontFamily: "Poppins",
    fontSize: "1.5rem",
    flexDirection: "column",
  }),
  titleContainer: () => ({
    height: "3rem",
  }),
});

function AtractionsForm() {
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.titleContainer())}>
        <label htmlFor="title">
          Escribe las atraciones incluidas en este tour
        </label>
      </div>
      <div>
        <FieldArray name="attractions">
          {({ form, remove, push }) => (
            <div>
              {form.values.attractions.map((attraction, index) => (
                <div key={index}>
                  <Field
                    name={`attractions[${index}]`}
                    placeholder="Nombre de la atracción"
                  />
                  <ErrorMessage
                    name={`attractions[${index}]`}
                    component={"div"}
                  />
                  <button type="buton" onClick={() => remove(index)}>
                    Eliminar
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => push("")}>
                Agregar
              </button>
            </div>
          )}
        </FieldArray>
        <ErrorMessage name="atractions" component={"div"} />
      </div>
    </div>
  );
}
export default AtractionsForm;
