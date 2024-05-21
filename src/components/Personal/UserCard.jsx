/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";
import { AccountCircle, MoreVert } from "@mui/icons-material";
import { useState } from "react";

const styles = stylex.create({
  base: () => ({
    minWidth: "40rem",
    height: "6rem",
    background: "rgb(242, 242, 242)",
    borderRadius: "0.7rem",
    display: "flex",
  }),
  iconContainer: () => ({
    height: "100%",
    width: "6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  iconStyle: () => ({
    fontSize: "5rem",
    color: "#5e5454",
  }),
  dataInformationContainer: () => ({
    // width: "30rem",
    width: "31rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.3rem",
    paddingLeft: "1rem",
    fontSize: "1.2rem",
  }),
  secondIconContainer: () => ({
    width: "3rem",
    display: "flex",
    alignItems: "center",
  }),
  secondIconStyle: () => ({
    fontSize: "3rem",
    position: "absolute",
  }),
  menuCard: () => ({
    // minWidth:"10rem",
    zIndex: 1000,
  }),
  buttonMenuCardStyle: () => ({
    width: "6rem",
  }),
});

function UserCard(props) {
  const { user } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuPosition, setMenuPosition] = useState({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (option) => {
    if (option === "viewUser") {
      console.log("mostrar info completa");
    }
    if (option === "editUser") {
      console.log("cargar fomulario de edicion");
    }
    if (option === "removeUser") {
      console.log("eliminar user");
    }
    toggleMenu();
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.iconContainer())}>
        <AccountCircle {...stylex.props(styles.iconStyle())} />
      </div>
      <div {...stylex.props(styles.dataInformationContainer())}>
        <label htmlFor="">
          {user.firstName} {user.lastName}
        </label>
        <label htmlFor="">{user.phone}</label>
      </div>
      <div {...stylex.props(styles.secondIconContainer())} onClick={toggleMenu}>
        <MoreVert {...stylex.props(styles.secondIconStyle())} />
        {isMenuOpen && (
          <div {...stylex.props(styles.menuCard())} onMouseLeave={toggleMenu}>
            <button
              onClick={() => handleMenuItemClick("viewUser")}
              {...stylex.props(styles.buttonMenuCardStyle())}
            >
              ver mas
            </button>
            <button
              onClick={() => handleMenuItemClick("editUser")}
              {...stylex.props(styles.buttonMenuCardStyle())}
            >
              editar
            </button>
            <button
              onClick={() => handleMenuItemClick("removeUser")}
              {...stylex.props(styles.buttonMenuCardStyle())}
            >
              borrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default UserCard;
