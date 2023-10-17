import mongoose, { Schema, Types } from 'mongoose';

export interface Order {
  _id?: Types.ObjectId;
  address?: string;
  date: Date;
  cardHolder?: string;
  cardNumber: string;
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
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
