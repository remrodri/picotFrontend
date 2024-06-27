import { useEffect, useState } from "react";
import { useTourPackages } from "../../context/tourPackage/TourPackageProvider";
import * as stylex from "@stylexjs/stylex";
import TourPackageCard from "./TourPackageCard";

const styles = stylex.create({
  base: () => ({
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }),
  topContainer: () => ({
    height: "6rem",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    alignContent: "center",
    paddingLeft: "1rem",
  }),
  bottomContainer: () => ({
    height: "100%",
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderBottomRightRadius: "0.5rem",
    padding: "1rem",
    display: "flex",
    gap: "1rem",
    alignContent: "flex-start",
    flexFlow: "row wrap",
    overflowY:"auto"
  }),
});

function TourPackageCards() {
  const { tourPackages } = useTourPackages();
  const [filteredTourPackages, setFilteredTourPackages] = useState([]);
  console.log("tourPackages::: ", tourPackages);

  useEffect(() => {
    filterTourPackages("all");
  }, [tourPackages]);

  const handleSelectChange = (event) => {
    const option = event.target.value;
    console.log("option::: ", option);
    filterTourPackages(option);
  };
  const filterTourPackages = (option) => {
    if (option === "all") {
      setFilteredTourPackages(tourPackages);
    } else {
      setFilteredTourPackages(
        tourPackages.filter((tourPackage) => tourPackage.status === option)
      );
    }
  };

  const showTourPackages = () => {
    return filteredTourPackages.map((tourPackage) => (
      <TourPackageCard key={tourPackage._id} tourPackage={tourPackage} />
    ));
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.topContainer())}>
        <label htmlFor="filter">Filtrar por disponibilidad</label>
        <select
          id="tourPackageFilter"
          defaultValue={"all"}
          onChange={handleSelectChange}
        >
          <option value="all">Todos</option>
          <option value="available">Disponibles</option>
          <option value="unavailable">No disponibles</option>
        </select>
      </div>
      <div {...stylex.props(styles.bottomContainer())}>
        {showTourPackages()}
      </div>
    </div>
  );
}
export default TourPackageCards;
