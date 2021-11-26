// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;

// const log = require("../logger");

// let _db: any;

// const connect = (callback: () => {}) => {
//   mongoClient
//     .connect(
//       "mongodb+srv://tharinda:hycdJRCvE7Yhuvn@cluster0.ich0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//     )
//     .then((client: any) => {
//       _db = client.db();
//       log.info("Connected to Mongodb");
//       callback();
//     })
//     .catch((err: any) => log.erro(err));
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database was found";
// };

// exports.connect = connect;
// exports.getDb = getDb;
