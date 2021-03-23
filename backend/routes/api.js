const express = require("express");
const router = express.Router();
const barangController = require("../controller/barangController");
const beliBarangController = require("../controller/beliBarangController");
const jualBarangController = require("../controller/jualBarangController");
// crud barang
router.get("/items", barangController.barang_get);
router.get("/items/sort/stokHabis", barangController.barang_sortStokHabis_get);
router.get(
  "/items/sort/stokSedikit",
  barangController.barang_sortStokSedikit_get
);
router.get(
  "/items/sort/stokBanyak",
  barangController.barang_sortStokTerbanyak_get
);
router.post("/items/create", barangController.barang_post);
router.put("/items/update/:id", barangController.barang_put);
router.delete("/items/delete/:id", barangController.barang_delete);
module.exports = router;

// pembelian
router.get("/pembelian", beliBarangController.beli_get);
router.get("/pembelian/seminggu", beliBarangController.beli_sort_seminggu);
router.get("/pembelian/sebulan", beliBarangController.beli_sort_sebulan);
router.get("/pembelian/setahun", beliBarangController.beli_sort_setahun);
router.post("/pembelian/create", beliBarangController.beli_create);
// penjualan
router.get("/penjualan", jualBarangController.jual_get);
router.get("/penjualan/seminggu", jualBarangController.jual_sort_seminggu);
router.get("/penjualan/sebulan", jualBarangController.jual_sort_sebulan);
router.get("/penjualan/setahun", jualBarangController.jual_sort_setahun);
router.post("/penjualan/create", jualBarangController.jual_create);
