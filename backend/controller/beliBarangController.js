const Beli = require("../model/beliBarangModel");
const Barang = require("../model/barangModel");
module.exports.beli_get = (req, res, next) => {
  Beli.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    }
    res.status(201).send(data);
  });
};

module.exports.beli_create = (req, res, next) => {
  const { body } = req;
  Beli.create(body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      next();
    }
    data.item.map((item) => {
      console.log(item);
      Barang.findOneAndUpdate(
        { _id: item.key },
        { $inc: { stok: item.jumlahBeli } },
        (err, data) => {
          if (err) {
            next();
          }
          next();
        }
      );
    });
    res.status(201).send(data);
  });
};
