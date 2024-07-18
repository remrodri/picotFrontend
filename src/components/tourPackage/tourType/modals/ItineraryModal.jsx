/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: () => ({
    fontSize:"1.3rem"
  }),
  dayActivityStyle: () => ({
    display: "flex",
    alignItems: "center",
  }),
});

function ItineraryModal({ itinerary }) {
  // console.log("itinerary::: ", itinerary);

  return (
    <div {...stylex.props(styles.base())}>
      {itinerary.map((day, index) => (
        <div key={index}>
          <label htmlFor="name">{`Dia ${index + 1}`}</label>
          <ul>
            {day.activities.map((activity, index) => (
              <li
                key={index}
                {...stylex.props(styles.dayActivityStyle())}
              >{`${activity.hour}: ${activity.activity}`}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
export default ItineraryModal;
