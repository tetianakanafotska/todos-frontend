import axios from "axios";

class UploadService {
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

  uploadImage = (formData) => {
    return this.api.post("/images/upload", formData);
  };
}
const uploadService = new UploadService();

export default uploadService;
