import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  try {
    const token = jwt.sign(
      { id: userId },                       // payload
      process.env.JWT_SECRET || "sahibdeep",              // secret key
      { expiresIn: "7d" }                  // token expiry
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};
