import { signinValidator } from "~~/utils/auth/signin";
import UserModel from "~~/model/User.model";
import response from "~~/utils/response";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "~~/utils/token/tokenhelper";
import { signLogin } from "~~/utils/sign";
import bcrypt from "bcryptjs";

export default eventHandler({
  onRequest: [signinValidator],
  async handler(event) {
    console.log("in");
    const body = await readBody(event);
    const user = await UserModel.findOne({
      email: body.email.toLowerCase().trim(),
    });
    if (!user) {
      return response.error(event, {
        statusCode: StatusCodes.NOT_FOUND,
        data: {
          message: "User not found. Kindly create an account",
        },
      });
    }
    // const isPasswordCorrect = await user.comparePassword(body.password);
    const isPasswordCorrect = bcrypt.compare(
      body.password.trim(),
      user.password.trim()
    );
    console.log(isPasswordCorrect);
    // if (isPasswordCorrect) {
    //   const e = createError({
    //     statusCode: StatusCodes.NOT_FOUND,
    //     data: {
    //       message: "Invalid email/password",
    //     },
    //   });
    //   return sendError(event, e);
    // }

    const token = signLogin(user);
    return response.success(event, {
      message: "Login successful",
      data: {
        token,
        user,
      },
    });
  },
});
