import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

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
    if (res.data.acces_token) {
      localStorage.setItem("token", res.data.acces_token);
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
    }
    return res.data;
  },
  update : async (fullName, password) => {
    const res = await api.post("/auth/profileupdate", {fullName, password})
    return res.data
  }
};

export const chatServices = {
  conversationList: async () => {
    const res = await api.get("/chat/conversationlist");
    return res.data;
  },
  createconversation: async (participantemail) => {
    const res = await api.post("/chat/createconversation", {
      participantemail,
    });
    return res.data;
  },
  getMessages: async (conversationID) => {
    const res = await api.get(`/chat/getmessage/${conversationID}`);
    return res.data;
  },
  sendMessage: async (data) => {
    const { reciverId, content, conversationId } = data;
    const res = await api.post("/chat/sendmessage", {
      reciverId,
      content,
      conversationId,
    });
    return res.data;
  },
};
