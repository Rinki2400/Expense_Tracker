// import axios from "axios";

// // Detect environment and set base URL
// const API = axios.create({
//   baseURL:
//     window.location.hostname === "localhost"
//       ? "http://localhost:2000/api" // Local backend
//       : "https://expense-tracker-4wi0.onrender.com/api",
// });

// // Automatically attach token from localStorage
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


// //
// // =================== AUTH ===================
// //

// // Register User
// export const registerUser = async (formData) => {
//   const response = await API.post("/auth/register", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

// // Login User
// export const loginUser = async ({ email, password }) => {
//   const response = await API.post("/auth/login", { email, password });
//   return response.data;
// };

// // Get User by ID
// export const getUserById = async (id) => {
//   const response = await API.get(`/auth/getUser/${id}`);
//   return response.data;
// };

// //
// // =================== DASHBOARD ===================
// //

// // Get Dashboard Data
// export const getData = async () => {
//   const response = await API.get("/dashboard/");
//   return response.data;
// };

// //
// // =================== INCOME ===================
// //

// // Add Income
// export const addIncome = async (formData) => {
//   const response = await API.post("/income/add", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

// // Get All Income
// export const getAllIncome = async () => {
//   const response = await API.get("/income/get");
//   return response.data;
// };

// // Delete Income
// export const deleteIncome = async (id) => {
//   const response = await API.delete(`/income/${id}`);
//   return response.data;
// };

// export const downloadIncomeExcel = async () => {
//   const response = await API.get("/income/download", {
//     responseType: "blob",
//   });
//   const url = window.URL.createObjectURL(new Blob([response.data]));
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "incomes.details.xlsx");
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// //
// // =================== EXPENSE ===================
// //

// // Add Expense
// export const addExpense = async (formData) => {
//   const response = await API.post("/expense/add", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

// // Get All Expense
// export const getAllExpense = async () => {
//   const response = await API.get("/expense/get");
//   return response.data;
// };

// // Delete Expense
// export const deleteExpense = async (id) => {
//   const response = await API.delete(`/expense/${id}`);
//   return response.data;
// };

// export const downloadExpenseExcel = async () => {
//   const response = await API.get("/expense/download", {
//     responseType: "blob",
//   });

//   const url = window.URL.createObjectURL(new Blob([response.data]));
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", "expenseExcel.xlsx");
//   document.body.appendChild(link);
//   link.click();
//  document.body.removeChild(link);
// };


// export default API;


import axios from "axios";

// Detect environment and set base URL
const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:2000/api" // Local backend
      : "https://expense-tracker-4wi0.onrender.com/api", // Render backend
      
  
  
  withCredentials: true, // ✅ required for Vercel + Render cookie/token exchange
});

// ✅ Automatically attach token from localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//
// =================== AUTH ===================
//

// Register User
export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Login User
export const loginUser = async ({ email, password }) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

// Get User by ID
export const getUserById = async (id) => {
  const response = await API.get(`/auth/getUser/${id}`);
  return response.data;
};

//
// =================== DASHBOARD ===================
//

export const getData = async () => {
  const response = await API.get("/dashboard/");
  return response.data;
};

//
// =================== INCOME ===================
//

export const addIncome = async (formData) => {
  const response = await API.post("/income/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllIncome = async () => {
  const response = await API.get("/income/get");
  return response.data;
};

export const deleteIncome = async (id) => {
  const response = await API.delete(`/income/${id}`);
  return response.data;
};

export const downloadIncomeExcel = async () => {
  const response = await API.get("/income/download", { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "incomes.details.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

//
// =================== EXPENSE ===================
//

export const addExpense = async (formData) => {
  const response = await API.post("/expense/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllExpense = async () => {
  const response = await API.get("/expense/get");
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await API.delete(`/expense/${id}`);
  return response.data;
};

export const downloadExpenseExcel = async () => {
  const response = await API.get("/expense/download", { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "expenseExcel.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default API;
