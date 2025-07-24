const { getAllProducts, getProductById, searchProducts, createProduct,deleteProduct, updateProduct } = require('../services/productService');

const getProducts = async (req, res) => {
  try {
    const fruits = await getAllProducts();
    res.json({ success: true, data: fruits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductId = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm." });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchProductByName = async (req, res) => {
  try {
    const keyword = req.query.q;

    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Thiếu từ khóa tìm kiếm",
      });
    }

    console.log("Tìm kiếm sản phẩm với từ khóa:", keyword);

    const products = await searchProducts(keyword);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Lỗi tìm kiếm:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};


const createNewProduct = async (req, res) => {
  const { name, description, price, stock_quantity, category_id, image } = req.body;

  if (!name || !price || !stock_quantity) {
    return res.status(400).json({ success: false, message: "Tên, giá và số lượng tồn kho là bắt buộc." });
  }

  try {
    const newProduct = await createProduct(name, description, price, stock_quantity, category_id, image);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Không thể tạo sản phẩm.", error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm." });
    }

    await deleteProduct(id);
    res.json({ success: true, message: "Xóa sản phẩm thành công." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Không thể xóa sản phẩm.", error: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock_quantity, category_id, image } = req.body;

  try {
    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm." });
    }

    const updatedProduct = await updateProduct(id, { name, description, price, stock_quantity, category_id, image });

    res.json({ success: true, message: "Cập nhật sản phẩm thành công.", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Không thể cập nhật sản phẩm.", error: error.message });
  }
};


module.exports = { getProducts, getProductId, searchProductByName, createNewProduct,deleteProductById, updateProductById };
