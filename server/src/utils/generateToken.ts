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

export const generateRefreshTokens = (id: string) => {
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
  });
  const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return { refreshToken, refreshTokenExpiry };
};
