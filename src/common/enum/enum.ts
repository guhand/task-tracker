export enum Role {
  Admin = 1,
  User = 2,
}

export enum TaskType {
  Task = 1,
  Bug = 2,
}

export enum TaskStatus {
  ToDO = 1,
  InProgress = 2,
  Reopen = 3,
  Done = 4,
}

export enum AppError {
  USER_NOT_FOUND = 'User not found',
  ALREADY_EXIST = '$ already exist',
  FAILED_TO_CREATE = 'Failed to create a $',
}
