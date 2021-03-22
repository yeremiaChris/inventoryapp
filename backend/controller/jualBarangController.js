const Jual = require("../model/jualBarangModel");
const Barang = require("../model/barangModel");
module.exports.jual_get = (req, res, next) => {
  Jual.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    }
    res.status(201).send(data);
  });
};

module.exports.jual_create = (req, res, next) => {
  const { body } = req;
  Jual.create(body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      next();
    }
    data.item.map((item) => {
      console.log(item);
      Barang.findOneAndUpdate(
        { _id: item.key },
        { $inc: { stok: -item.jumlahJual } },
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
