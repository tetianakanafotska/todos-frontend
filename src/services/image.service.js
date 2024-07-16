import axios from "axios";

class ImageService {
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

  getURL = (publicId) => {
    return this.api.get(`/image/${publicId}`);
  };

  upload = (formData) => {
    return this.api.post("/image/upload", formData);
  };

  resize = (publicId) => {
    return this.api.get(`/image/resize/${publicId}`);
  };
}
const imageService = new ImageService();

export default imageService;
