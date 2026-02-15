# 🚀 Quick Start - Test Razorpay Integration

## Prerequisites
✅ Razorpay SDK installed (`npm install razorpay`)
✅ Environment variables configured
✅ Dev server running (`npm run dev`)

## Testing Locally

### 1. Start Development Server
```bash
npm run dev
```

### 2. Navigate to Donation Page
Open your browser and go to the donation page (usually `/donate`)

### 3. Fill Donation Form
- Select amount: ₹500, ₹1000, or enter custom amount
- Enter donor details:
  - Name: Test User
  - Email: test@example.com
  - Phone: 9876543210

### 4. Click "Donate Now"
The Razorpay checkout modal will open

### 5. Use Test Payment Methods

#### Test Cards (Success)
```
Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: Any future date (e.g., 12/25)
```

#### Test UPI
```
UPI ID: success@razorpay
```

#### Test Netbanking
- Select any bank
- Use credentials: `success` / `success`

### 6. Verify Payment Success
After successful payment, you should see:
- ✅ Alert: "Payment Successful! Payment ID: pay_xxxxx"
- ✅ Console logs with payment details
- ✅ Success invoice/receipt displayed

## Expected Console Output

```javascript
✅ Razorpay script loaded
✅ Order created successfully: order_xxxxxxxxxxxxx
✅ Payment successful!
Payment ID: pay_xxxxxxxxxxxxx
Order ID: order_xxxxxxxxxxxxx
Signature: signature_hash_xxxxxxxxxxxxx
```

## Testing Payment Failure

Use this test card to simulate failure:
```
Card Number: 4000 0000 0000 0002
CVV: 123
Expiry: Any future date
```

Expected result: Payment will fail with error message

## Testing Payment Cancellation

1. Click "Donate Now"
2. Close the Razorpay modal without completing payment
3. Expected: Error message "Payment cancelled"

## Verifying in Razorpay Dashboard

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Login with your test account
3. Navigate to **Transactions** → **Payments**
4. You should see your test payments listed

## Common Issues & Solutions

### Issue: "Failed to load payment gateway"
**Solution:** Check internet connection, verify Razorpay script URL is accessible

### Issue: "Razorpay configuration missing"
**Solution:** 
- Verify `.env` file exists with `VITE_RAZORPAY_KEY_ID`
- Restart dev server after changing `.env`

### Issue: "Failed to create order"
**Solution:**
- Check if `/api/create-order` endpoint is accessible
- Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`
- Check console for detailed error messages

### Issue: API route 404 error
**Solution:**
- Ensure `api/create-order.js` file exists
- For local testing, you may need to use Vercel CLI: `vercel dev`

## Testing with Vercel CLI (Recommended for Local Testing)

For better local testing of serverless functions:

```bash
# Install Vercel CLI
npm install -g vercel

# Run development server with serverless functions
vercel dev
```

This will run your app with Vercel's serverless function emulation locally.

## Next Steps

✅ Test all payment methods (Card, UPI, Netbanking)
✅ Test error scenarios
✅ Verify payment data in console
✅ Check Razorpay dashboard for transactions
✅ Test on mobile devices
✅ Deploy to Vercel and test in production environment

## Production Checklist

Before going live:
- [ ] Replace TEST credentials with LIVE credentials
- [ ] Update environment variables in Vercel
- [ ] Test with real payment methods
- [ ] Set up webhooks for payment verification
- [ ] Implement proper error logging
- [ ] Add payment confirmation emails
- [ ] Set up payment reconciliation

---

**Happy Testing! 🎉**
