require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let MONGODB_FREE_TIER_URI = process.env.MONGODB_FREE_TIER_URI;
let SECRET = process.env.SECRET;
let PASSWORD = process.env.PASSWORD; // not set in .env atm
let ADMIN_UUID = process.env.ADMIN_UUID;
let STRIPE_API_TEST_KEY = process.env.STRIPE_API_TEST_KEY;

module.exports = {
  PORT,
  MONGODB_URI,
  MONGODB_FREE_TIER_URI,
  SECRET,
  PASSWORD,
  ADMIN_UUID,
  STRIPE_API_TEST_KEY,
};
