const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
      enum: ["apparel", "media", "accessory"],
    },
    imageUrl: {
      type: String,
      required: [true, "URL/path for product image is required"],
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    sizes: sizeSchema,
    quantity: Number,
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// custom validator to ensure sizes and quantity are mutually exclusive
// must use regular functions instead of arrow functions for
// Mongoose middleware hooks (pre, post, etc.) when you need access to this.
productSchema.pre("validate", function (next) {
  if (this.sizes && this.quantity != null) {
    return next(
      new Error(
        "Product can't have both 'sizes' and 'quantity'. Use one or the other."
      )
    );
  }
  next();
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Product", productSchema);
