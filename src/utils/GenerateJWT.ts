import jwt from "jsonwebtoken";
export default (payload: string | object) => {
  const sercet = process.env.JWT_SECRET;
  if (!sercet) throw new Error("JWT_SECRET is not defined");
  const token = jwt.sign(payload, sercet, {
    expiresIn: "60m",
  });
  return token;
};
