import { useContext, useState } from "react"
import { UserContext } from "./UserContext"
import { createUserRequest, getAllUsersRequest, removeUserRequest, updateUserRequest } from "../../services/userService";

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

  const createUser = async (user) => {
    try {
      const response = await createUserRequest(user);
      if (response.success) {
        setUsers([...users, {...user,_id:response.userId}]);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
  const updateUser = async (id,userUpdated) => {
    try {
      const response = await updateUserRequest(id, userUpdated);
      // console.log('response::: ', response.success);
      if (response.success) { 
        setUsers(users.map((user)=>(user._id===id)?{...user, ...userUpdated}:user));
        return response;
      }
    } catch (error) {
      console.log(error)
    }
  }
  const removeUser = async (id) => {
    try {
      const response = await removeUserRequest(id);
      if (response.success) { 
        setUsers(users.filter((user) => (user._id !== id)));
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider value={{ users, loadUsers,createUser,updateUser,removeUser }}>
      {children}
    </UserContext.Provider>
  )
}

