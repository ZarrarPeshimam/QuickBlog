import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Correctly compare email AND password
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // 🔐 Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Optional: expires after 1 hour
    });

    return res.json({ success: true, token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error: ' + error.message });
  }
};
