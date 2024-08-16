# Todos App

## Overview

Todos is a modern task management application tailored for solo users who seek a clean, intuitive interface without unnecessary clutter. The app offers essential features such as drag-and-drop task organization, priority tagging, and secure user authentication, all wrapped in a responsive and aesthetically pleasing design.

This application is built as a full-stack MERN (MongoDB, Express, React, Node.js) app.

## Features

- **Effortless Drag and Drop:** Easily organize tasks by dragging and dropping them into different categories (To Do, In Progress, Done).
- **Priority Tags:** Quickly assign priority levels (High, Medium, Low) to tasks for better focus and organization.
- **Responsive Design:** A clean and responsive layout that works well on both desktop and mobile devices.

## Pages

- **Landing Page:** `/` - The entry point of the app, showcasing its features and inviting users to sign up or log in.
- **Dashboard:** `/dashboard` - The main task management interface, where authenticated users can manage their tasks.
- **User Profile:** `/profile` - This page allows users to manage their profile settings.
- **About:** `/about` - A public page providing information about the app.
- **Login and Signup:** `/login` and `/signup` - Public pages for user authentication.
- **Error Page:** `/*` - A fallback for undefined routes.
- **Edit Task:** `/tasks/:taskId` - Allows users to edit a specific task. Protected route for authenticated users.
- **Add Task:** `/addTask/:taskType` - Allows users to add a new task. Protected route for authenticated users.

## Project Dependencies

### Frontend Dependencies

- **React**: Core library for building the UI.
- **@mui/material**: Material UI components for design consistency.
- **@emotion/react & @emotion/styled**: CSS-in-JS for styling.
- **react-beautiful-dnd**: Drag-and-drop functionality.
- **axios**: For HTTP requests.
- **dayjs**: Date manipulation.
- **lodash**: Utility functions.
- **react-router-dom**: Routing and navigation.

### Backend Dependencies

- **axios**: For making HTTP requests.
- **bcryptjs**: For hashing passwords.
- **cloudinary**: For image uploads and management.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: For environment variable management.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: For JSON Web Token authentication.
- **morgan**: HTTP request logger middleware for Node.js.
- **multer**: Middleware for handling multipart/form-data (file uploads).
- **multer-storage-cloudinary**: Cloudinary storage engine for multer.

### Dev Dependencies

- **Vite**: Fast development build tool (Frontend).
- **ESLint**: For code linting (Frontend).
- **Sass**: CSS preprocessor for maintainable styles (Frontend).
- **mongoose**: MongoDB object modeling tool (Backend).
- **nodemon**: Automatically restart the server on code changes (Backend).

## License

This project is open-source and available under the MIT License.
