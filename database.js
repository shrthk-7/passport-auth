const mongoose    = require("mongoose");
const MongoStore  = require("connect-mongo");

const clientPromise = mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("connected to db");
    return res.connection.getClient();
  })
  .catch((err) => {
    console.log({ err });
    process.exit(500);
  });

const store = MongoStore.create({
  clientPromise,
});
module.exports = store;
