import * as stylex from "@stylexjs/stylex";
import Button from "@mui/material/Button";

const styles = stylex.create({
  base: () => ({
    background: '#252525',
    color:'antiquewhite',
  })
})
const LoginPage = () => {
  return (
    <div {...stylex.props(styles.base())}>
      Este es el login
      <div>
        return <Button variant="contained">Hello world</Button>
      </div>
    </div>
  );
};

export default LoginPage;
