// API => communicate with backend
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log("REGISTER ERROR:", err.response?.data || err.message);
    throw err;
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data || err.message);
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (err) {
    console.log("GET ME ERROR:", err.response?.data || err.message);
    throw err;
  }
}

export async function logout() {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (err) {
    console.log("LOGOUT ERROR:", err.response?.data || err.message);
    throw err;
  }
}

