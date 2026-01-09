import axios from "axios";

const login = async (credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL ?? ""}/api/login`,
    credentials,
  );
  return response.data;
};

export default { login };
