const mongoose = require("mongoose");
require("dotenv").config();

// create a Schema
// get Schema class from mongoose
const Schema = mongoose.Schema;
// create user Schema
const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
    minLength: [2, "Name is too short"],
    maxLength: [50, "Name is too long"],
  },
  lname: {
    type: String,
    required: true,
    minLength: [2, "Surname is too short"],
    maxLength: [50, "Surname is too long"],
  },
  username: {
    type: String,
    required: true,
    minLength: [4, "Username is too short"],
    maxLength: [50, "Username is too long"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minLength: [5, "Username is too short"],
    maxLength: [50, "Username is too long"],
    unique: true,
  },
  password: {
    type: String,
    // WE DONT WRITE THE LENGTH BECAUSE THE ENCRYPTED IS IN CHARGE FOR THIS
    // minLength: [8, 'Password is too short'],
    // maxLength: [20, 'Password is too long'],
    required: true,
  },
  bDate: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

// crate mongoose model to connect schema with Db collection and to be used to integrate
const Users = mongoose.model("users", userSchema);
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6fbrz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

function connect() {
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) {
      // mongoose is already connected
      resolve();
    } else {
      //    try to connect
      mongoose
        .connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          //    connection success
          resolve();
        })
        .catch((err) => {
          //    connection failed
          reject(err);
        });
    }
  });
}
// responses map:
// 0: database connection failed
const registerUser = (fname, lname, username, email, password, bDate) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(() => {
        // connection established
        // do the query
        const newUser = new Users({
          fname, // => fname = fname
          lname,
          username,
          email,
          password,
          bDate,
          verified: false,
        });
        newUser
          .save()
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            if (error.code === 11000) {
              if (Object.keys(error.keyPattern).includes("username")) {
                reject({ number: 1, error });
              } else {
                if (Object.keys(error.keyPattern).includes("email")) {
                    reject({ number: 2, error });
              }  else {
                  reject({number: 3, error})
              }
            } 
          } else {
            reject({number: 3, error})
          };
      })
    })
      .catch((error) => {
        reject({ number: 0, error });
      });
  });
}

module.exports = {
  registerUser,
}
