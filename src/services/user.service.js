import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  get = (userId) => {
    return this.api.get(`/user/${userId}`);
  };

  put = (userId, requestBody) => {
    return this.api.put(`/user/${userId}`, requestBody);
  };
}
const userService = new UserService();

export default userService;
