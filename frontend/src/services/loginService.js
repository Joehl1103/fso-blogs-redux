import axios from "axios";

const login = async (credentials) => {
  console.log('credentials in login service', credentials)
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL ?? ""}/api/login`,
    credentials,
  );
  return response.data;
};

export default { login };
