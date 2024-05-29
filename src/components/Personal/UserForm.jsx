import * as stylex from "@stylexjs/stylex";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRoles } from "../../context/role/RoleProvider";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUsers } from "../../context/user/UserProvider";
import { useCallback, useEffect, useMemo, useState } from "react";

const styles = stylex.create({
  base: () => ({
    height: "100%",
    width: "100%",
    //background: "rgba(255, 255, 255, 0.2)",
    borderBottomRightRadius: "1rem",
    //border: "1px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //overflowY:"auto",
    padding: "1rem 0 1rem 0",
  }),
  mainContainer: () => ({
    width: "45rem",
    height: "55rem",
    background: "rgba(255, 255, 255, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    color: "#fafafa",
    //justifyContent:"center"
  }),
  labelTittleContainer: () => ({
    height: "8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  labelTittleStyle: () => ({
    fontSize: "1.5rem",
  }),
  formContainer: () => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //justifyContent:"center"
  }),
  fieldContainer: () => ({
    height: "6rem",
    width: "30rem",
    display: "flex",
    flexDirection: "column",
  }),
  labelFieldStyle: () => ({
    fontSize: "1.3rem",
  }),
  fieldStyle: () => ({
    height: "2.8rem",
    borderRadius: "0.7rem",
    border: "none",
    paddingLeft: "1rem",
    fontFamily: "Poppins",
  }),
  buttonContainer: () => ({
    height: "6rem",
    width: "30rem",
    borderRadius: "0.7rem",
    border: "none",
    display: "flex",
    alignItems: "flex-end",
  }),
  buttonStyle: () => ({
    height: "3.5rem",
    width: "100%",
    borderRadius: "0.7rem",
    border: "none",
    fontFamily: "Poppins",
    background: {
      default: "rgb(51, 153, 255)",
      ":hover": "rgb(0, 128, 255)",
    },
    cursor: "pointer",
  }),
  errorStyle: () => ({
    color: "rgb(147, 17, 44)",
  }),
  swalContainer: () => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    fontWeight: "500",
  }),
  swalLabelStyle: () => ({
    textAlign: "start",
    fontSize: "1.3rem",
    fontWeight: "500",
  }),
  swalButtonStyle: () => ({
    width: "7rem",
    fontFamily: "Poppins",
    fontSize: "1.3rem",
  }),
});

const MySwal = withReactContent(Swal);

