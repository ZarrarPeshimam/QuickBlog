import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🧠 [auth.js] Incoming Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("❌ [auth.js] No token found or wrong format");
    return res.status(401).json({ success: false, message: "Unauthorized - No token" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔑 [auth.js] Extracted token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ [auth.js] Token verified. User info:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("🛑 [auth.js] Token verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;
