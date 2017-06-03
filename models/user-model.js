const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema(
  // 1st arg -> fields of the documents of this collection
  {
      //ALL USERS
    name: { type: String },
      //TRADITIONAL REGUSTRATION USERS
    username: { type: String },
    encryptedPassword: { type: String },

      //LOGIN WITH FACEBOOK USERS
    facebookID: { type: String },

      //LOGIN WITH GOOGLE USERS
    googleID: { type: String },
  },
  // 2nd arg -> additional options
  {
    // Adds createdAt & updatedAt to documents
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);


module.exports = User;
