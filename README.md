# Todos App

## Overview

Todos is a modern task management application tailored for solo users who seek a clean, intuitive interface without unnecessary clutter. The app offers essential features such as drag-and-drop task organization, priority tagging, and secure JWT user authentication, all wrapped in a responsive and aesthetically pleasing design.

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
- **Error Page:** `/404` - A fallback for undefined routes.
- **Edit Task:** `/tasks/:taskId` - Allows users to edit a specific task. Protected route for authenticated users.
- **Add Task:** `/addTask/:taskType` - Allows users to add a new task. Protected route for authenticated users.

## Dependencies

- **React:** Core library for building the user interface.
- **@mui/material:** Material UI components for a consistent and professional design.
- **@emotion/react & @emotion/styled:** CSS-in-JS library for styling components.
- **react-beautiful-dnd:** Provides drag-and-drop functionality for tasks.
- **axios:** For handling HTTP requests.
- **dayjs:** A lightweight date manipulation library.
- **lodash:** Utility library for data manipulation.
- **react-router-dom:** For routing and navigation.

## Dev Dependencies

- **Vite:** A fast development build tool.
- **ESLint:** For identifying and fixing JavaScript and JSX issues.
- **Sass:** A CSS preprocessor to make styles more maintainable.

## License

This project is open-source and available under the MIT License.
