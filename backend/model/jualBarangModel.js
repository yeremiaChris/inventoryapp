const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jualBarangSchema = new Schema(
  {
    jumlahItemJual: {
      type: Number,
      required: [true, "Required"],
    },
    totalHargaJual: {
      type: Number,
      required: [true, "Required"],
    },
    item: {
      type: Array,
      required: [true, "Required"],
    },
  },
  { timestamps: true }
);

const Jual = mongoose.model("jual", jualBarangSchema);
module.exports = Jual;
