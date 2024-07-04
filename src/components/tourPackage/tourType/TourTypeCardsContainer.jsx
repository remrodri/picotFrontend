import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { useTourPackages } from "../../../context/tourPackage/TourPackageProvider";
// import CardsContainer from "../../Personal/CardsContainer";

const styles = stylex.create({
  base: () => ({
    height: "100%",
  }),
  cardsContainer: () => ({
    height: "calc(100% - 4rem)",
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
  const navigate = useNavigate();
  const params = useParams();
  const { tourPackages } = useTourPackages();
  // const [tourPackage, setTourPackage] = useState({});
  const [tourTypes, setTourTypes] = useState([]);

  const loadTourPackage = () => {
    if (params.id) {
      const tourPackageFinded =
        tourPackages.find((tourPackage) => tourPackage._id === params.id) || {};
      // console.log('tourPackageFinded::: ', tourPackageFinded);
      // console.log("tourPackageFinded::: ", tourPackageFinded);
      // setTourPackage(tourPackageFinded);
      setTourTypes(tourPackageFinded.tourTypes);
    }
  };

  useEffect(() => {
    loadTourPackage();
    // console.log("params::: ", params);
  }, [tourPackages]);

  return (
    <div {...stylex.props(styles.base())}>
      {tourTypes && tourTypes.length > 0 ? (
        <div {...stylex.props(styles.cardsContainer())}>aqui van los cards</div>
      ) : (
        <div {...stylex.props(styles.cardsContainer())}>
          <div {...stylex.props(styles.titleContainer())}>
            <label htmlFor="title">No hay tours registrados</label>
          </div>
        </div>
      )}
      <div {...stylex.props(styles.buttonContainer())}>
        <button
          type="button"
          onClick={() => navigate("nuevo")}
          {...stylex.props(styles.buttonStyle())}
        >
          Agregar tour
        </button>
      </div>
    </div>
  );
}
export default TourTypeCardsContainer;
