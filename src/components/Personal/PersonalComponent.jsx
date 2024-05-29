import * as stylex from "@stylexjs/stylex";
import { useRoles } from "../../context/role/RoleProvider";
import { useEffect } from "react";
import { useUsers } from "../../context/user/UserProvider";
import { Outlet, useNavigate } from "react-router-dom";

const styles = stylex.create({
  base: () => ({
    height: "100%",
    background: {
      // default: "rgba(0, 0, 0, 0.2)",
      default: "rgba(35, 39, 46, 0.57)",
      // default: "#23272e",
    },
    backdropFilter: "blur(13px)",
    border: "1px solid rgba(0,0,0,0.3)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderTopRightRadius: "1.6rem",
    borderBottomRightRadius: "1.6rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    overflowY:"auto"
  }),
  topContainer: () => ({
    background: "rgba(35, 39, 46, 0.57)",
    height: "8rem",
    display: "flex",
    flexDirection: "column",
    borderTopRightRadius: "1rem",
    border: "1px solid rgba(0,0,0,0.3)",
  }),
  labelTopContainer: () => ({
    height: "3rem",
    width: "100%",
    alignContent: "center",
    paddingLeft: "1rem",
  }),
  labelButtonsStyle: () => ({
    fontSize: "1.3rem",
    color: "aliceblue",
    fontWeight: "200",
  }),
  buttonsContainer: () => ({
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    paddingLeft: "1rem",
    //overflowY:"auto"
  }),
  buttonStyle: () => ({
    height: "3rem",
    width: "15rem",
    borderRadius: "0.7rem",
    cursor: "pointer",
    fontFamily: "Poppins",
    background: {
      default: "rgba(73, 204, 208, 0.77)",
      ":hover": "rgba(73, 204, 208, 0.41)",
    },
    border: "1px solid rgba(73, 204, 208,0.3)",
    color: {
      default: "black",
      ":hover": "aliceblue",
    },
  }),
  bottomContainer: () => ({
    flexGrow: 1,
    borderBottomRightRadius: "1rem",
    background: "rgba(35, 39, 46, 0.57)",
    border: "1px solid rgba(0,0,0,0.3)",
  }),
});

function CardsComponent() {
  const { loadRoles } = useRoles();
  const { loadUsers } = useUsers();
  const navigate = useNavigate();
  useEffect(() => {
    loadRoles();
    loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.topContainer())}>
        <div {...stylex.props(styles.labelTopContainer())}>
          <label htmlFor="" {...stylex.props(styles.labelButtonsStyle())}>
            Gestion del personal
          </label>
        </div>
        <div {...stylex.props(styles.buttonsContainer())}>
          <button {...stylex.props(styles.buttonStyle())}
            onClick={()=>navigate("nuevo")}
          >
            Registar personal
          </button>
        </div>
      </div>
      <div {...stylex.props(styles.bottomContainer())}>
        <Outlet/>
      </div>
    </div>
  );
}
export default CardsComponent;
