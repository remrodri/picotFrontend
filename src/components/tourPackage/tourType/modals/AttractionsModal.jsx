/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({}),
});
function AttractionsModal({ attractions }) {
  console.log("attractions::: ", attractions);
  return <div {...stylex.props(styles.base())}>
    {attractions.length > 0 ?
      attractions.map((attraction, index) => { return <div key={index}>{attraction}</div> })
      : "No hay atracciones registradas"}
  </div>;
} 

export default AttractionsModal;
