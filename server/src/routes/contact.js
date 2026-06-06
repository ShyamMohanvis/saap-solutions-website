import { Router } from 'express';
import Inquiry from '../models/Inquiry.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, message, interest } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const inquiry = await Inquiry.create({ name, email, message, interest });
    return res.status(201).json({ ok: true, id: inquiry._id });
  } catch (err) {
    console.error('Create inquiry failed', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;


