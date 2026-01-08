import axios from "axios";

const baseUrl = "/api/blogs";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.warn('LET ME KNOW WHEN LOCAL STORAGE IS BEING CLEARED')
      localStorage.removeItem('loggedinUser');

    }
    return Promise.reject(error);
  },
);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data
};

const createBlog = async (blogInfo,token) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(baseUrl, blogInfo, config);
    return response.data;
  } catch (e) {
    console.log(`Error ${e.message}`);
  }
};

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

// todo add token to every updateBlog
const updateBlog = async (blogObject, id, token) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blogObject, config);
    return response.data;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

export default { getAll, createBlog, deleteBlog, updateBlog };
