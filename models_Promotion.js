import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  serviceArea: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Promotion = mongoose.model('Promotion', promotionSchema);