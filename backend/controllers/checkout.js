const checkoutRouter = require("express").Router();
const Product = require("../models/product");

const { STRIPE_API_TEST_KEY } = require("../utils/config");
const stripe = require("stripe")(STRIPE_API_TEST_KEY);

checkoutRouter.post("/create-checkout-session", async (request, response) => {
  const cart = request.body.cart;

  if (!Array.isArray(cart) || cart.length === 0)
    return response.status(400).json({ error: "Invalid cart data" });

  try {
    // load up-to-date and safe product data from the database
    const productDocuments = await Product.find({
      _id: { $in: cart.map((item) => item.id) },
    });

    // generate Stripe line_items
    const line_items = cart.map((item) => {
      const matched = productDocuments.find(
        (p) => p._id.toString() === item.id && p.available
      );

      if (!matched) throw new Error(`Product ID invalid: ${item.id}`);

      const name = matched.name;
      const unit_amount = Math.round(matched.price * 100); // stripe wants price in cents
      const description = item.selectedSize ? `Size: ${item.selectedSize}` : "";

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name,
            description,
          },
          unit_amount,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "http://localhost:5173/order/confirmation",
      cancel_url: "http://localhost:5173/cart-summary",
    });

    response.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error.message);
    response.status(500).json({ error: "Checkout failed" });
  }
});

module.exports = checkoutRouter;
