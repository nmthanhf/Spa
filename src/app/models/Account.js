const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Account = new Schema({
  phone: { type: Number},
  email: {type: String},
  password: { type: String, default: 'F%PUtHn4#mmL' },
  name: { type: String, default: 'abc' },
  address: { type: String, default: '1' },
  permission: {type: String, default: 'customer'}
}, {
  timestamps: true,
});

module.exports = mongoose.model('Account', Account)