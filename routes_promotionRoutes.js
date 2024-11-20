import express from 'express';
import { Promotion } from '../models/Promotion.js';

export const promotionRouter = express.Router();

// Get all promotion requests
promotionRouter.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find({ status: 'approved' });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new promotion request
promotionRouter.post('/', async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific promotion request
promotionRouter.get('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a promotion request (for admin approval/rejection)
promotionRouter.patch('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    
    if (req.body.status) {
      promotion.status = req.body.status;
    }
    
    await promotion.save();
    res.json(promotion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a promotion request
promotionRouter.delete('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});