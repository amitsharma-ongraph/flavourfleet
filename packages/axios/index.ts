import _axios from "axios";

export const axios = _axios.create({
  baseURL: process.env.BASE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
