import { useContext, useState } from "react";
import { getAllTourPackagesRequest } from "../../services/tourPackageService";
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
      if (response.succes) {
        setTourPackages(response.tourPackages);
      }
    } catch (error) {
      console.error("Error al obtener los tourPackages", error);
    }
  };

  return (
    <TourPackageContext.Provider
      value={{
        tourPackages,
        loadTourPackages,
      }}
    >
      {children}
    </TourPackageContext.Provider>
  );
};
