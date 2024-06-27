/* eslint-disable react/prop-types */
function TourPackageModal(props) {
  const { values } = props;
  // console.log('values::: ', values);
  return (
    <div>
      <label htmlFor="name">Nombre:</label>
      <p>{values.name}</p>
      <label htmlFor="destination">Destino</label>
      <p>{values.destination}</p>
      <label htmlFor="type">Tipo de paquete</label>
      <p>{values.type}</p>
    </div>
  );

}
export default TourPackageModal;
