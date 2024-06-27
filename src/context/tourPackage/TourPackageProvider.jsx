import { useContext, useState } from "react";
import {
  createTourPackageRequest,
  getAllTourPackagesRequest,
  updateTourPackageRequest,
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
        console.log("response::: ", response);
        setTourPackages([
          ...tourPackages,
          { ...tourPackage, _id: response.tourPackageId },
        ]);
      }
      return { success: response.success };
    } catch (error) {
      console.error("Error al crear el tourPackage", error);
    }
  };
  // const changeAvailability = (id) => {
  //   console.log("id::: ", id);
  //   const tourPackageFinded = tourPackages.find(
  //     (tourPackage) => tourPackage._id === id
  //   );
  //   if (tourPackageFinded) {
  //     console.log('tourPackageFinded::: ', tourPackageFinded);

  //   }
  // };

  const updateTourPackage = async (id, tourPackageUpdated) => {
    // console.log("id::: ", id);
    // console.log("tourPackageUpdated::: ", tourPackageUpdated);
    try {
      const response = await updateTourPackageRequest(id, tourPackageUpdated);
      if (response.success) {
        setTourPackages(
          tourPackages.map((tourPackage) =>
            tourPackage._id === id
              ? { ...tourPackage, ...tourPackageUpdated }
              : tourPackage
          )
        );
      } else {
        console.log("problemas con el response");
      }
      return response;
    } catch (error) {
      console.error("Error al actualizar el tourPackage", error);
    }
  };

  return (
    <TourPackageContext.Provider
      value={{
        tourPackages,
        loadTourPackages,
        createTourPackage,
        // changeAvailability,
        updateTourPackage,
      }}
    >
      {children}
    </TourPackageContext.Provider>
  );
};
