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
    console.log("📤 Sending request to:", config.url, "with token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
  try {
    const res = await api.post("/auth/login", userData);

    // Debugging logs
    console.log("🔑 Login response data:", res.data);
    console.log("🔑 acces_token received:", res.data.acces_token);
    console.log("🔑 user received:", res.data.user);

    if (res.data.acces_token) {
      localStorage.setItem("token", res.data.acces_token);
      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
      console.log("✅ Token & User saved in localStorage");
    } else {
      console.warn("⚠️ No acces_token found in response");
    }

    return res.data;
  } catch (err) {
    console.error("❌ Login request failed:", err.response?.data || err.message);
    throw err;
  }
},


  update: async (formData) => {
    const res = await api.post("/auth/profileupdate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
  forgetpassword : async (email) => {
     const res = await api.post("/auth/forgetpassword", {email})
     return res.data;
  },
  resetpassword : async (randomString,email,password) => {
    const res = await api.post(`/auth/resetpassword/${randomString}?email=${email}`, {password})
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
