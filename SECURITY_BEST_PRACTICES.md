# 🔒 Security Best Practices - Razorpay Production

## ✅ Security Checklist

### 🔐 **API Keys & Secrets**

- [ ] **NEVER** commit `.env` files to git
- [ ] Use LIVE keys only in production
- [ ] Store secrets in environment variables
- [ ] Rotate keys periodically
- [ ] Never expose `RAZORPAY_KEY_SECRET` on frontend
- [ ] Use different keys for development and production

### 🌐 **HTTPS & SSL**

- [ ] Enable HTTPS on both frontend and backend
- [ ] Use valid SSL certificates (Let's Encrypt)
- [ ] Redirect HTTP to HTTPS
- [ ] Enable HSTS (HTTP Strict Transport Security)
- [ ] Use secure cookies (if applicable)

### 🛡️ **CORS Configuration**

```javascript
// ✅ GOOD - Specific origin
const corsOptions = {
    origin: 'https://yourdomain.com',
    credentials: true
};

// ❌ BAD - Allows all origins
const corsOptions = {
    origin: '*'
};
```

### 🚦 **Rate Limiting**

```javascript
const rateLimit = require('express-rate-limit');

// Payment endpoint rate limiting
const paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per IP
    message: 'Too many payment requests'
});

app.use('/api/payment/create-order', paymentLimiter);
app.use('/api/payment/verify', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10
}));
```

### ✅ **Input Validation**

```javascript
// Validate all inputs
const validateDonation = (req, res, next) => {
    const { amount, donorDetails } = req.body;
    
    // Amount validation
    if (!amount || amount < 1 || amount > 1000000) {
        return res.status(400).json({
            success: false,
            message: 'Invalid amount'
        });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorDetails.email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email'
        });
    }
    
    // Phone validation (Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(donorDetails.phone)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid phone number'
        });
    }
    
    next();
};

router.post('/create-order', validateDonation, async (req, res) => {
    // ... handler code
});
```

### 🔍 **Signature Verification**

```javascript
// Always use timing-safe comparison
const crypto = require('crypto');

const isAuthentic = crypto.timingSafeEqual(
    Buffer.from(expectedSign),
    Buffer.from(razorpay_signature)
);

// ❌ NEVER use simple string comparison
// if (expectedSign === razorpay_signature) // VULNERABLE TO TIMING ATTACKS
```

### 📝 **Logging & Monitoring**

```javascript
// ✅ GOOD - Log without sensitive data
console.log('Payment created:', {
    order_id: order.id,
    amount: order.amount,
    timestamp: new Date()
});

// ❌ BAD - Logs sensitive data
console.log('Payment created:', {
    razorpay_key_secret: process.env.RAZORPAY_KEY_SECRET, // NEVER DO THIS
    full_order: order // May contain sensitive data
});
```

### 🗄️ **Database Security**

```javascript
// Sanitize inputs before database operations
const sanitize = require('mongo-sanitize');

const saveDonation = async (data) => {
    const cleanData = {
        donor_name: sanitize(data.name),
        donor_email: sanitize(data.email),
        amount: parseInt(data.amount),
        // ... other fields
    };
    
    await Donation.create(cleanData);
};
```

### 🔐 **Environment Variables**

```bash
# ✅ GOOD - Specific values
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=https://yourdomain.com

# ❌ BAD - Hardcoded in code
const razorpay = new Razorpay({
    key_id: 'rzp_live_xxxxx', // NEVER HARDCODE
    key_secret: 'xxxxxxxx'
});
```

### 🚫 **Error Handling**

```javascript
// ✅ GOOD - Generic error messages in production
try {
    // ... code
} catch (error) {
    console.error('Error:', error); // Log internally
    res.status(500).json({
        success: false,
        message: 'An error occurred' // Generic message to user
    });
}

// ❌ BAD - Exposes internal errors
catch (error) {
    res.status(500).json({
        success: false,
        error: error.stack // EXPOSES INTERNAL DETAILS
    });
}
```

### 🔒 **Webhook Security**

```javascript
// Always verify webhook signature
router.post('/webhook', (req, res) => {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    // Verify signature
    const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');
    
    const isAuthentic = crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(webhookSignature)
    );
    
    if (!isAuthentic) {
        return res.status(400).json({ success: false });
    }
    
    // Process webhook
    // ...
});
```

---

## 🚨 Common Security Mistakes

### ❌ **1. Exposing Secret Key**

```javascript
// NEVER DO THIS
const RazorpayButton = () => {
    const options = {
        key: 'rzp_live_xxxxx',
        key_secret: 'xxxxxxxx' // ❌ SECRET EXPOSED ON FRONTEND
    };
};
```

### ❌ **2. No Signature Verification**

```javascript
// NEVER DO THIS
router.post('/verify', (req, res) => {
    // ❌ Accepting payment without verification
    res.json({ success: true });
});
```

### ❌ **3. Weak CORS**

```javascript
// NEVER DO THIS
app.use(cors({
    origin: '*' // ❌ Allows any origin
}));
```

### ❌ **4. No Rate Limiting**

```javascript
// NEVER DO THIS
router.post('/create-order', async (req, res) => {
    // ❌ No rate limiting - vulnerable to abuse
});
```

### ❌ **5. Logging Sensitive Data**

```javascript
// NEVER DO THIS
console.log('Payment:', {
    secret: process.env.RAZORPAY_KEY_SECRET, // ❌
    signature: razorpay_signature // ❌
});
```

---

## ✅ Security Implementation Example

```javascript
// Complete secure payment route
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// Rate limiter
const paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order with validation
router.post('/create-order',
    paymentLimiter,
    [
        body('amount').isNumeric().isFloat({ min: 1, max: 1000000 }),
        body('donorDetails.email').isEmail(),
        body('donorDetails.phone').matches(/^[6-9]\d{9}$/),
        body('donorDetails.name').trim().isLength({ min: 2, max: 100 })
    ],
    async (req, res) => {
        // Validate inputs
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input'
            });
        }

        try {
            const { amount, donorDetails } = req.body;

            // Create order
            const order = await razorpay.orders.create({
                amount: Math.round(amount * 100),
                currency: 'INR',
                receipt: `receipt_${Date.now()}`,
                notes: {
                    donor_name: donorDetails.name,
                    donor_email: donorDetails.email
                }
            });

            // Log without sensitive data
            console.log('Order created:', order.id);

            res.json({
                success: true,
                order_id: order.id,
                amount: order.amount,
                currency: order.currency,
                key_id: process.env.RAZORPAY_KEY_ID
            });

        } catch (error) {
            console.error('Order creation error:', error.message);
            res.status(500).json({
                success: false,
                message: 'Failed to create order'
            });
        }
    }
);

// Verify payment with signature check
router.post('/verify',
    rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }),
    async (req, res) => {
        try {
            const {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            } = req.body;

            // Validate inputs
            if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing parameters'
                });
            }

            // Verify signature
            const sign = razorpay_order_id + '|' + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(sign)
                .digest('hex');

            const isAuthentic = crypto.timingSafeEqual(
                Buffer.from(expectedSign),
                Buffer.from(razorpay_signature)
            );

            if (isAuthentic) {
                console.log('Payment verified:', razorpay_payment_id);
                res.json({
                    success: true,
                    payment_id: razorpay_payment_id
                });
            } else {
                console.error('Invalid signature');
                res.status(400).json({
                    success: false,
                    message: 'Invalid signature'
                });
            }

        } catch (error) {
            console.error('Verification error:', error.message);
            res.status(500).json({
                success: false,
                message: 'Verification failed'
            });
        }
    }
);

module.exports = router;
```

---

## 🔐 .gitignore Configuration

```gitignore
# Environment files
.env
.env.local
.env.production
.env.development
backend/.env
backend/.env.local
backend/.env.production

# Razorpay keys
rzp-key.csv
razorpay-keys.txt

# Logs
*.log
logs/

# Dependencies
node_modules/

# Build
dist/
build/

# IDE
.vscode/
.idea/
```

---

## 📋 Security Audit Checklist

### Before Going Live

- [ ] All secrets in environment variables
- [ ] HTTPS enabled on all endpoints
- [ ] CORS configured with specific origins
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Signature verification working
- [ ] Webhook signature verification enabled
- [ ] Error messages don't expose internals
- [ ] Logging doesn't include sensitive data
- [ ] .gitignore includes all secret files
- [ ] Database queries sanitized
- [ ] SSL certificates valid
- [ ] Security headers configured
- [ ] Regular security updates scheduled

---

## 🛡️ Additional Security Measures

### 1. **Security Headers**

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 2. **Request Size Limiting**

```javascript
app.use(express.json({ limit: '10kb' }));
```

### 3. **SQL Injection Prevention**

```javascript
// Use parameterized queries
const query = 'INSERT INTO donations (amount, email) VALUES (?, ?)';
db.query(query, [amount, email]);
```

### 4. **XSS Prevention**

```javascript
const xss = require('xss-clean');
app.use(xss());
```

---

## 🆘 Security Incident Response

### If Secret Key is Compromised

1. **Immediately** regenerate keys in Razorpay dashboard
2. Update environment variables
3. Redeploy application
4. Review recent transactions
5. Contact Razorpay support
6. Audit access logs
7. Document incident

---

## 📞 Security Resources

- **Razorpay Security:** https://razorpay.com/docs/security/
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Node.js Security:** https://nodejs.org/en/docs/guides/security/

---

**Remember: Security is not a one-time setup, it's an ongoing process!**

🔒 **Stay Secure, Stay Updated!**
