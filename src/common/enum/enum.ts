export enum Role {
  Admin = 1,
  User = 2,
}

export enum TaskType {
  Bug = 1,
  Enhancement = 2,
}

export enum TaskStatus {
  ToDO = 1,
  InProgress = 2,
  Resolved = 3,
  Reopened = 4,
}

export enum AppError {
  USER_NOT_FOUND = 'User not found',
  ALREADY_EXIST = '$ already exist',
  FAILED_TO_CREATE = 'Failed to create a $',
}
