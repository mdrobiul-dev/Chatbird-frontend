import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authServices = {
  registration: async (userData) => {
    const res = await api.post("/auth/registration", userData);
    return res.data;
  },
  emailvariefication: async (email, otp) => {
    const res = await api.post("/auth/emailvariefication", { email, otp });
    return res.data;
  },
  resentOtp: async (email) => {
    const res = await api.post("/auth/resentotp", { email });
    return res.data;
  },
  login: async (userData) => {
    const res = await api.post("/auth/login", userData);
    console.log(res.data)
    return res.data
  }
};
