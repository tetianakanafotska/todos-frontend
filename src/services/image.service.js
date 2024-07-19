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

  upload = (formData) => {
    return this.api.post("/image/upload", formData);
  };

  delete = (publicId) => {
    const name = publicId.split("/").pop();
    return this.api.delete(`/image/${name}`);
  };
}
const imageService = new ImageService();

export default imageService;
