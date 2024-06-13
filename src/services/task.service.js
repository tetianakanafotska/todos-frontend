import axios from "axios";

class TasksService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });
  }

  get = (requestBody) => {
    return this.api.get("/tasks", requestBody);
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
const tasksService = new TasksService();

export default tasksService;
