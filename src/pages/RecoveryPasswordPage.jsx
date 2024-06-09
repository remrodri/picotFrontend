import * as stylex from "@stylexjs/stylex";
import backgroundImage from "../assets/images/loginBackground2.jpg";
import { Outlet } from "react-router-dom";

const styles = stylex.create({
  base: () => ({
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
});

function RecoveryPasswordPage() {
  return (
    <div {...stylex.props(styles.base())}>
      <Outlet />
    </div>
  );
}
export default RecoveryPasswordPage;
