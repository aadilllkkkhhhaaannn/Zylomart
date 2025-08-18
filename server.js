const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./Config/db_config");

// Import Routes
const authRouter = require("./routets/auth/auth-routes");
const adminProductsRouter = require("./routets/admin/products-routes");
const adminOrderRouter = require("./routets/admin/orders-routes");
const adminUsersRouter = require("./routets/admin/user-routes");
const shopProductsRouter = require("./routets/shop/products-routes");
const shopCartRouter = require("./routets/shop/cart-routes");
const shopAddressRouter = require("./routets/shop/address-routes");
const shopOrderRouter = require("./routets/shop/orders-routes");
const shopSearchRouter = require("./routets/shop/search-routes");
const shopReviewRouter = require("./routets/shop/review-routes");
const commonFeatureRouter = require("./routets/common/features-routes");

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: [
      "https://zylomart-3bzq.onrender.com",
      "http://localhost:3000",
      "https://casualstore-ovy9.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

// ✅ Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ HTTP cookies
app.post("/set-consent", (req, res) => {
  const { consent } = req.body;
  res.cookie("cookieConsent", consent, {
    httpOnly: false, // js se accesible nhi hoti , Security ke liye
    // use hota hai → XSS attacks se bachata hai.
    secure: true, // ✅ deployed HTTPS site me correct
    sameSite: "Lax", // Ye control karta hai ki cookie cross-site
    // requests me send hogi ya nahi.
    maxAge: 1000 * 60 * 60 * 24 * 365 * 20, // optional: long lifetime
  });

  res.json({ message: "Consent saved" });
});

// ✅ Routes
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Zylomart" });
});

app.use("/api/auth", authRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/users", adminUsersRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// ✅ Server Start
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
