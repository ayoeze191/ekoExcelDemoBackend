import { StatusCodes } from "http-status-codes";
import { ValidationError } from "yup";
import response from "./response";
export const handleYupError = (error: ValidationError, event: any) => {
  const inner_error = error.inner;
  const errors = inner_error.map((err) => {
    return {
      path: err.path,
      message: err.message,
    };
  });
  return response.error(event, {
    statusCode: StatusCodes.BAD_REQUEST,
    data: {
      message: "Validation error",
      data: errors,
    },
  });
};
