# Task Tracker

This **Task Tracker** application, inspired by **Jira**, is a powerful tool designed to help teams manage tasks and projects efficiently. Built using **Node.js**, **NestJS**, and **SQLite**, it provides an intuitive interface for creating, assigning, and tracking tasks across teams, making project management seamless for small to medium-sized teams.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Modules](#modules)
  - [Auth Module](#auth-module)
  - [Dashboard Module](#dashboard-module)
  - [User Module](#user-module)
  - [Project Module](#project-module)
  - [Task Module](#task-module)
- [Technologies Used](#technologies-used)

## Features

- **User Authentication**: Secure login using email and password authentication.
- **User Management**: Role-based access control to manage team members effectively.
- **Project Management**: Create, edit, and manage multiple projects.
- **Task Management**: Assign tasks to team members and track progress.
- **Status Tracking**: Real-time task progress tracking and status updates.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/guhand/task-tracker.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd task-tracker
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

To run the application locally:

1. **Start the development server**:
    ```bash
    npm run start:dev
    ```

2. The backend API will be available at `http://localhost:5000`.

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
