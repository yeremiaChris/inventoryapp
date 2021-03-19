const express = require("express");
const router = express.Router();
const barangController = require("../controller/barangController");
// list
router.get("/items", barangController.barang_get);
router.post("/items/create", barangController.barang_post);
router.put("/items/update/:id", barangController.barang_put);
router.delete("/items/delete/:id", barangController.barang_delete);
module.exports = router;
