import jwt from "jsonwebtoken";

export const generateAccessToken = ({
  id,
  username,
}: {
  id: string;
  username: string;
}) => {
  return jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
  });
};
