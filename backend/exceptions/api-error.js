module.exports = class ApiError extends Error {
 status;
 errors;

 constructor(status, message, errors = []) {
  super(message);
  this.status = status;
  this.errors = errors;
 }

 static UnauthorizedError() {
  return new ApiError(401, "User not authorized");
 }

 static WordAddError() {
  return new ApiError(401, "The word was not added");
 }

 static WordEditError() {
  return new ApiError(401, "The word was not chaged");
 }

 static WordRemoveError() {
  return new ApiError(401, "The word was not removed");
 }

 static GetWordsError() {
  return new ApiError(401, "Words not found");
 }

 static BadRequest(message, errors = []) {
  return new ApiError(400, message, errors);
 }
};
