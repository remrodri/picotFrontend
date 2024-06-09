import * as stylex from "@stylexjs/stylex";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useUsers } from "../../context/user/UserProvider";
import useAuth from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

const styles = stylex.create({
  base: () => ({
    height: "20rem",
    width: "40rem",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "1rem",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "1rem",
    color: "aliceblue",
    display: "flex",
    flexDirection: "column",
  }),
  informationLabelContainer: () => ({
    height: "20%",
    width: "100%",
    fontSize: "1.6rem",
    alignContent: "center",
    textAlign: "center",
  }),
  fieldContainer: () => ({
    height: "32%",
    display: "flex",
    flexDirection: "column",
    padding: "0 1rem 0 1rem",
  }),
  labelFieldStyle: () => ({
    fontSize: "1.3rem",
  }),
  fieldStyle: () => ({
    height: "2.1rem",
    borderRadius: "0.5rem",
    border: "none",
    paddingLeft: "1rem",
  }),
  buttonContainer: () => ({
    width: "100%",
    padding: "0 1rem 0 1rem",
    flexGrow: 1,
  }),
  buttonStyle: () => ({
    height: "100%",
    width: "100%",
    borderRadius: "0.5rem",
    border: "none",
    background: {
      default: "rgb(0, 127, 255)",
      ":hover": "rgb(0, 110, 255)",
    },
    color: "aliceblue",
    fontFamily: "Poppins",
    cursor: "pointer",
  }),
});

function SetPasswordForm() {
  const navigate = useNavigate();
  const { updateUser } = useUsers();
  const { decodeTokenUserId } = useAuth();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "la contraseña debe tener al menos 6 caracteres")
      .required("requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "las contraseñas no coinciden")
      .required("requerido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // console.log("values::: ", values);
      const userId = decodeTokenUserId();
      // console.log('userId::: ', userId);
      const response = await updateUser(userId, { password: values.password });
      console.log("response::: ", response);
      if (response.success) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("No se pudo restablecer la nueva contraseña");
      }
      // console.log("response::: ", response);
    } catch (error) {
      console.error("Error al establecer la nueva contraseña");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form {...stylex.props(styles.base())}>
            <div {...stylex.props(styles.informationLabelContainer())}>
              <label htmlFor="information">Escribe la nueva Contraseña: </label>
            </div>
            <div {...stylex.props(styles.fieldContainer())}>
              <label
                htmlFor="password"
                {...stylex.props(styles.labelFieldStyle())}
              >
                Contraseña:
              </label>
              <Field
                type="password"
                name="password"
                {...stylex.props(styles.fieldStyle())}
              />
              <ErrorMessage name="password" component={"div"} />
            </div>
            <div {...stylex.props(styles.fieldContainer())}>
              <label
                htmlFor="confirmPassword"
                {...stylex.props(styles.labelFieldStyle())}
              >
                Confirma la contraseña:
              </label>
              <Field
                type="password"
                name="confirmPassword"
                {...stylex.props(styles.fieldStyle())}
              />
              <ErrorMessage name="confirmPassword" component={"div"} />
            </div>
            <div {...stylex.props(styles.buttonContainer())}>
              <button
                type="submit"
                disabled={isSubmitting}
                {...stylex.props(styles.buttonStyle())}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default SetPasswordForm;
