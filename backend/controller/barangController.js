const Barang = require("../model/barangModel");
module.exports.barang_get = (req, res, next) => {
  Barang.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    } else {
      res.status(201).send(data);
    }
  }).sort({ createdAt: -1 });
};

module.exports.barang_post = (req, res, next) => {
  const { body } = req;
  Barang.create(body, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    }
    res.status(201).send(data);
  });
};

module.exports.barang_put = (req, res, next) => {
  const { body } = req;
  const { id } = req.params;
  Barang.findByIdAndUpdate(id, body, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    }
    res.status(201).send(data);
  });
};

module.exports.barang_delete = (req, res, next) => {
  const { id } = req.params;
  Barang.findById(id, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    } else if (data) {
      data.remove(() => {
        res.status(201).send(data);
      });
    } else {
      res.status(400).send("Not found");
      next();
    }
  });
};

module.exports.barang_sortStokHabis_get = (req, res, next) => {
  Barang.find({ stok: 0 }, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    } else {
      res.status(201).send(data);
    }
  }).sort({ createdAt: -1 });
};
module.exports.barang_sortStokSedikit_get = (req, res, next) => {
  Barang.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    } else {
      res.status(201).send(data);
    }
  }).sort({ stok: 1 });
};
module.exports.barang_sortStokTerbanyak_get = (req, res, next) => {
  Barang.find({}, (err, data) => {
    if (err) {
      res.status(400).send(err);
      next();
    } else {
      res.status(201).send(data);
    }
  }).sort({ stok: -1 });
};
