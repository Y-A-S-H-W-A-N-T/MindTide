import mongoose from 'mongoose';

const { Schema } = mongoose;

const productsSchema = new Schema({
  name: String,
  price: String,
  description: String,
  type: String,
  review: String,
  stock: String,
  company: String,
  thumbnail: String,
  images: [String],
});

const Products = mongoose.models.products || mongoose.model('products', productsSchema);

export { Products };
