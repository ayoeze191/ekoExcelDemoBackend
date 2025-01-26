import { signupValidator } from "~~/utils/auth/signup";
import response from "~~/utils/response";
import { StatusCodes } from "http-status-codes";
import UserModel from "~~/model/User.model";
import bcrypt from "bcryptjs";
import { signLogin } from "~~/utils/sign";
export default eventHandler({
  onRequest: [signupValidator],
  async handler(event) {
    const body = await readBody(event);
    const isError = event.context.validator.errors;
    if (isError) {
      return response.error(event, {
        statusCode: StatusCodes.BAD_REQUEST,
        data: {
          message: "Validation error",
          data: event.context.validator.errors,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = new UserModel({
      ...body,
      password: hashedPassword,
    });
    await user.save();
    const newUser = await UserModel.findOne({ email: body.email });
    const tokenData = signLogin(newUser);

    return response.success(event, {
      message: "Account created successfully",
      data: {
        token: tokenData,
        user: newUser,
      },
    });
  },
});
