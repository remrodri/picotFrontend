import { useContext, useState } from "react";
import {
  createTourPackageRequest,
  getAllTourPackagesRequest,
} from "../../services/tourPackageService";
import { TourPackageContext } from "./TourPackageContext";

// eslint-disable-next-line react-refresh/only-export-components
export const useTourPackages = () => {
  const context = useContext(TourPackageContext);
  if (!context) {
    throw new Error("useTourPackages debe ser usado con TourPackagesProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const TourPackageContextProvider = ({ children }) => {
  const [tourPackages, setTourPackages] = useState([]);
  const loadTourPackages = async () => {
    try {
      const response = await getAllTourPackagesRequest();
      if (response.success) {
        setTourPackages(response.tourPackages);
      }
    } catch (error) {
      console.error("Error al obtener los tourPackages", error);
    }
  };
  const createTourPackage = async (tourPackage) => {
    try {
      const response = await createTourPackageRequest(tourPackage);
      if (response.success) {
        console.log('response::: ', response);
        setTourPackages([
          ...tourPackages,
          { ...tourPackage, _id: response.tourPackageId },
        ]);
      }
      return {success:response.success}
    } catch (error) {
      console.error("Error al crear el tourPackage", error);
    }
  };

  return (
    <TourPackageContext.Provider
      value={{
        tourPackages,
        loadTourPackages,
        createTourPackage,
      }}
    >
      {children}
    </TourPackageContext.Provider>
  );
};
