require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let MONGODB_FREE_TIER_URI = process.env.MONGODB_FREE_TIER_URI;
let SECRET = process.env.SECRET;
let LOGIN_UUID = process.env.LOGIN_UUID;
let PASSWORD = process.env.PASSWORD; // not set in .env atm
let ADMIN_SECRET_ID = process.env.ADMIN_SECRET_ID;

module.exports = {
  PORT,
  MONGODB_URI,
  MONGODB_FREE_TIER_URI,
  SECRET,
  LOGIN_UUID,
  PASSWORD,
  ADMIN_SECRET_ID,
};
