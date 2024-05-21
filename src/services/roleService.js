import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

async function getRolesRequest() {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/roles`);
    return response.data;
  } catch (error) {
    throw new Error(`Error mientras se obtienen los roles: ${error.message}`);
  }
}

export {
  getRolesRequest
}