function UserForm() {
  const [formValues, setFormValues] = useState(null);
  const { roles } = useRoles();
  const { users, createUser, updateUser } = useUsers();
  const navigate = useNavigate();
  const params = useParams();
  const initialValues = useMemo(() => (
    {
      firstName: "",
      lastName: "",
      roleId: "",
      phone: "",
      email: "",
      ci: "",
    }), []
  )
  
  
    const loadUser = useCallback(() => {
        if (params.id) {
          const userFinded = users.find((user) => user._id === params.id);
          //console.log("userFinded::: ", userFinded);
          if (userFinded) {
            setFormValues({
              firstName: userFinded.firstName || "",
              lastName: userFinded.lastName || "",
              roleId: userFinded.roleId || "",
              phone: userFinded.phone || "",
              email: userFinded.email || "",
              ci: userFinded.ci || "",
            });
          } else {
            setFormValues(initialValues);
          }
        } else {
          setFormValues(initialValues);
        }
    },[params.id,users,initialValues])

  useEffect(() => {
    loadUser();
    console.log('form::: ', );
  }, [users, params.id, loadUser]);

  function filteredRoles() {
    return roles && roles.filter((role) => role.roleName !== "administrador");
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    roleId: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    ci: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const roleName = roles.find((role) => role._id === values.roleId).roleName;
    // console.log('roleName::: ', roleName);
    MySwal.fire({
      title: <label>Los siguientes datos seran registrados:</label>,
      html: (
        <div {...stylex.props(styles.swalContainer())}>
          <label {...stylex.props(styles.swalLabelStyle())}>Nombre(s):</label>
          <label htmlFor="">{values.firstName}</label>
          <label {...stylex.props(styles.swalLabelStyle())}>
            Apellidos(s):
          </label>
          <label htmlFor="">{values.lastName}</label>
          <label {...stylex.props(styles.swalLabelStyle())}>Celular:</label>
          <label htmlFor="">{values.phone}</label>
          <label {...stylex.props(styles.swalLabelStyle())}>Email:</label>
          <label htmlFor="">{values.email}</label>
          <label {...stylex.props(styles.swalLabelStyle())}>CI:</label>
          <label htmlFor="">{values.ci}</label>
          <label {...stylex.props(styles.swalLabelStyle())}>Rol:</label>
          <label htmlFor="">{roleName}</label>
        </div>
      ),
      showCancelButton: true,
      cancelButtonText: (
        <p {...stylex.props(styles.swalButtonStyle())}>Cancelar</p>
      ),
      confirmButtonText: (
        <p {...stylex.props(styles.swalButtonStyle())}>
          {params.id ? "Actualizar" : "Registrar"}
        </p>
      ),
      confirmButtonColor: "rgb(51, 153, 255)",
      preConfirm: async () => {
        try {
          //console.log("regitrar", values);
          const response = params.id
            ? await updateUser(params.id, values)
            : await createUser(values);
          // console.log("response::: ", response);
          if (response.success) {
            //console.log("se registro::: ");
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: params.id
                ? "Se actualizo Exitosamente"
                : "Se registro Exitosamente",
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
          navigate("/administrador/personal");
        }
      },
    });
  };

  if (formValues === null) {
    return null;
  }
  //console.log("formvalues", formValues);
  return (
    <div {...stylex.props(styles.base())}>
      <div {...stylex.props(styles.mainContainer())}>
        <div {...stylex.props(styles.labelTittleContainer())}>
          <label htmlFor="" {...stylex.props(styles.labelTittleStyle())}>
            {params.id
              ? "Formulario de actualizacion de datos"
              : "Formulario de registro de datos"}
          </label>
        </div>
        <Formik
          initialValues={params.id ? formValues : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting }) => (
            <Form {...stylex.props(styles.formContainer())}>
              <div {...stylex.props(styles.fieldContainer())}>
                <label
                  htmlFor="name"
                  {...stylex.props(styles.labelFieldStyle())}
                >
                  Nombre(s):
                </label>
                <Field
                  type="text"
                  name="firstName"
                  // value={formValues.firstName}
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage
                  name="firstName"
                  component={"div"}
                  {...stylex.props(styles.errorStyle())}
                />
              </div>
              <div {...stylex.props(styles.fieldContainer())}>
                <label
                  htmlFor="lastName"
                  {...stylex.props(styles.labelFieldStyle())}
                >
                  Apellido(s):
                </label>
                <Field
                  type="text"
                  name="lastName"
                  // value={formValues.lastName}
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage
                  name="lastName"
                  component={"div"}
                  {...stylex.props(styles.errorStyle())}
                />
              </div>
              <div {...stylex.props(styles.fieldContainer())}>
                <label
                  htmlFor="roleId"
                  {...stylex.props(styles.labelFieldStyle())}
                >
                  Rol:
                </label>
                <Field
                  as="select"
                  name="roleId"
                  // value={formValues.roleId}
                  {...stylex.props(styles.fieldStyle())}
                >
                  <option value={""}> Seleccione un rol...</option>
                  {filteredRoles().map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.roleName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="roleId"
                  component={"div"}
                  {...stylex.props(styles.errorStyle())}
                />
              </div>
              <div {...stylex.props(styles.fieldContainer())}>
                <label
                  htmlFor="phone"
                  {...stylex.props(styles.labelFieldStyle())}
                >
                  Celular:
                </label>
                <Field
                  type="text"
                  name="phone"
                  // value={formValues.phone}
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage
                  name="phone"
                  component={"div"}
                  {...stylex.props(styles.errorStyle())}
                />
              </div>
              <div {...stylex.props(styles.fieldContainer())}>
                <label htmlFor="ci" {...stylex.props(styles.labelFieldStyle())}>
                  ci:
                </label>
                <Field
                  type="text"
                  name="ci"
                  // value={formValues.ci}
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage
                  name="ci"
                  component={"div"}
                  {...stylex.props(styles.errorStyle())}
                />
              </div>
              <div {...stylex.props(styles.fieldContainer())}>
                <label
                  htmlFor="email"
                  {...stylex.props(styles.labelFieldStyle())}
                >
                  Correo electronico:
                </label>
                <Field
                  type="email"
                  name="email"
                  // value={formValues.email}
                  {...stylex.props(styles.fieldStyle())}
                />
                <ErrorMessage
                  name="email"
                  component={"div"}
                  {...stylex.props(styles.errorStyle())}
                />
              </div>
              <div {...stylex.props(styles.buttonContainer())}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  {...stylex.props(styles.buttonStyle())}
                >
                  {isSubmitting ? "Cargando..." : "Confirmar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default UserForm;
