const Product = require("../models/product");
const { tokenExtractor, authenticateUser } = require("../utils/middleware");

const productsRouter = require("express").Router();

// apply token extractor middleware to all requests
productsRouter.use(tokenExtractor);

productsRouter.get("/", (request, response) => {
  Product.find({}).then((products) => response.json(products));
});

productsRouter.get("/:id", (request, response, next) => {
  Product.findById(request.params.id)
    .then((product) => {
      if (product) response.json(product);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

productsRouter.post("/", authenticateUser, (request, response, next) => {
  const body = request.body;

  const newProduct = new Product({
    name: body.name,
    description: body.description,
    category: body.category,
    imageUrl: body.imageUrl,
    price: body.price,
    available: body.available,
    material: body.material || undefined,
    sizes: body.sizes || undefined,
  });

  newProduct
    .save()
    .then((savedProduct) => response.json(savedProduct))
    .catch((error) => next(error));
});

productsRouter.put("/:id", authenticateUser, (request, response, next) => {
  const {
    name,
    description,
    category,
    imageUrl,
    material,
    sizes,
    price,
    available,
  } = request.body;

  Product.findById(request.params.id)
    .then((product) => {
      // check needed because .then block runs even if product not found
      if (!product) return response.status(404).end();

      // Update only if values are defined
      if (name !== undefined) product.name = name;
      if (description !== undefined) product.description = description;
      if (category !== undefined) product.category = category;
      if (imageUrl !== undefined) product.imageUrl = imageUrl;
      if (material !== undefined) product.material = material;
      if (sizes !== undefined) product.sizes = sizes;
      if (price !== undefined) product.price = price;
      if (available !== undefined) product.available = available;

      return product.save().then((updatedProduct) => {
        response.json(updatedProduct);
      });
    })
    .catch((error) => next(error));
});

productsRouter.delete("/:id", authenticateUser, (request, response, next) => {
  Product.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

module.exports = productsRouter;
