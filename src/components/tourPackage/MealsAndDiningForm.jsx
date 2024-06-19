import * as stylex from "@stylexjs/stylex";
import formStyles from "../../assets/styles/styles.stylex";
import { ErrorMessage, Field } from "formik";

const styles = stylex.create({
  labelCheckBox: () => ({
    display: "flex",
    paddingBottom: "1rem",
  }),
  checkBoxStyle: () => ({
    width: "2rem",
    height: "2rem",
    marginRight: "1rem",
    alignContent: "center",
  }),
});

function MealsAndDiningForm() {
  const mealOptions = [
    { name: "breakfast", label: "Desayuno" },
    { name: "lunch", label: "Almuerzo" },
    { name: "dinner", label: "Cena" },
  ];
  return (
    <div {...stylex.props(formStyles.base("25rem"))}>
      <div {...stylex.props(formStyles.titleContainer())}>
        <label htmlFor="title">Informacion gastronomica</label>
      </div>
      <div {...stylex.props(formStyles.inputContainer("9rem"))}>
        {mealOptions.map((meal) => (
          <label
            key={meal.name}
            htmlFor={meal.name}
            {...stylex.props(
              formStyles.labelInputStyle(),
              styles.labelCheckBox()
            )}
          >
            <Field
              type="checkbox"
              name={`meals.${meal.name}`}
              {...stylex.props(styles.checkBoxStyle())}
            />
            <ErrorMessage name="`meals.${meal.name}`" component={"div"}/>
            {meal.label}
          </label>
        ))}
      </div>
      {/* <div {...stylex.props(formStyles.inputContainer("11rem"))}>
        <label
          htmlFor="options"
          {...stylex.props(formStyles.labelInputStyle())}
        >
          Informacion adicional
        </label>
        <Field
          as="textarea"
          name="mealAdditionalInfo"
          {...stylex.props(formStyles.fieldStyle("100%", "7rem"))}
        />
        <ErrorMessage name="mealAdditionalInfo" component={"div"}/>
      </div> */}
    </div>
  );
}
export default MealsAndDiningForm;
