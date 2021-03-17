const Barang = require("../model/barangModel");
module.exports.barang_get = (req, res) => {
  // Barang.find({}, function(err, data) {
  //   if (err) {
  //     res.send(err);
  //     next()
  //   } else {
  //     res.send(data);
  //   }
  Barang.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports.barang_post = (req, res, next) => {
  Barang.create(
    {
      nama: "Yeremia",
      stok: 2,
      satuan: "Orang",
      hargaPerSatuan: 20000,
      totalHarga: 40000,
    },
    (err, data) => {
      if (err) {
        res.status(500).send("error");
        next();
      }
      res.send(data);
    }
  );
};
