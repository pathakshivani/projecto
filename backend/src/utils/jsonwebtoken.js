import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const verifyAccessToken = (incommingAccessToken) => {
  return jwt.verify(incommingAccessToken, process.env.ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const verifyRefreshToken = (incommingRefreshToken) => {
  return jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
};

const generateTemporaryToken = () => {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = new Date(Date.now() + 20 * 60 * 1000)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "000"); // 20 minutes

  return { unHashedToken, hashedToken, tokenExpiry };
};

export {
  generateAccessToken,
  verifyAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateTemporaryToken,
};
