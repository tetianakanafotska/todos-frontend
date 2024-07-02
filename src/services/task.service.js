import axios from "axios";

class TaskService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });
  }

  get = (requestBody) => {
    return this.api.get("/tasks", requestBody);
  };

  getByType = (taskType) => {
    return this.api.get(`tasks/${taskType}`);
  };

  post = (requestBody) => {
    return this.api.post("/tasks", requestBody);
  };

  put = (id, requestBody) => {
    return this.api.put(`/tasks/${id}`, requestBody);
  };

  delete = (id) => {
    return this.api.delete(`/tasks/${id}`);
  };
}
const taskService = new TaskService();

export default taskService;
