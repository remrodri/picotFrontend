import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getAllRecordsRequest() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro token en localStorage");
    }
    const response = await axios.get(`${apiUrl}/api/v1/records`);
    if (response.status === 200) {
      return { success: true, records: response.data };
    } else {
      // console.error("Error al obtener los registros: ");
      return { success: false, records: [] };
    }
  } catch (error) {
    console.error("ocurrio un error al obtener los users: ", error.message);
  }
}

export { getAllRecordsRequest };
