import * as stylex from "@stylexjs/stylex";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import loginBackground from "../assets/images/loginBackground2.jpg";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useAuth from "../hooks/auth";
// import { Alert, Stack } from "@mui/material";

const styles = stylex.create({
  base: () => ({
    backgroundImage: `url(${loginBackground})`,
    height: "100vh",
    width: "100vw",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "aliceblue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  mainContainer: () => ({
    height: "50rem",
    width: "70rem",
    display: "flex",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "2rem",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.3)",
  }),
  rightContainer: () => ({
    height: "50rem",
    width: "35rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  formContainer: () => ({
    height: "35rem",
    width: "30rem",
    // background: "rgba(0,0,0,0.2)",
    // borderRadius: "2rem",
    // boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    // // backdropFilter: "blur(5px)",
    // border: "1px solid rgba(0,0,0,0.3)",
  }),
  showCaseContainer: () => ({
    height: "50rem",
    width: "35rem",
  }),
  formTitleContainer: () => ({
    height: "8rem",
    fontSize: "large",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  inputContainer: () => ({
    height: "6.5rem",
    width: "30rem",
    display: "flex",
    flexDirection: "column",
  }),
  inputLabelStyle: () => ({
    fontSize: "medium",
  }),
  fieldStyle: () => ({
    height: "3rem",
    fontSize: "medium",
    borderRadius: "1rem",
    paddingLeft: "1rem",
    border: "none",
  }),
  recoveryPasswordContainer: () => ({
    height: "5rem",
    fontSize: "small",
  }),
  buttonContainer: () => ({
    height: "4rem",
  }),
  buttonStyle: () => ({
    height: "4rem",
    width: "30rem",
    borderRadius: "1rem",
    // border:"1px",
    fontSize: "1.3rem",
  }),
});
function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin, decodeTokenRoleName } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await handleLogin(values);
      const roleName = decodeTokenRoleName() || "";
      console.log("roleName::: ", roleName);
      if (roleName === "administrador") {
        navigate("/administrador");
        // console.log("ir a la pagina de administrador")
      }
    } catch (error) {
      console.error("Error en el inicio de sesion".error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.mainContainer())}>
        <div {...stylex.props(styles.showCaseContainer())}>showcase</div>
        <div {...stylex.props(styles.rightContainer())}>
          <div {...stylex.props(styles.formContainer())}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div {...stylex.props(styles.formTitleContainer())}>
                    <label htmlFor="login">Iniciar Sesion</label>
                  </div>
                  <div {...stylex.props(styles.inputContainer())}>
                    <label
                      {...stylex.props(styles.inputLabelStyle())}
                      htmlFor="email"
                    >
                      Correo Electronico
                    </label>
                    <Field
                      type="email"
                      name="email"
                      {...stylex.props(styles.fieldStyle())}
                    />
                    <ErrorMessage name="email" component={"div"} />
                  </div>
                  <div {...stylex.props(styles.inputContainer())}>
                    <label
                      htmlFor="password"
                      {...stylex.props(styles.inputLabelStyle())}
                    >
                      Contraseña
                    </label>
                    <Field
                      type="password"
                      name="password"
                      {...stylex.props(styles.fieldStyle())}
                    />
                    <ErrorMessage name="password" component={"div"} />
                  </div>
                  <div {...stylex.props(styles.recoveryPasswordContainer())}>
                    <label htmlFor="">Recuperar contraseña</label>
                  </div>
                  <div {...stylex.props(styles.buttonContainer())}>
                    <Button
                      {...stylex.props(styles.buttonStyle())}
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Cargando..." : "Iniciar Sesión"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
