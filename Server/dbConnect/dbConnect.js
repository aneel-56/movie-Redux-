const mongoose = require("mongoose");

const connectDB = (uri) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });
};

module.exports = { connectDB };
