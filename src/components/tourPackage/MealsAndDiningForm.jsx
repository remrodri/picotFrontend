import * as stylex from "@stylexjs/stylex";
import formStyles from "../../assets/styles/styles.stylex";

function MealsAndDiningForm() {
  return <div {...stylex.props(formStyles.base())}>
    <div {...stylex.props(formStyles.titleContainer())}>
      <label htmlFor="title">Informacion gastronomica</label>
    </div>
    <div {...stylex.props(formStyles.inputContainer())}>
      
    </div>
  </div>;
}
export default MealsAndDiningForm;
