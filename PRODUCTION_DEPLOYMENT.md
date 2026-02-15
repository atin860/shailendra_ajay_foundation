# 🚀 Production Deployment Guide - Razorpay Integration

## ✅ Pre-Deployment Checklist

### 1️⃣ **Razorpay Account Setup**

- [ ] Create Razorpay account at https://dashboard.razorpay.com/
- [ ] Complete KYC verification
- [ ] Activate LIVE mode
- [ ] Get LIVE API keys (Key ID & Key Secret)
- [ ] Set up webhook endpoint
- [ ] Configure payment methods
- [ ] Set up settlement account

### 2️⃣ **Environment Configuration**

#### Frontend (.env.production)
```env
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
VITE_BACKEND_URL=https://api.yourdomain.com
```

#### Backend (.env or .env.production)
```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### 3️⃣ **Security Checklist**

- [ ] Use HTTPS on both frontend and backend
- [ ] Never expose RAZORPAY_KEY_SECRET
- [ ] Add .env files to .gitignore
- [ ] Enable CORS with specific origins
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Set up error logging
- [ ] Enable webhook signature verification
- [ ] Use environment variables for all secrets
- [ ] Remove all console.logs of sensitive data

---

## 🌐 Deployment Options

### **Option 1: Vercel (Frontend) + Render/Railway (Backend)**

#### Frontend (Vercel)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Build and Deploy**
```bash
# From project root
npm run build
vercel --prod
```

3. **Set Environment Variables in Vercel Dashboard**
- Go to Project Settings → Environment Variables
- Add `VITE_RAZORPAY_KEY_ID`
- Add `VITE_BACKEND_URL`

#### Backend (Render/Railway)

1. **Create render.yaml** (for Render)
```yaml
services:
  - type: web
    name: donation-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && node server.js
    envVars:
      - key: RAZORPAY_KEY_ID
        sync: false
      - key: RAZORPAY_KEY_SECRET
        sync: false
      - key: NODE_ENV
        value: production
```

2. **Deploy to Render**
```bash
# Connect GitHub repo to Render
# Set environment variables in Render dashboard
# Deploy
```

---

### **Option 2: VPS (DigitalOcean/AWS/Linode)**

#### 1. **Server Setup**

```bash
# SSH into your server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### 2. **Deploy Backend**

```bash
# Clone repository
git clone https://github.com/your-repo/donation-project.git
cd donation-project/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
# Add production environment variables

# Start with PM2
pm2 start server.js --name donation-backend
pm2 save
pm2 startup
```

#### 3. **Configure Nginx (Reverse Proxy)**

```bash
sudo nano /etc/nginx/sites-available/donation-backend
```

Add:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/donation-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4. **Setup SSL (Let's Encrypt)**

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

#### 5. **Deploy Frontend**

```bash
# Build frontend
cd /path/to/donation-project
npm run build

# Copy to Nginx web root
sudo cp -r dist/* /var/www/html/
```

Configure Nginx for frontend:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔧 Post-Deployment Configuration

### 1️⃣ **Razorpay Webhook Setup**

1. Go to https://dashboard.razorpay.com/app/webhooks
2. Click "Add New Webhook"
3. Enter webhook URL: `https://api.yourdomain.com/api/payment/webhook`
4. Select events:
   - `payment.captured`
   - `payment.failed`
5. Copy the webhook secret
6. Add to backend `.env`:
   ```env
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

### 2️⃣ **Test Production Payment**

1. Visit your production site
2. Make a small test donation (₹10)
3. Use real payment method
4. Verify payment in Razorpay dashboard
5. Check webhook logs
6. Verify email receipt (if configured)

### 3️⃣ **Monitoring Setup**

#### Add Logging
```javascript
// backend/server.js
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});
```

#### Monitor with PM2
```bash
pm2 logs donation-backend
pm2 monit
```

---

## 🔒 Security Best Practices

### 1. **Rate Limiting**

Add to backend:
```javascript
const rateLimit = require('express-rate-limit');

const paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: 'Too many payment requests, please try again later.'
});

app.use('/api/payment', paymentLimiter);
```

### 2. **CORS Configuration**

```javascript
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

### 3. **Input Validation**

```javascript
const { body, validationResult } = require('express-validator');

router.post('/create-order', [
    body('amount').isNumeric().isFloat({ min: 1 }),
    body('donorDetails.email').isEmail(),
    body('donorDetails.phone').isMobilePhone('en-IN')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // ... rest of code
});
```

---

## 📊 Database Integration (Optional)

### MongoDB Example

```javascript
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    payment_id: String,
    order_id: String,
    donor_name: String,
    donor_email: String,
    donor_phone: String,
    amount: Number,
    donation_type: String,
    status: String,
    created_at: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);

// In verify route
await Donation.create({
    payment_id: razorpay_payment_id,
    order_id: razorpay_order_id,
    donor_name: donorDetails.name,
    donor_email: donorDetails.email,
    donor_phone: donorDetails.phone,
    amount: donorDetails.amount,
    donation_type: donorDetails.donationType,
    status: 'success'
});
```

---

## 📧 Email Receipt Integration

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendDonationReceipt(donorEmail, details) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: donorEmail,
        subject: 'Thank you for your donation!',
        html: `
            <h1>Thank You!</h1>
            <p>Your donation of ₹${details.amount} was successful.</p>
            <p>Payment ID: ${details.payment_id}</p>
        `
    });
}
```

---

## 🧪 Testing Production

### Test Checklist

- [ ] Test with small amount (₹10)
- [ ] Test card payment
- [ ] Test UPI payment
- [ ] Test net banking
- [ ] Test payment failure scenario
- [ ] Verify webhook receives events
- [ ] Check database entry (if configured)
- [ ] Verify email receipt (if configured)
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Check SSL certificate
- [ ] Verify CORS works
- [ ] Test rate limiting

---

## 🆘 Troubleshooting

### Common Issues

**1. CORS Error**
- Check `FRONTEND_URL` in backend `.env`
- Ensure it matches exactly (including https://)

**2. Payment Fails**
- Verify LIVE keys are correct
- Check Razorpay dashboard for errors
- Ensure account is activated

**3. Webhook Not Working**
- Verify webhook URL is accessible
- Check webhook secret is correct
- Review webhook logs in Razorpay dashboard

**4. SSL Issues**
- Renew Let's Encrypt certificate: `sudo certbot renew`
- Check Nginx configuration

---

## 📈 Go Live Checklist

- [ ] Switch to LIVE Razorpay keys
- [ ] Update environment variables
- [ ] Enable HTTPS
- [ ] Configure webhooks
- [ ] Set up monitoring
- [ ] Add error logging
- [ ] Test all payment flows
- [ ] Verify email receipts
- [ ] Check database integration
- [ ] Review security settings
- [ ] Set up backups
- [ ] Document API endpoints
- [ ] Train support team
- [ ] Prepare rollback plan

---

## 🎉 You're Production Ready!

Your Razorpay integration is now production-ready with:

✅ Secure payment processing  
✅ Signature verification  
✅ Webhook support  
✅ Error handling  
✅ Production environment configuration  
✅ Deployment guides  
✅ Security best practices  

**Need Help?**
- Razorpay Docs: https://razorpay.com/docs/
- Razorpay Support: https://razorpay.com/support/

---

**Last Updated:** 2026-02-15  
**Version:** 1.0.0 Production
