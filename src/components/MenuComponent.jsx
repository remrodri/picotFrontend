import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    width: "20rem",
    height: "100%",
    background: {
      // default: "rgba(0, 0, 0, 0.2)",
      default: "rgba(35, 39, 46, 0.57)",
      // default: "#23272e",
    },
    borderTopLeftRadius: "1.6rem",
    borderBottomLeftRadius: "1.6rem",
    backdropFilter: "blur(13px)",
    border: "1px solid rgba(0,0,0,0.3)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  appNameContainer: () => ({
    height: "5rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(51, 95, 53, 0.55)",
    borderTopLeftRadius: "1.6rem",
  }),
  appNameStyle: () => ({
    color: "#fffafa",
    fontSize: "large",
  }),
  roleNameContainer: () => ({
    color: "#fffafa",
    fontSize: "large",
    height: "5rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(51, 52, 95, 0.55)",
  }),
  buttonsContainer: () => ({
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0.5rem",
    gap: "0.5rem",
  }),
  buttonStyle: () => ({
    // marginTop:"0.8rem",
    width: "100%",
    height: "4rem",
    borderRadius: "1rem",
    background: {
      default: "rgba(35, 39, 46, 0.57)",
      ":hover": "rgba(35, 39, 46, 0.82)",
    },
    color: "#f1eff2",
    fontFamily: "Poppins",
    fontWeight: "300",
    border: "1px solid rgba(35,39,46,0.3)",
    cursor: "pointer",
  }),
  buttonLogoutContainer: () => ({
    height: "5.5rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.9rem",
  }),
  buttonLogoutStyle: () => ({
    height: "4rem",
    width: "100%",
    borderBottomLeftRadius: "1rem",
    // border: "none",
    fontFamily: "Poppins",
    background: {
      default: "rgba(46, 38, 35, 0.57)",
      ":hover": "rgba(48, 24, 24, 0.79)",
    },
    color: "#f1eff2",
    border: "1px solid rgba(46,38,35,0.3)",
    cursor: "pointer",
  }),
});

function MenuComponent() {
  const getRoleName = () => {
    return localStorage.getItem("role");
  };
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.appNameContainer())}>
        <label htmlFor="" {...stylex.props(styles.appNameStyle)}>
          PICOT
        </label>
      </div>
      <div {...stylex.props(styles.roleNameContainer())}>
        <label htmlFor="">{getRoleName()}</label>
      </div>
      <div {...stylex.props(styles.buttonsContainer())}>
        <button {...stylex.props(styles.buttonStyle())}>
          Personal
        </button>
        <button {...stylex.props(styles.buttonStyle())}>
          Bitacora
        </button>
      </div>
      <div {...stylex.props(styles.buttonLogoutContainer())}>
        <button {...stylex.props(styles.buttonLogoutStyle())}>
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
}
export default MenuComponent;
