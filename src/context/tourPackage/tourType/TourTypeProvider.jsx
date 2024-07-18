/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import {
  createTourTypeRequest,
  getAllTourTypesByTourPackageIdRequest,
  updateTourTypeRequest,
} from "../../../services/tourTypeService";
import { TourTypeContext } from "./TourTypeContext";

export const useTourTypes = () => {
  const context = useContext(TourTypeContext);
  if (!context) {
    throw new Error("useTourTypes debe ser usado con TourTypeContext");
  }
  return context;
};

export const TourTypeContextProvider = ({ children }) => {
  const [tourPackageTourTypes, setTourPackageTourTypes] = useState([]);

  const loadTourTypes = async (id) => {
    try {
      const response = await getAllTourTypesByTourPackageIdRequest(id);
      console.log("response::: ", response.tourTypes);
      if (response.success) {
        setTourPackageTourTypes(response.tourTypes);
      }
    } catch (error) {
      console.error("Error al obtener los tourTypes de tourPackage");
    }
  };

  const createTourType = async (newTourType) => {
    try {
      const response = await createTourTypeRequest(newTourType);
      if (response.success) {
        setTourPackageTourTypes([
          ...tourPackageTourTypes,
          { ...newTourType, _id: response._id },
        ]);
      }
      return { success: response.success };
    } catch (error) {
      console.error("Error al crear el tourType", error);
    }
  };

  const updateTourType = async (id, tourTypeUpdated) => {
    try {
      const response = await updateTourTypeRequest(id, tourTypeUpdated);
      if (response.success) {
        setTourPackageTourTypes(
          tourPackageTourTypes.map((tourType) =>
            tourType._id === id ? { ...tourType, ...tourTypeUpdated } : tourType
          )
        );
      } else {
        console.error("Error al actualizar el tourType");
      }
    } catch (error) {
      console.error("Error al actualizar el tourType", error);
    }
  };
  return (
    <TourTypeContext.Provider
      value={{ tourPackageTourTypes, loadTourTypes, updateTourType,createTourType }}
    >
      {children}
    </TourTypeContext.Provider>
  );
};
