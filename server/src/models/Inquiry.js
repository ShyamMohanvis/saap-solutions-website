import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  interest: { type: String, enum: ['Website Design','Web Development','SEO Optimization','Branding'], default: 'Website Design' },
  message: { type: String, required: true, trim: true },
}, { timestamps: true });

export default mongoose.model('Inquiry', InquirySchema);


