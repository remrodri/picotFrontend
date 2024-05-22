/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    minWidth: "40rem",
    height: "16rem",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    background: "rgb(245, 245, 245)",
    borderRadius: "0 0 1rem 1rem",
    fontSize: "1.1rem",
  }),
  cardContainer: ()=>({}),
  buttonStyle: ()=>({
    background: {
      default: "rgb(0, 127, 255)",
    },
    border: "none",
    height: "3rem",
    borderRadius: "0.5rem",
    color: "aliceblue",
    fontFamily: "Poppins",
    cursor:"pointer"
  }),
});

function UserDetail({
  user,
  handleSelectedUser,
  setIsUserInfoOpen,
}) {
  return (
    <div {...stylex.props(styles.base())}>
      <label htmlFor="">Informacion completa</label>
      <label htmlFor="">Nombre(s): {user.firstName}</label>
      <label htmlFor="">Apellido(s): {user.lastName}</label>
      <label htmlFor="">Rol: {user.roleId}</label>
      <label htmlFor="">Celular: {user.phone}</label>
      <label htmlFor="">Email: {user.email}</label>
      <label htmlFor="">CI: {user.ci}</label>
      <button
        onClick={() => {
          handleSelectedUser(null);
          setIsUserInfoOpen(false);
        }}
        {...stylex.props(styles.buttonStyle())}
      >
        Cerrar
      </button>
    </div>
  );
}
export default UserDetail;