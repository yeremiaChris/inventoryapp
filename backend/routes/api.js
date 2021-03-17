const express = require("express");
const router = express.Router();
const barangController = require("../controller/barangController");
// list
router.get("/items", barangController.barang_get);
router.post("/items/create", barangController.barang_post);
module.exports = router;
