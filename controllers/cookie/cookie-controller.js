const cookie_parser = require("../../models/cookie");

const cookieConsent = async (req, res) => {
  const { consent } = req.body;

  // 1. Cookie set in browser
  res.cookie("cookieConsent", consent, {
    httpOnly: false,
    secure: true,
    sameSite: "Lax",
    maxAge: 1000 * 60 * 60 * 24 * 365 * 20,
  });

  // 2. DB me save (maan lo Consent model banaya hai)
  await cookie_parser.create({
    consent,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.json({ message: "Consent saved" });
};

module.exports = { cookieConsent };
