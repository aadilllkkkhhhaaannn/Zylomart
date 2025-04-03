const { ImageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// add a new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      price,
      salePrice,
      totalStock,
      category,
      brand,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      price,
      salePrice,
      totalStock,
      category,
      brand,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// edit a product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      price,
      salePrice,
      totalStock,
      category,
      brand,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.image = image || findProduct.image;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.brand = brand || findProduct.brand;
    findProduct.category = category || findProduct.category;
    findProduct.description = description || findProduct.description;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// delete a product

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product)
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });

  try {
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// fetch All product

const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  deleteProduct,
  addProduct,
  editProduct,
  fetchAllProduct,
};
