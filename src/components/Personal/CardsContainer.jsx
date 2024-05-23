import * as stylex from "@stylexjs/stylex";
import { useUsers } from "../../context/user/UserProvider";
import { useRoles } from "../../context/role/RoleProvider";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const styles = stylex.create({
  base: () => ({
    height: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  }),
  topContainer: () => ({
    height: "6rem",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "1rem",
  }),
  filterContainer: () => ({
    background: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    height: "100%",
    alignContent: "center",
    paddingLeft: "1rem",
  }),
  filterLabelStyle: () => ({
    marginRight: "1rem",
    color: "aliceblue",
    fontSize: "1.3rem",
    fontWeight: "300",
  }),
  bottomContainer: () => ({
    //flexGrow: 1,
    height: "100%",
    background: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderBottomRightRadius: "1rem",
    padding: "1rem",
    display: "flex",
    //flexDirection:"row",
    gap: "1rem",
    //flexWrap: "wrap",
    // justifyContent: "center",
    alignContent: "flex-start",
    flexFlow: "row wrap",
  }),
  userCardContainer: () => ({
    minWidth: "40rem",
  }),
});
function CardsContainer() {
  const { users } = useUsers();
  const { roles } = useRoles();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  useEffect(() => {
    handleSelectChange();
  }, [users]);



  const handleSelectedUser = (userId) => {
    setSelectedUser(userId);
  };

  function handleSelectChange() {
    const roles = document.getElementById("selectOption");
    const selectedRole = roles.options[roles.selectedIndex].value;
    //console.log("selectedRole::: ", selectedRole);
    filterUsers(selectedRole);
  }

  function filterUsers(roleId) {
    if (roleId === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.roleId === roleId));
    }
  }

  function showUsers() {
    return filteredUsers.map((user) => (
      <div key={user._id}>
        <UserCard
          user={user}
          handleSelectedUser={handleSelectedUser}

          selectedUser={ selectedUser}
        />
        {/* {selectedUser === user._id && (
          <UserDetail
            user={user}
            handleSelectedUser={handleSelectedUser}
            setIsUserInfoOpen={setIsUserInfoOpen}
          />
        )} */}
      </div>
    ));
  }

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.topContainer())}>
        <div {...stylex.props(styles.filterContainer())}>
          <label htmlFor="" {...stylex.props(styles.filterLabelStyle())}>
            Filtrar por rol
          </label>
          <select
            id="selectOption"
            defaultValue={"all"}
            onChange={() => handleSelectChange()}
          >
            <option value="all">Todos</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.roleName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div {...stylex.props(styles.bottomContainer())}>{showUsers()}</div>
    </div>
  );
}
export default CardsContainer;
