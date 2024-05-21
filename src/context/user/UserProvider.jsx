import { useContext, useState } from "react"
import { UserContext } from "./UserContext"
import { getAllUsersRequest } from "../../services/userService";

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers debe ser usado con UserProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const response = await getAllUsersRequest();
      setUsers(response);
    } catch (error) {
      console.error("Error al obtener los users", error);
    }
  };
  return (
    <UserContext.Provider value={{ users, loadUsers }}>
      {children}
    </UserContext.Provider>
  )
}

