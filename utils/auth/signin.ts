import * as yup from "yup";
import { handleYupError } from "../errorFormatter";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email must be a valid email address"),
  password: yup.string().required("Password is required"),
});

export const signinValidator = defineRequestMiddleware(async (event) => {
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
