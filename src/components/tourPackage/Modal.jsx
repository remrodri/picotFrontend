/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    height: "25rem",
  }),
});

function Modal(props) {
  const { values } = props;
  console.log("values::: ", values);
  return (
    <div {...stylex.props(styles.base())}>
      <div>
        <label htmlFor="packageName">Nombre del paquete:</label>
        <p>{values.packageName}</p>
      </div>
      <div>
        <label htmlFor="destination">Destino:</label>
        <p>{values.destination}</p>
      </div>
      {/* <div>
        <label htmlFor="duration">Duracion:</label>
        <p>{values.duration}</p>
      </div> */}
      {/* <div>
        <label htmlFor="departureTime">Hora de salida:</label>
        <p>{values.departureTime}</p>
      </div>
      <div>
        <label htmlFor="arrivalTime">Hora de llegada</label>
        <p>{ values.arrivalTime}</p>
      </div> */}
      {/* <div>
        <label htmlFor="price">Precio</label>
        <p>{values.price}</p>
      </div> */}
      {/* <div>
        <label htmlFor="meals">Alimientacion</label>
        <param name="" value="" />
      </div> */}
    </div>
  );
}
export default Modal;
