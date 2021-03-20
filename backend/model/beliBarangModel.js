const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const beliBarangSchema = new Schema(
  {
    jumlahItemBeli: {
      type: Number,
      required: [true, "Required"],
    },
    totalHargaBeli: {
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

const Beli = mongoose.model("beli", beliBarangSchema);
module.exports = Beli;
