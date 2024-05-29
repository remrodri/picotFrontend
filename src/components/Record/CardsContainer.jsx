/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useRecords } from "../../context/record/RecordProvider";
import RecordCard from "./RecordCard";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "1rem",
    paddingTop: "1rem",
    paddingRight: "1rem",
    gap: "1rem",
  }),
  labelsContainer: () => ({
    paddingLeft: "2rem",
    paddingRight: "2rem",
    color: "aliceBlue",
    fontSize: "1.3rem",
    display: "flex",
    justifyContent: "space-evenly",
  }),
  labelContainer: (newWidth) => ({
    width: newWidth,
    textAlign: "center",
  }),
});

function CardsContainer({ filteredRecords, handleRecords,users }) {
  // const { users } = useUsers();
  const { records } = useRecords();

  useEffect(() => {
    handleRecords();
    addUserToRecord();
    console.log('::: ', records);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records,users]);

  const addUserToRecord = () => {
    const recordsWithUser = filteredRecords.map((record) => {
      const user = users.find((user) => user._id === record.userId);
      const recordWithName = { ...record, user };
      return recordWithName;
    });
    return recordsWithUser;
  };
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.labelsContainer())}>
        <div {...stylex.props(styles.labelContainer("10rem"))}>
          <label htmlFor="">Actividad</label>
        </div>
        <div {...stylex.props(styles.labelContainer("13rem"))}>
          <label htmlFor="">Fecha</label>
        </div>
        <div {...stylex.props(styles.labelContainer("10rem"))}>
          <label htmlFor="">Hora</label>
        </div>
        <div {...stylex.props(styles.labelContainer("30rem"))}>
          <label htmlFor="">Nombre</label>
        </div>
      </div>
      {addUserToRecord().map((record) => {
        return <RecordCard key={record._id} record={record} />;
      })}
    </div>
  );
}
export default CardsContainer;
