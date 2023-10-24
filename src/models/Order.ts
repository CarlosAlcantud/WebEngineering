import mongoose, { Schema, Types } from 'mongoose';

export interface Order {
  _id?: Types.ObjectId;
  address?: string;
  date: Date;
  cardHolder?: string;
  cardNumber: string;
  orderItems: {
    product: Types.ObjectId;
    qty: number;
    price: number;
  }[];
}

const OrderSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  address: {
    type: String
  },
  cardHolder: {
    type: String
  },
  cardNumber: {
    type: String,
    required: true
  },
  orderItems: [
    
    {
    _id: false,
    product:{ 
      
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    qty: {
      type: Number,
      min: 1,
    },
    price: {
      type: String,
      
    },
  }
  
  ]
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
