const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const barangSchema = new Schema(
  {
    nama: {
      type: String,
      required: [true, "Required"],
    },
    stok: {
      type: Number,
      required: [true, "Required"],
    },
    satuan: {
      type: String,
      required: [true, "Required"],
    },
    hargaPerSatuan: {
      type: Number,
      required: [true, "Requred"],
    },
    totalHarga: {
      type: Number,
      required: [true, "Required"],
    },
  },
  { timestamps: true }
);

const Barang = mongoose.model("barang", barangSchema);
module.exports = Barang;
