/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";
import { AccountCircle, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import UserDetail from "./UserDetail";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUsers } from "../../context/user/UserProvider";
import { useRoles } from "../../context/role/RoleProvider";

const styles = stylex.create({
  base: (value) => ({
    minWidth: "40rem",
    height: "6rem",
    background: "rgb(242, 242, 242)",
    borderRadius: value,
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
    padding: "0 1rem 0",
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
  rolePhoneContainer: () => ({
    display: "flex",
    justifyContent: "space-between",
    // padding: " 0 2.5rem 0",
  }),
  roleLabelContainer: () => ({
    width:"45%"
  }),
  phoneLabelContainer: () => ({
    width:"55%"
  })
});

const MySwal = withReactContent(Swal);

function UserCard(props) {
  const { roles } = useRoles();
  const { user, handleSelectedUser, selectedUser } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const navigate = useNavigate();
  const { removeUser } = useUsers();
  // const [isMenuPosition, setMenuPosition] = useState({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function handleRemoveUser() {
    MySwal.fire({
      title: "Este usuario sera eliminado",
      showCancelButton: true,
      cancelButtonText: <p>Cancelar</p>,
      confirmButtonText: <p>Eliminar</p>,
      confirmButtonColor: "rgb(51,153,255)",
      preConfirm: async () => {
        const response = await removeUser(user._id);
        if (response.success) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 6000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Se elimino exitosamente",
          });
        }
      },
    });
  }

  const handleMenuItemClick = (option) => {
    if (option === "viewUser") {
      // console.log("mostrar info completa");
      setIsUserInfoOpen(true);
      handleSelectedUser(user._id);
    }
    if (option === "editUser") {
      console.log("cargar fomulario de edicion");
      navigate(`editar/${user._id}`);
    }
    if (option === "removeUser") {
      console.log("eliminar user");
      handleRemoveUser();
    }
    toggleMenu();
  };
  const getRoleNameById = (roleId) => {
    // console.log('roleId::: ', roleId);
    const roleName = roles.find((role) => role._id === roleId).roleName;
    return roleName;
  };
  // console.log('roles::: ', roles);
  return (
    <div>
      <div
        {...stylex.props(
          styles.base(isUserInfoOpen ? "1rem 1rem 0 0" : "1rem")
        )}
      >
        <div {...stylex.props(styles.iconContainer())}>
          <AccountCircle {...stylex.props(styles.iconStyle())} />
        </div>
        <div {...stylex.props(styles.dataInformationContainer())}>
          <label htmlFor="userName">
            {user.firstName} {user.lastName}
          </label>
          <div {...stylex.props(styles.rolePhoneContainer())}>
            <div {...stylex.props(styles.roleLabelContainer())}>
              <label htmlFor="role">{getRoleNameById(user.roleId)}</label>
            </div>
            <div {...stylex.props(styles.phoneLabelContainer())}>
              <label htmlFor="phone">cel: {user.phone}</label>
            </div>
          </div>
        </div>
        <div
          {...stylex.props(styles.secondIconContainer())}
          onClick={toggleMenu}
        >
          <MoreVert {...stylex.props(styles.secondIconStyle())} />
          {isMenuOpen && (
            <div {...stylex.props(styles.menuCard())} onMouseLeave={toggleMenu}>
              <button
                onClick={() => {
                  handleMenuItemClick("viewUser");
                }}
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
      {selectedUser === user._id ? (
        <UserDetail
          user={user}
          handleSelectedUser={handleSelectedUser}
          setIsUserInfoOpen={setIsUserInfoOpen}
          getRoleNameById={getRoleNameById}
        />
      ) : null}
    </div>
  );
}
export default UserCard;
