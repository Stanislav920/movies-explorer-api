class ConflictingRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
    this.name = 'Conflicting Request';
  }
}

module.exports = ConflictingRequestError;
