# Flowboard
Flowboard is a Kanban-style project management tool designed to help individuals manage tasks. It offers a simple, intuitive interface for tracking tasks across different stages of completion — from "To Do," through "In Progress," to "Done."
## Features
- **Dashboard**: Visualize all tasks across different columns based on their status.
- **Task Management**: Add, edit, and delete tasks using a simple form-based interface.
- **Persistent Storage**: Tasks are saved in the local storage to ensure data is not lost between sessions.
- **Responsive Design**: Adapt to different screen sizes for ease of use on any device.
## Technology Stack
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework that provides ready-to-use components.
- **React Router**: For navigation within the application, allowing users to bookmark and share URLs.
## Installation
To get Flowboard up and running locally, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flowboard.git
2. Install dependencies:
   ```bash
   npm i
4. Run the app:
  ```bash
   npm run dev
## Pages and Routes
- **/:** The main dashboard where tasks are displayed.
- **/about:** Information about the Flowboard application.
- **/:taskId:** Detailed view and edit interface for a specific task.
- **/addTask:** Interface to add a new task.
- ***:** Catch-all route that displays an error page for any unrecognized URLs.
## Components
- **Navbar**: Top navigation bar that remains consistent across all pages.
- **Sidebar**: Side navigation offering additional navigation options within the app.
- **Footer**: Footer content that provides additional information or links.
- **TaskList**: Displays tasks filtered by their current status.
- **TaskEditor**: Form used for detailed task editing.
- **AddTask**: Form for creating new tasks.
