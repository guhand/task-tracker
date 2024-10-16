# Task Tracker

A **Task Tracker** application built with **Node.js**, **NestJS**, and **SQLite**, designed for efficient project and task management. It helps teams manage tasks, assign responsibilities, and track progress, ideal for small to medium-sized teams.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
- [Technologies Used](#technologies-used)

## Features

- **User Authentication**: Secure login via email and password.
- **Role-Based Access Control**: Manage team members based on roles.
- **Project Management**: Create and manage multiple projects.
- **Task Management**: Assign and track tasks across teams.
- **Real-Time Tracking**: Monitor task progress and status updates.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/guhand/task-tracker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd task-tracker
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

Start the development server:
```bash
npm run start:dev
```

## Modules

### Auth Module
- Users can securely log in using email and password-based authentication.

### Dashboard Module
- Displays a summary of key metrics such as users, projects, tasks, and their respective statuses.

### User Module
- Allows admin to add, view, and update user information for efficient user management.

### Project Module
- Provides project management functionalities, including creating, editing, and retrieving project details.

### Task Module
- Enables task creation, assignment to users, and updating task statuses within specific projects.

## Technologies Used

- **Node.js**: As the runtime for backend services.
- **NestJS**: A framework for building efficient, reliable, and scalable server-side applications.
- **SQLite**: A lightweight, serverless SQL database used for storing data.
- **npm**: For managing project dependencies and running scripts.
