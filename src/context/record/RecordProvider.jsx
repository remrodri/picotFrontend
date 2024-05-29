import { useContext, useState } from "react";
import { RecordContext } from "./RecordContex";
import { getAllRecordsRequest } from "../../services/recordService";

// eslint-disable-next-line react-refresh/only-export-components
export const useRecords = () => {
  const context = useContext(RecordContext);
  if (!context) {
    throw new Error("useRecords debe ser usado con RecordProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const RecordContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const loadRecords = async () => {
    try {
      const response = await getAllRecordsRequest();
      setRecords(response.records)
    } catch (error) {
      console.error("Error al obtener los users", error);
    }
  };
  return (
    <RecordContext.Provider value={{ records, loadRecords }}>
      {children}
    </RecordContext.Provider>
  );
};
