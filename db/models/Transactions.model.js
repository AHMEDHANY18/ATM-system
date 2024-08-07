import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  type: { type: String, enum: ['deposit', 'withdraw'], required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
