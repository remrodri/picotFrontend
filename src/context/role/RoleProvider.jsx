import { useContext, useState } from "react";
import { RoleContext } from "./RoleContext";
import { getRolesRequest } from "../../services/roleService";

// eslint-disable-next-line react-refresh/only-export-components
export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoles debe ser usado con RoleProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const RoleContextProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  async function loadRoles() {
    try {
      const response = await getRolesRequest();
      setRoles(response);
    } catch (error) {
      console.error(`Error al cargar roles: ${error}`);
    }
  }
  return (
    <RoleContext.Provider value={{ roles, loadRoles }}>
      {children}
    </RoleContext.Provider>
  );
};
