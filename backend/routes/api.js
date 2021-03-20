const express = require("express");
const router = express.Router();
const barangController = require("../controller/barangController");
const beliBarangController = require("../controller/beliBarangController");
// crud barang
router.get("/items", barangController.barang_get);
router.post("/items/create", barangController.barang_post);
router.put("/items/update/:id", barangController.barang_put);
router.delete("/items/delete/:id", barangController.barang_delete);
module.exports = router;

// pembelian
router.get("/pembelian", beliBarangController.beli_get);
router.post("/pembelian/create", beliBarangController.beli_create);
