import TokenModel, { TokenType } from "~~/model/Token.model";

const randomNumber = (length: number) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );
};

export const generateToken = async (user: any, type: TokenType) => {
  await TokenModel.deleteMany({ user: user._id, type }).exec();
  return await TokenModel.create({
    user: user._id,
    token: randomNumber(6),
    type,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });
};

export const verifyTokenCode = async (token: string, type: TokenType) => {
  const isToken = await TokenModel.findOne({ token, type });
  if (!isToken) {
    return {
      status: false,
      user: null,
    };
  } else {
    if (isToken.expiresAt < new Date()) {
      await TokenModel.findByIdAndDelete(isToken._id).exec();
      return {
        status: false,
        user: null,
      };
    }
    await TokenModel.findByIdAndDelete(isToken._id).exec();
    return {
      status: true,
      user: isToken.user,
    };
  }
};
