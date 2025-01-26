import * as yup from "yup";
import { handleYupError } from "../errorFormatter";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email must be a valid email address"),
  first_name: yup
    .string()
    .min(2, "First Name must be at least 2 characters")
    .required("First Name is required"),
  last_name: yup
    .string()
    .min(2, "Last Name must be at least 2 characters")
    .required("Last Name is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const checkEmailExist = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email must be a valid email address"),
});

export const signupValidator = defineRequestMiddleware(async (event) => {
  const body = await readBody(event);
  try {
    const data = await schema.validate(body, {
      abortEarly: false,
    });
    event.context.validator = data;
  } catch (error) {
    handleYupError(error, event);
  }
});

export const onboardEmailValidator = defineRequestMiddleware(async (event) => {
  const body = await readBody(event);
  try {
    const data = await checkEmailExist.validate(
      {
        ...body,
        email: body.email.toLowerCase().trim(),
      },
      {
        abortEarly: false,
      }
    );
    event.context.validator = data;
  } catch (error) {
    handleYupError(error, event);
  }
});
