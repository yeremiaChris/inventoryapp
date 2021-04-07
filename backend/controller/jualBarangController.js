const Jual = require("../model/jualBarangModel");
const Barang = require("../model/barangModel");
module.exports.jual_get = (req, res, next) => {
  Jual.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    }
    res.status(201).send(data);
  }).sort({ createdAt: -1 });
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

// sorting
module.exports.jual_sort_seminggu = (req, res, next) => {
  Jual.find(
    {
      createdAt: {
        $lte: new Date(),
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        next();
      }
      console.log(data);
      res.status(201).send(data);
    }
  );
};
module.exports.jual_sort_sebulan = (req, res, next) => {
  Jual.find(
    {
      createdAt: {
        $lte: new Date(),
        $gte: new Date(new Date() - 30 * 60 * 60 * 24 * 1000),
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        next();
      }
      console.log(data);
      res.status(201).send(data);
    }
  );
};
module.exports.jual_sort_setahun = (req, res, next) => {
  Jual.find(
    {
      createdAt: {
        $lte: new Date(),
        $gte: new Date(new Date() - 365 * 60 * 60 * 24 * 1000),
      },
    },
    (err, data) => {
      if (err) {
        console.log(err);
        next();
      }
      console.log(data);
      res.status(201).send(data);
    }
  );
};
