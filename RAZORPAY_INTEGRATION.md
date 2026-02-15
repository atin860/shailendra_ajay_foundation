# Razorpay Integration Guide - Vercel Serverless

This guide explains how to integrate Razorpay TEST MODE checkout into your Vite + React donation page deployed on Vercel.

## 🎯 Overview

This implementation uses:
- **Vercel Serverless Functions** for secure API routes
- **Razorpay Checkout** for payment processing
- **Environment Variables** for secure credential management
- **TEST MODE** for safe development and testing

## 📁 Project Structure

```
donation-project/
├── api/
│   └── create-order.js          # Vercel serverless function
├── src/
│   ├── utils/
│   │   └── razorpay.js          # Razorpay utility functions
│   ├── components/
│   │   └── DonationForm.jsx     # Donation form component
│   └── pages/
│       └── DonatePage.jsx       # Main donation page
└── vercel.json                  # Vercel configuration
```

## 🔧 Installation Steps

### 1. Install Dependencies

```bash
npm install razorpay --save
```

### 2. Environment Variables

#### Local Development (.env)
Create a `.env` file in the root directory:

```env
# Razorpay TEST MODE Credentials
RAZORPAY_KEY_ID=rzp_test_SGJ3eStZh062Hy
RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE

# Frontend Environment Variable
VITE_RAZORPAY_KEY_ID=rzp_test_SGJ3eStZh062Hy
```

#### Vercel Deployment
Set these environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `RAZORPAY_KEY_ID` | `rzp_test_SGJ3eStZh062Hy` | Production, Preview, Development |
| `RAZORPAY_KEY_SECRET` | `YOUR_SECRET_HERE` | Production, Preview, Development |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_test_SGJ3eStZh062Hy` | Production, Preview, Development |

**Note:** For Vite projects, use `VITE_RAZORPAY_KEY_ID` instead of `NEXT_PUBLIC_RAZORPAY_KEY_ID`.

### 3. Vercel Configuration

Your `vercel.json` should already be configured. The serverless function will automatically be available at `/api/create-order`.

## 🚀 How It Works

### Payment Flow

1. **User selects donation amount** (₹500, ₹1000, etc.) or enters custom amount
2. **User fills donor details** (name, email, phone)
3. **User clicks "Donate Now"**
4. **Frontend calls `/api/create-order`** with selected amount
5. **Serverless function creates Razorpay order** and returns order details
6. **Razorpay Checkout opens** with order information
7. **User completes payment** using Razorpay's secure interface
8. **Payment success handler triggers**:
   - Shows alert with Payment ID
   - Logs payment details to console
   - Displays success invoice/receipt

### API Route: `/api/create-order`

**Endpoint:** `POST /api/create-order`

**Request Body:**
```json
{
  "amount": 1000
}
```

**Response:**
```json
{
  "success": true,
  "order_id": "order_xxxxxxxxxxxxx",
  "amount": 100000,
  "currency": "INR",
  "message": "Order created successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## 💻 Code Implementation

### 1. API Route (`/api/create-order.js`)

```javascript
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { amount } = req.body;
  const amountInPaisa = Math.round(amount * 100);

  const order = await razorpay.orders.create({
    amount: amountInPaisa,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  });

  return res.status(200).json({
    success: true,
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
  });
}
```

### 2. Razorpay Utility (`src/utils/razorpay.js`)

Key functions:
- `loadRazorpayScript()` - Loads Razorpay checkout script
- `createRazorpayOrder(amount)` - Calls API to create order
- `processRazorpayPayment(options)` - Handles complete payment flow

### 3. Donation Form Integration

```javascript
import { processRazorpayPayment } from '../utils/razorpay';

const handleDonation = async () => {
  await processRazorpayPayment({
    amount: getFinalAmount(),
    donorDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '9876543210',
      donationType: 'onetime'
    },
    onSuccess: (result) => {
      console.log('Payment ID:', result.payment_id);
      alert('Payment Successful!');
    },
    onFailure: (error) => {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  });
};
```

## 🧪 Testing

### Test Mode Credentials
- **Key ID:** `rzp_test_SGJ3eStZh062Hy`
- **Key Secret:** Your test secret key

### Test Cards
Use these test cards in TEST MODE:

| Card Number | CVV | Expiry | Result |
|------------|-----|--------|--------|
| 4111 1111 1111 1111 | Any | Future | Success |
| 5555 5555 5555 4444 | Any | Future | Success |
| 4000 0000 0000 0002 | Any | Future | Failure |

### Testing UPI
- Use any UPI ID in test mode
- Payment will be simulated

### Testing Netbanking
- Select any bank
- Use test credentials provided by Razorpay

## 🔒 Security Features

1. **Environment Variables:** Sensitive credentials stored securely
2. **Server-side Order Creation:** Amount validation on server
3. **HTTPS Only:** All API calls encrypted
4. **CORS Protection:** API routes protected
5. **Input Validation:** Amount and donor details validated

## 📊 Payment Success Handling

When payment succeeds, you receive:

```javascript
{
  success: true,
  payment_id: "pay_xxxxxxxxxxxxx",
  order_id: "order_xxxxxxxxxxxxx",
  signature: "signature_hash",
  amount: 1000,
  donorDetails: { /* donor info */ }
}
```

This data can be:
- Saved to database
- Sent to email service
- Used for receipt generation
- Logged for analytics

## 🚨 Error Handling

The integration handles these scenarios:

1. **Script Loading Failure:** Network issues
2. **Order Creation Failure:** Server errors
3. **Payment Cancellation:** User closes modal
4. **Payment Failure:** Card declined, insufficient funds
5. **Validation Errors:** Invalid amount, missing fields

## 📱 Production Deployment

### Before Going Live:

1. **Replace TEST credentials with LIVE credentials:**
   ```env
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_live_secret
   VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   ```

2. **Update Vercel environment variables** with live credentials

3. **Test thoroughly** in production environment

4. **Enable webhooks** for payment verification (optional but recommended)

## 🔗 Useful Links

- [Razorpay Dashboard](https://dashboard.razorpay.com/)
- [Razorpay Checkout Docs](https://razorpay.com/docs/payments/payment-gateway/web-integration/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)

## 💡 Tips

1. **Always use TEST mode** during development
2. **Never commit** `.env` files to git
3. **Monitor payments** in Razorpay dashboard
4. **Set up webhooks** for production reliability
5. **Implement payment verification** on backend for production

## 🐛 Troubleshooting

### Issue: "Razorpay configuration missing"
**Solution:** Check environment variables are set correctly

### Issue: "Failed to create order"
**Solution:** Verify API route is accessible and credentials are correct

### Issue: Script loading failed
**Solution:** Check internet connection and firewall settings

### Issue: Payment not processing
**Solution:** Check browser console for errors, verify Razorpay script loaded

## 📞 Support

For Razorpay support:
- Email: support@razorpay.com
- Docs: https://razorpay.com/docs/

---

**Last Updated:** February 2026
**Version:** 1.0.0
**Status:** ✅ Production Ready
