import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getAllTourPackagesRequest() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer${token}`;
    } else {
      console.error("No se encontro el token en el localStorage");
    }
    const response = await axios.get(`${apiUrl}/api/v1/tour-packages`);
    if (response.status === 200) {
      return { succes: true, tourPackages: response.data };
    } else {
      return { succes: false };
    }
  } catch (error) {
    console.error("Error al recuperar los tourPackages: ", error.message);
  }
}

export { getAllTourPackagesRequest };
