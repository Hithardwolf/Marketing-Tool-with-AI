# 🎨 AI Marketing Tool

An AI-powered marketing tool that automatically generates professional posters using OpenAI's DALL-E and provides analytics tracking across social media platforms.

![Project Banner](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-10-red?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![AI](https://img.shields.io/badge/OpenAI-DALL--E--3-green?style=for-the-badge&logo=openai)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The AI Marketing Tool is a full-stack web application designed to streamline social media content creation for marketing teams. It leverages artificial intelligence to generate professional marketing posters from simple text prompts, eliminating the need for design skills or expensive software.

### Problem Statement

Marketing teams typically spend 2-3 hours creating each social media poster, requiring:
- Expensive design software subscriptions
- Professional design skills
- Manual posting to multiple platforms
- Separate analytics tracking tools

### Solution

Our tool automates the entire workflow:
1. **AI Generation**: Create posters in 30-60 seconds with text prompts
2. **Centralized Management**: Manage all content from one dashboard
3. **Analytics Tracking**: Monitor performance across platforms
4. **Cost Effective**: Reduce content creation time by 80%

---

## ✨ Features

### Current Features (MVP)

- ✅ **User Authentication**
  - Secure registration and login
  - Password hashing with bcrypt
  - Session management

- ✅ **AI Poster Generation**
  - OpenAI DALL-E 3 integration
  - Natural language prompts
  - High-quality 1024x1024px images
  - 30-60 second generation time

- ✅ **Poster Library**
  - View all generated posters
  - Organized gallery view
  - Timestamp tracking
  - User-specific content

- ✅ **Analytics Dashboard**
  - Performance metrics display
  - Platform comparison
  - Engagement tracking
  - Visual data representation

- ✅ **Responsive Design**
  - Mobile-friendly interface
  - Modern gradient UI
  - Smooth animations
  - Intuitive navigation

### Upcoming Features

- 🔄 Real social media API integration (Facebook, Instagram, Twitter)
- 🔄 Scheduled posting
- 🔄 Poster editing tools
- 🔄 Template library
- 🔄 Team collaboration
- 🔄 A/B testing
- 🔄 Advanced analytics with ML insights

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: Next.js App Router

### Backend
- **Framework**: NestJS 10
- **Language**: TypeScript
- **Runtime**: Node.js 20+
- **Authentication**: Bcrypt
- **AI Integration**: OpenAI API (DALL-E 3)

### Database (MVP)
- **Type**: File-based JSON storage
- **Production Ready**: PostgreSQL migration path

### DevOps
- **Version Control**: Git
- **Package Manager**: npm
- **Development**: Hot reload on both ends

---

## 🏗️ System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (Browser)                  │
│                        Next.js 15                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Login   │  │Dashboard │  │Analytics │  │  Poster  │   │
│  │  Page    │  │   Page   │  │   Page   │  │  Gallery │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend Server (NestJS)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │     Auth     │  │   Poster     │  │   Database   │     │
│  │  Controller  │  │  Controller  │  │   Service    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬───────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   JSON DB    │ │  OpenAI API  │ │Social Media  │
│  (File-based)│ │  (DALL-E 3)  │ │APIs (Future) │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Data Flow

1. **User Registration/Login**
```
   User → Frontend → Backend Auth Controller → Hash Password → Store in DB
```

2. **Poster Generation**
```
   User Prompt → Frontend → Backend Poster Controller → OpenAI API 
   → Receive Image → Store URL → Return to Frontend → Display
```

3. **View Posters**
```
   User Request → Frontend → Backend → Read from DB → Filter by User → Return
```

---

## 💻 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v20.x or higher ([Download](https://nodejs.org/))
- **npm**: v10.x or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/)

### Step 1: Clone Repository
```bash
git clone <your-repository-url>
cd marketing-tool
```

### Step 2: Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Or on Windows PowerShell:
New-Item -ItemType File -Path ".env" -Force
```

Edit `backend/.env`:
```env
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
NODE_ENV=development
```

### Step 3: Frontend Setup
```bash
# Navigate to frontend (from project root)
cd ../frontend

# Install dependencies
npm install
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🚀 Usage

### 1. Create an Account

1. Navigate to `http://localhost:3000`
2. Click "Create new account"
3. Enter email and password (minimum 6 characters)
4. Click "Create Account"

### 2. Generate Your First Poster

1. After login, you'll see the dashboard
2. Enter a descriptive prompt in the text box:
```
   Example: "Summer beach sale with palm trees, sunset colors, and tropical vibes"
```
3. Click "✨ Generate Poster"
4. Wait 30-60 seconds for AI to create your poster
5. Your poster will appear in the gallery below

### 3. View Analytics

1. Click "📊 Analytics" button in the top navigation
2. View performance metrics:
   - Total posts
   - Total views
   - Total likes and shares
   - Average engagement rate
3. See platform-wise performance breakdown
4. Review recent posts performance table

### 4. Logout

Click "Logout" button in the top right corner

---

## 📚 API Documentation

### Base URL
```
http://localhost:3001
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "User registered successfully",
  "userId": 1732178924567,
  "email": "user@example.com"
}
```

**Error Responses:**
- `400`: Email and password required
- `409`: User already exists

---

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "userId": 1732178924567,
  "email": "user@example.com"
}
```

**Error Responses:**
- `400`: Email and password required
- `401`: Invalid credentials

---

### Poster Endpoints

#### Generate Poster
```http
POST /posters/generate
```

**Request Body:**
```json
{
  "userId": 1732178924567,
  "prompt": "Summer beach sale with tropical vibes"
}
```

**Response (200):**
```json
{
  "id": 1732179024567,
  "userId": 1732178924567,
  "prompt": "Summer beach sale with tropical vibes",
  "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/...",
  "createdAt": "2024-11-20T10:30:45.567Z"
}
```

**Error Responses:**
- `400`: User ID and prompt required
- `503`: OpenAI API key not configured
- `401`: Invalid OpenAI API key
- `429`: OpenAI rate limit exceeded

---

#### Get User Posters
```http
GET /posters/user/:userId
```

**Parameters:**
- `userId` (path): User ID

**Response (200):**
```json
[
  {
    "id": 1732179024567,
    "userId": 1732178924567,
    "prompt": "Summer beach sale",
    "imageUrl": "https://...",
    "createdAt": "2024-11-20T10:30:45.567Z"
  }
]
```

**Error Responses:**
- `400`: Invalid user ID

---

#### Get All Posters
```http
GET /posters
```

**Response (200):**
```json
[
  {
    "id": 1732179024567,
    "userId": 1732178924567,
    "prompt": "Summer beach sale",
    "imageUrl": "https://...",
    "createdAt": "2024-11-20T10:30:45.567Z"
  }
]
```

---

## 📁 Project Structure
```
marketing-tool/
├── backend/
│   ├── database/              # Auto-generated JSON database
│   │   ├── users.json         # User data storage
│   │   └── posters.json       # Poster data storage
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.module.ts
│   │   ├── poster/            # Poster generation module
│   │   │   ├── poster.controller.ts
│   │   │   └── poster.module.ts
│   │   ├── database/          # Database service
│   │   │   └── db.service.ts
│   │   ├── app.module.ts      # Root module
│   │   └── main.ts            # Application entry point
│   ├── .env                   # Environment variables
│   ├── .eslintrc.js          # ESLint configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json          # Dependencies and scripts
│
├── frontend/
│   ├── app/
│   │   ├── login/            # Login/Register page
│   │   │   └── page.tsx
│   │   ├── dashboard/        # Main dashboard
│   │   │   └── page.tsx
│   │   ├── analytics/        # Analytics page
│   │   │   └── page.tsx
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page (redirects)
│   ├── public/               # Static assets
│   ├── tailwind.config.ts    # Tailwind configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json          # Dependencies and scripts
│
├── README.md                  # This file
├── SETUP.md                   # Detailed setup guide
└── API.md                     # API documentation
```

---

## 📸 Screenshots

### Login Page
![Login Page](path/to/screenshot-login.png)
*Modern authentication interface with gradient background*

### Dashboard
![Dashboard](path/to/screenshot-dashboard.png)
*Main workspace with poster generation and gallery view*

### Analytics
![Analytics](path/to/screenshot-analytics.png)
*Performance metrics and platform analytics*

---

## 🔮 Future Enhancements

### Phase 2 (Weeks 2-4)
- [ ] PostgreSQL database integration
- [ ] JWT token authentication
- [ ] Facebook/Instagram Graph API integration
- [ ] Real-time analytics fetching
- [ ] Poster editing tools (crop, resize, filters)

### Phase 3 (Months 2-3)
- [ ] Scheduled posting feature
- [ ] Template library with categories
- [ ] Team collaboration (multi-user workspaces)
- [ ] A/B testing for posters
- [ ] Advanced analytics dashboard
- [ ] Export reports (PDF/CSV)

### Phase 4 (Months 4-6)
- [ ] Video poster generation
- [ ] GPT-4 integration for caption generation
- [ ] Mobile application (React Native)
- [ ] White-label solution for agencies
- [ ] Marketplace for templates
- [ ] Multi-language support

---

## 💰 Cost Analysis

### Development Costs (MVP)
- **Time**: 1 week (50 hours)
- **Tools**: Free (VS Code, Node.js, Git)
- **Testing**: OpenAI API ($5-20)

### Production Monthly Costs
- **OpenAI API**: $50-200 (usage-based, ~1000-5000 images)
- **Hosting**: 
  - Vercel (Frontend): $0-20
  - Railway/Render (Backend): $5-25
- **Database**: PostgreSQL $10-25
- **File Storage**: AWS S3 $5-10
- **Total**: **$70-280/month**

### ROI Calculation
- **Time Saved**: 10 hours/week for typical marketing team
- **Cost Saved**: $500-1000/month (compared to hiring designer)
- **Break-even**: Month 1

---

## 🧪 Testing

### Run Tests
```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

