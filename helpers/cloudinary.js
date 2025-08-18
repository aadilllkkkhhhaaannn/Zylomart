const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dbreqr9hq", // Cloudinary account ka unique cloud name.
  api_key: "515571322335469", // account ke liye API key jo authentication ke liye use hoti hai.
  api_secret: "EpAmySl55lPJvvIzjxk-QCM5bzI", // account ka secret key jo secure authentication provide karta hai.
});
// Cloudinary ke credentials configure karte hain taaki tumhare account par file upload ki ja sake.

const storage = new multer.memoryStorage();
// Multer ko setup karte hain jo uploaded files ko memory (RAM) mein temporarily store karega.

async function ImageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    // File ka type (image/video) automatically detect karega aur us hisaab se upload karega.
  });

  return result;
  // Cloudinary ka response (jo uploaded file ka URL, public ID, etc. hoga) return karta hai.
}
// Ek async function jo file ko Cloudinary par upload karta hai aur response deta hai.

const upload = multer({ storage });
// Multer ko initialize karte hain taaki ye middleware file uploads ko process kar sake.

module.exports = { upload, ImageUploadUtil };
// 'upload' aur 'handleImageUpload' ko export karte hain taaki dusre files mein inhe use kiya ja sake.
