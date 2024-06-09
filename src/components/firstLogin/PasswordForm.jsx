import * as stylex from "@stylexjs/stylex";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUsers } from "../../context/user/UserProvider";
import useAuth from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

const styles = stylex.create({
  base: () => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    
  }),

  passwordContainer: () => ({
    display: "flex",
    flexDirection: "column",
    height: "9rem",
    width: "50rem",
    // alignItems: "center",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    justifyContent: "center",
    gap: "1rem",
  }),
  labelStyle: () => ({
    fontSize: "1.3rem",
  }),
  fieldStyle: () => ({
    width: "100%",
    height: "3rem",
    borderRadius: "0.5rem",
    border: "none",
    paddingLeft: "1rem",
  }),
  buttonContainer: () => ({
    height: "9rem",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2.7rem 3rem 2.7rem 3rem",
  }),
  buttonStyle: () => ({
    width: "100%",
    height: "100%",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    background: "rgb(0, 127, 255)",
    color: "aliceblue",
    fontFamily: "Poppins",
    fontSize: "1.5rem",
  }),
});

function PasswordForm() {
  const navigate = useNavigate();
  const { decodeTokenUserId } = useAuth();
  const { updateUser } = useUsers();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("La contraseña es requerida"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("values::: ", values);
      const valuesWithFirstLogin = {password:values.password,firstLogin:false}
      console.log('valuesWithFirstLogin::: ', valuesWithFirstLogin);
      const userId = decodeTokenUserId();
      console.log("userId::: ", userId);
      // const response = await updateUser(userId, valuesWithFirstLogin);
      const response = await updateUser(userId, valuesWithFirstLogin);
      console.log('response::: ', response);
      if (response.success) {
        navigate(`/configuracion-inicial/respuestas`);
      }
    } catch (error) {
      console.error("Error en la actualizacion de password: ", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div {...stylex.props(styles.base())}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div {...stylex.props(styles.passwordContainer())}>
              <label htmlFor="password" {...stylex.props(styles.labelStyle())}>
                Contrasena
              </label>
              <Field
                {...stylex.props(styles.fieldStyle())}
                type="password"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <div {...stylex.props(styles.passwordContainer())}>
              <label
                htmlFor="confirmPassword"
                {...stylex.props(styles.labelStyle())}
              >
                Confirmar Contrasena
              </label>
              <Field
                {...stylex.props(styles.fieldStyle())}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <div {...stylex.props(styles.buttonContainer())}>
              <button
                type="submit"
                disabled={isSubmitting}
                {...stylex.props(styles.buttonStyle())}
              >
                Siguiente
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default PasswordForm;