### Manual Testing Checklist

- [ ] User registration with valid email
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Generate poster with simple prompt
- [ ] Generate poster with complex prompt
- [ ] View generated posters in gallery
- [ ] Navigate to analytics page
- [ ] Logout functionality
- [ ] Redirect to login when not authenticated

---

## 🐛 Troubleshooting

### Backend won't start

**Issue**: `Cannot find module '@nestjs/config'`

**Solution**:
```bash
cd backend
npm install @nestjs/config
```

---

### Frontend connection error

**Issue**: `Network Error` when generating poster

**Solution**:
1. Verify backend is running: `http://localhost:3001`
2. Check CORS settings in `backend/src/main.ts`
3. Restart backend server

---

### OpenAI API errors

**Issue**: `OpenAI API key not configured`

**Solution**:
1. Check `.env` file exists in `backend/`
2. Verify API key starts with `sk-`
3. Ensure no extra spaces in `.env` file
4. Restart backend after changing `.env`

---

### Port already in use

**Issue**: `Port 3001 is already in use`

**Solution** (Windows):
```powershell
# Find process using port
netstat -ano | findstr :3001

# Kill process (replace PID)
taskkill /PID <PID> /F
```

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use meaningful variable names
- Add comments for complex logic
- Format code with Prettier
- Lint with ESLint

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**

- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for DALL-E API
- [NestJS](https://nestjs.com/) team for excellent framework
- [Next.js](https://nextjs.org/) team for React framework
- [Vercel](https://vercel.com/) for hosting platform
- [Anthropic](https://anthropic.com/) Claude for development assistance

---

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

## 🔗 Links

- [Live Demo](https://your-demo-url.vercel.app)
- [Documentation](https://your-docs-url.com)
- [API Reference](./API.md)
- [Setup Guide](./SETUP.md)

---

**Built with ❤️ using Next.js, NestJS, and OpenAI**

**⭐ Star this repo if you found it helpful!**
