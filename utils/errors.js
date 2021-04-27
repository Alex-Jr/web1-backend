class ValidationError extends Error {
  constructor(message) {
      super(message);
      this.name = 'ValidationError'
      this.statusCode = 400;
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class DuplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicationError";
    this.statusCode = 409;
  }
}

module.exports = {
  ValidationError,
  AuthorizationError,
  NotFoundError,
  DuplicationError,
}