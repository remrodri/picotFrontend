import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    fontSize:"1.2rem",
    color: "aliceblue",
  }),
});

function FilterByDate(props) {
  // eslint-disable-next-line react/prop-types
  const { startDate, endDate, setStartDate, setEndDate } = props;

  const handleStartDateChange = (event) => {
    //console.log('event::: ', event);
    setStartDate(event);
  };
  const handleEndDateChange = (event) => {
    // console.log('event::: ', event);
    setEndDate(event);
  };

  // const today = new Date().toISOString().split("T")[0];
  // console.log('today::: ', today);
  // console.log('new Date::: ', new Date);
  const date = new Date();
  const year = date.getFullYear();
  // console.log('year::: ', year);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  // console.log('month::: ', month);
  const day = String(date.getDate()).padStart(2, "0");
  // console.log('day::: ', day);
  const today = `${year}-${month}-${day}`;
  // console.log('today::: ', today);

  return (
    <div {...stylex.props(styles.base())}>
      por rango de fechas:
      <div>
        <input
          type="date"
          name=""
          id=""
          value={startDate}
          max={today}
          onChange={(e) => handleStartDateChange(e.target.value)}
        />
        <span> - </span>
        <input
          type="date"
          name=""
          id=""
          value={endDate}
          max={today}
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
      </div>
    </div>
  );
}
export default FilterByDate;
