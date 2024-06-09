import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function updatePasswordRequest(id, body) {
  try {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // } else {
    //   console.error("No se encontro en token en localStorage");
    // }
    const response = await axios.patch(
      `${apiUrl}/api/v1/passwords/${id}`,
      body
    );
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error en la actualizacion de usario: ", error.message);
  }
}
export { updatePasswordRequest };
