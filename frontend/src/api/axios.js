import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL);

const API = axios.create({
  //baseURL: "http://localhost:5000"
  baseURL:"https://hously-sql-task.onrender.com",
  //baseURL: import.meta.env.VITE_API_URL
  
});

// Add token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;





