/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    height: "5rem",
    color: "aliceblue",
    fontSize: "1.3rem",
    background: {
      default: "rgba(255, 255, 255, 0.2)",
    },
    backdropFilter: "1rem",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    padding: "2rem",
    borderRadius: "0.5rem",
    justifyContent: "space-evenly",
  }),
  labelContainer: (myWidth) => ({
    width: myWidth,
    textAlign: "center",
  }),
});

function RecordCard({ record }) {
  //console.log("record::: ", record);

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.labelContainer("10rem"))}>
        <label htmlFor="">{record.eventType}</label>
      </div>
      <div {...stylex.props(styles.labelContainer("13rem"))}>
        <label htmlFor="">
          {record.createAt.split("T")[0].split("-")[1]} /
          {record.createAt.split("T")[0].split("-")[2]} /
          {record.createAt.split("T")[0].split("-")[0]}
        </label>
      </div>
      <div {...stylex.props(styles.labelContainer("10rem"))}>
        <label htmlFor="">
          {record.createAt.split("T")[1].split(":")[0]}:
          {record.createAt.split("T")[1].split(":")[1]}:
          {record.createAt.split("T")[1].split(":")[2].split(".")[0]}
        </label>
      </div>
      <div {...stylex.props(styles.labelContainer("30rem"))}>
        <label htmlFor="">
          { record.user?`${record.user.firstName} ${record.user.lastName}`:""}

        </label>
      </div>
    </div>
  );
}
export default RecordCard;
