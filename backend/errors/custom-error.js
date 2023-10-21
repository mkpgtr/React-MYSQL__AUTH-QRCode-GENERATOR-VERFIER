class CustomError extends Error {
    constructor(message, statusCode) {
      super(message); // Call super() with the message
      this.statusCode = statusCode;
    }
  }

module.exports = CustomError