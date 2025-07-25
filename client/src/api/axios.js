import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// for Auth
//for register user
export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
// for login user
export const loginUser = async ({ email, password }) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};
// get user By api
export const getUserById = async (id) => {
  const response = await API.get(`/auth/getUser/${id}`);
  return response.data;
};


//for Dashboard
//get Data
export const getData = async () => {
  const response = await API.get("/dashboard/");
  return response.data;
};

//for Income
//Add Income
export const addIncome = async (formData) => {
  const response = await API.post("/income/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
//get All Income
export const getAllIncome = async () => {
  const response = await API.get("/income/get");
  return response.data;
};
//Delete Income
export const deleteIncome = async (id) => {
  const response = await API.delete(`/income/${id}`);
  return response.data;
};
//Dowload Income
// export const downloadIncome = async (id) => {
//   const response = await API.get(`/income/download`, {
//     responseType: "blob",
//   });
//   return response.data;
// };


//for Expense
//Add Expense
export const addExpense = async (formData) => {
  const response = await API.post("/expense/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
//get All Expense
export const getAllExpense = async () => {
  const response = await API.get("/expense/get");
  return response.data; 
}
//Delete Expense
export const deleteExpense = async (id) => {
  const response = await API.delete(`/expense/${id}`);
  return response.data;
};  
//Download Expense
// export const downloadExpense = async (id) => {
//   const response = await API.get(`/expense/download/`, {
//     responseType: "blob",
//   });
//   return response.data;
// };
export default API;
