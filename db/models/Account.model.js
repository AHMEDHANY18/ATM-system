import { Schema, model } from 'mongoose';

const accountSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
}, { timestamps: true });

const Account = model('Account', accountSchema);

export default Account;
