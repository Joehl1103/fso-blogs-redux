import axios from "axios";

const getUsers = async () => {
  const request = axios.get(`${import.meta.env.VITE_API_BASE_URL ?? ""}/api/users`);
  return request.then((response) => response.data);
};

export default { getUsers };
