/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { useTourPackages } from "../../../context/tourPackage/TourPackageProvider";
import TourTypeCard from "./TourTypeCard";
import { useTourTypes } from "../../../context/tourPackage/tourType/TourTypeProvider";
// import CardsContainer from "../../Personal/CardsContainer";

const styles = stylex.create({
  base: () => ({
    height: "100%",
  }),
  cardsContainer: () => ({
    padding: "0 1rem 0 1rem",
    height: "calc(100% - 4rem)",
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
  }),
  titleContainer: () => ({
    // width:"100%",
    height: "100%",
    fontSize: "1.3rem",
    color: "aliceblue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  buttonContainer: () => ({
    height: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  buttonStyle: () => ({
    height: "3rem",
    width: "15rem",
    border: "none",
    fontFamily: "Poppins",
    borderRadius: "0.5rem",
    cursor: "pointer",
  }),
});

function TourTypeCardsContainer() {
  // const navigate = useNavigate();
  const params = useParams();
  const { tourPackages } = useTourPackages();
  const { tourPackageTourTypes, loadTourTypes } = useTourTypes();
  // const [tourPackage, setTourPackage] = useState({});
  const [tourTypes, setTourTypes] = useState([]);
  useEffect(() => {
    loadTourPackage();
    loadTourTypes(params.id);
    // console.log("params::: ", params);
  }, [tourPackages, tourTypes]);
  
  const loadTourPackage = () => {
    if (params.id) {
      const tourPackageFinded =
      tourPackages.find((tourPackage) => tourPackage._id === params.id) || {};
      // console.log('tourPackageFinded::: ', tourPackageFinded);
      // console.log("tourPackageFinded::: ", tourPackageFinded);
      // setTourPackage(tourPackageFinded);
      console.log("tourPackageFinded::: ", tourPackageFinded);
      setTourTypes(tourPackageFinded.tourTypes);
      // showTourTypesCards(tourPackageFinded)
    }
  };
  
  // const showTourTypes = () => {
  //   return (
  //     <div {...stylex.props(styles.cardsContainer())}>
  //       {tourTypes && tourTypes.length > 0 ? (
  //         tourTypes.map((tourType, index) => (
  //           <TourTypeCard key={index} tourType={tourType} />
  //         ))
  //       ) : (
  //         <h1>No tourTypes found</h1>
  //       )}
  //     </div>
  //   );
  // };

  const showTourTypes = () => {
    return (
      <div {...stylex.props(styles.cardsContainer())}>
        {tourPackageTourTypes && tourPackageTourTypes.length > 0 ? (
          tourPackageTourTypes.map((tourType, index) => (
            <TourTypeCard key={index} tourType={tourType} />
          ))
        ) : (
          <h1>No tourTypes found</h1>
        )}
      </div>
    );
  };
  
  
  // console.log('tourPackageTourTypes::: ', tourPackageTourTypes);
  return (
    <div {...stylex.props(styles.base())}>
      {tourTypes && tourTypes.length > 0 ? (
        <div>{showTourTypes()}</div>
      ) : (
        <div {...stylex.props(styles.cardsContainer())}>
          <div {...stylex.props(styles.titleContainer())}>
            <label htmlFor="title">No hay tours registrados</label>
          </div>
        </div>
      )}
      {/* <div {...stylex.props(styles.buttonContainer())}>
        <button
          type="button"
          onClick={() => navigate("nuevo")}
          {...stylex.props(styles.buttonStyle())}
        >
          Agregar tour
        </button>
      </div> */}
    </div>
  );
}
export default TourTypeCardsContainer;
