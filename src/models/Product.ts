import mongoose, { Schema, Types } from 'mongoose';

export interface Product {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  img : string;
  price: number; 
  
}

const ProductSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  },
  description : {
    type: String,
  },

  img: {
    type: String,
    
  },

  price : {
    type: Number,
    required : true,
  },
  
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);