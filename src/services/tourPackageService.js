import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getAllTourPackagesRequest() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro el token en el localStorage");
    }
    const response = await axios.get(`${apiUrl}/api/v1/tour-packages`);
    if (response.status === 200) {
      return { success: true, tourPackages: response.data };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error al recuperar los tourPackages: ", error.message);
  }
}

async function createTourPackageRequest(body) {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("No se encontro el token en el localStorage");
    }
    const response = await axios.post(`${apiUrl}/api/v1/tour-packages`, body);
    if (response.status === 201) {
      console.log('response.data::: ', response.data);
      return { success: true,  tourPackageId: response.data._id };
    }
  } catch (error) {
    console.error("Error al crear el tourPackage: ", error.message);
    return { success: false };
  }
}

export { getAllTourPackagesRequest, createTourPackageRequest };
