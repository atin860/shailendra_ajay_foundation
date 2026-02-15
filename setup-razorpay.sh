#!/bin/bash

# Razorpay Integration Setup Script
# This script sets up both frontend and backend for Razorpay integration

echo "🚀 Setting up Razorpay Payment Integration..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Install Backend Dependencies
echo "${BLUE}📦 Installing backend dependencies...${NC}"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Backend dependencies installed successfully${NC}"
else
    echo "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi
echo ""

# Step 2: Check Backend Environment
echo "${BLUE}🔐 Checking backend environment variables...${NC}"
if [ -f ".env" ]; then
    echo "${GREEN}✅ Backend .env file exists${NC}"
else
    echo "${RED}❌ Backend .env file not found${NC}"
    echo "Creating from .env.example..."
    cp .env.example .env
    echo "${GREEN}✅ Created .env file. Please update with your Razorpay keys.${NC}"
fi
echo ""

# Step 3: Return to root and check frontend
cd ..
echo "${BLUE}🔐 Checking frontend environment variables...${NC}"
if [ -f ".env" ]; then
    echo "${GREEN}✅ Frontend .env file exists${NC}"
else
    echo "${RED}❌ Frontend .env file not found${NC}"
    echo "Please create .env file in project root with VITE_RAZORPAY_KEY and VITE_BACKEND_URL"
fi
echo ""

# Step 4: Summary
echo "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${GREEN}✅ Setup Complete!${NC}"
echo "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1️⃣  Start Backend Server:"
echo "   ${BLUE}cd backend && npm run dev${NC}"
echo ""
echo "2️⃣  Start Frontend (in new terminal):"
echo "   ${BLUE}npm run dev${NC}"
echo ""
echo "3️⃣  Open demo page:"
echo "   ${BLUE}http://localhost:5173/payment-demo${NC}"
echo ""
echo "📖 For detailed documentation, see:"
echo "   ${BLUE}RAZORPAY_INTEGRATION.md${NC}"
echo ""
