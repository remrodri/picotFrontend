/* eslint-disable react/prop-types */
import * as stylex from "@stylexjs/stylex";
import { AccountCircle,MoreVert } from "@mui/icons-material";

const styles = stylex.create({
  base: () => ({
    width: "40rem",
    height: "6rem",
    background: "rgb(242, 242, 242)",
    borderRadius: "0.7rem",
    display: "flex",
  }),
  iconContainer: () => ({
    height: "100%",
    width: "6rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  iconStyle: () => ({
    fontSize: "5rem",
    color: "#5e5454",
  }),
  dataInformationContainer: () => ({
    width: "30rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "0.3rem",
    paddingLeft: "1rem",
    fontSize: "1.2rem",
  }),
  secondIconContainer: () => ({
    width: "4rem",
    display: "flex",
    alignItems: "center",
  }),
  secondIconStyle: () => ({
    fontSize: "3rem",
  }),
});

function UserCard(props) {
  const { user } = props;
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.iconContainer())}>
        <AccountCircle {...stylex.props(styles.iconStyle())} />
      </div>
      <div {...stylex.props(styles.dataInformationContainer())}>
        <label htmlFor="">{user.firstName} {user.lastName}</label>
        <label htmlFor="">{user.phone}</label>
      </div>
      <div {...stylex.props(styles.secondIconContainer())}>
        <MoreVert {...stylex.props(styles.secondIconStyle())} />
      </div>
    </div>
  );
}
export default UserCard;
