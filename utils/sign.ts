import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "secret";

export const signLogin = (user: any) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
