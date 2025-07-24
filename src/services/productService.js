const { pool } = require('../config/db');

const getAllProducts = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM products");
    return results;
  } catch (error) {
    throw new Error('Không thể lấy danh sách sản phẩm: ' + error.message);
  }
};

const getProductById = async (id) => {
  try {
    const [results] = await pool.query("SELECT * FROM products WHERE product_id = ?", [id]);
    if (results.length === 0) {
      return null;
    }
    return results[0];
  } catch (error) {
    throw new Error('Không thể lấy sản phẩm: ' + error.message);
  }
};

const searchProducts = async (query) => {
  const [results] = await pool.query(
    "SELECT * FROM products WHERE LOWER(name) LIKE ?",
    [`%${query.toLowerCase()}%`]
  );
  return results;
};

const createProduct = async (name, description, price, stock_quantity, category_id, image) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO products (name, description, price, stock_quantity, category_id, image) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, stock_quantity, category_id, image]
    );
    return { product_id: result.insertId, name, description, price, stock_quantity, category_id, image };
  } catch (error) {
    throw new Error('Không thể tạo sản phẩm: ' + error.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM products WHERE product_id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error("Không thể xóa sản phẩm hoặc sản phẩm không tồn tại.");
    }

    return { success: true, message: "Xóa sản phẩm thành công." };
  } catch (error) {
    throw new Error("Không thể xóa sản phẩm: " + error.message);
  }
};

const updateProduct = async (id, productData) => {
  const { name, description, price, stock_quantity, category_id, image } = productData;

  const [result] = await pool.query(
    "UPDATE products SET name=?, description=?, price=?, stock_quantity=?, category_id=?, image=? WHERE product_id=?",
    [name, description, price, stock_quantity, category_id, image, id]
  );

  if (result.affectedRows === 0) {
    throw new Error("Không thể cập nhật sản phẩm hoặc sản phẩm không tồn tại.");
  }

  return { id, ...productData };
};

module.exports = { getAllProducts, getProductById, searchProducts, createProduct,deleteProduct, updateProduct };


