const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "wrong min price"],
    max: [10000, "wrong max prixe"],
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
  },
  stock: {
    type: Number,
    min: [0, "wrong min rating"],
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  colors: { type: [Schema.Types.Mixed] },
  sizes: { type: [Schema.Types.Mixed] },
  highlights: { type: [String] },
  discountPrice: { type: Number },
  deleted: {
    type: Boolean,
    required: true,
  },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

/* const virtualDiscountPrice = productSchema.virtual("discountPrice");
virtualDiscountPrice.get(function () {
  return Math.round(this.price * (1 - this.discountPercentage / 100));
}); */

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, res) {
    delete res._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
