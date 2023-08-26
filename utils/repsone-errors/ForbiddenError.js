class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    this.name = 'Forbidden';
  }
}

module.exports = ForbiddenError;
