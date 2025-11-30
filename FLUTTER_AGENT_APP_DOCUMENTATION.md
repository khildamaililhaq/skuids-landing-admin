# Ekacita Agent Flutter Mobile App Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Design System](#design-system)
3. [Features](#features)
4. [API Specifications](#api-specifications)
5. [Project Structure](#project-structure)
6. [Dependencies](#dependencies)
7. [Setup Guide](#setup-guide)

---

## Project Overview

**App Name:** Ekacita Agent  
**Platform:** Android (Flutter)  
**Target Users:** Recruitment agents for live streaming platforms  
**Purpose:** Manage recruited hosts, track earnings, access marketing tools, and manage team  
**Default Language:** Indonesian  
**Languages Supported:** Indonesian, English, Hindi, Chinese  

---

## Design System

### Color Scheme

The app follows Material Design 3 with the Ekacita color palette:

```dart
// Primary Colors
primary: Color(0xFFCFAA0A)           // Main brand color (Golden)
primaryLight: Color(0xFFF7D96F)      // Primary Container
primaryDark: Color(0xFF8D7200)       // Dark variant
primaryOnColor: Color(0xFFFFFFFF)    // On Primary (White)

// Secondary Colors
secondary: Color(0xFF8E7629)         // Brown
secondaryLight: Color(0xFFE0C276)    // Secondary Container
secondaryDark: Color(0xFF594700)     // Dark variant
secondaryOnColor: Color(0xFFFFFFFF)  // On Secondary

// Tertiary Colors
tertiary: Color(0xFF009A98)          // Teal/Cyan
tertiaryLight: Color(0xFF67D0CE)     // Tertiary Container
tertiaryDark: Color(0xFF004F4C)      // Dark variant
tertiaryOnColor: Color(0xFFFFFFFF)   // On Tertiary

// Backgrounds
background: Color(0xFFFFFCF5)        // Light cream
surface: Color(0xFFFFFFFF)           // White
surfaceVariant: Color(0xFFF6F6EC)    // Light variant

// Text Colors
textPrimary: Color(0xFF1A1A15)       // Dark text
textSecondary: Color(0xFF47473F)     // Medium gray text
textTertiary: Color(0xFF77776D)      // Light gray text

// Status Colors
success: Color(0xFF009A98)           // Green/Teal
error: Color(0xFFB3261E)             // Red
warning: Color(0xFFFFA500)           // Orange
info: Color(0xFF0066CC)              // Blue

// Neutral Palette
neutral10: Color(0xFF1A1A15)
neutral20: Color(0xFF2F2F2A)
neutral30: Color(0xFF47473F)
neutral40: Color(0xFF5F5F56)
neutral50: Color(0xFF77776D)
neutral60: Color(0xFF909086)
neutral70: Color(0xFFAAAA9F)
neutral80: Color(0xFFC5C5BA)
neutral90: Color(0xFFE2E2D7)
neutral95: Color(0xFFF6F6EC)
```

### Typography

```dart
// Font Family
fontFamily: 'Inter'  // Fallback: Roboto

// Text Styles
headline1: TextStyle(fontSize: 32, fontWeight: FontWeight.w700, height: 1.2)
headline2: TextStyle(fontSize: 28, fontWeight: FontWeight.w700, height: 1.2)
headline3: TextStyle(fontSize: 24, fontWeight: FontWeight.w600, height: 1.3)
headline4: TextStyle(fontSize: 20, fontWeight: FontWeight.w600, height: 1.4)
headline5: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, height: 1.4)
headline6: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, height: 1.5)
body1: TextStyle(fontSize: 16, fontWeight: FontWeight.w400, height: 1.7)
body2: TextStyle(fontSize: 14, fontWeight: FontWeight.w400, height: 1.6)
button: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, letterSpacing: 0.02)
caption: TextStyle(fontSize: 12, fontWeight: FontWeight.w400, height: 1.4)
```

### Spacing & Sizing

```dart
// Spacing (in dp)
xs: 4    // Extra small
sm: 8    // Small
md: 12   // Medium
lg: 16   // Large
xl: 24   // Extra large
xxl: 32  // 2X large
xxxl: 48 // 3X large

// Border Radius
radiusSm: 8.0
radiusMd: 12.0
radiusLg: 16.0
radiusXl: 24.0
```

### Shadows

```dart
elevation1: [BoxShadow(color: Colors.black12, blurRadius: 2, offset: Offset(0, 1))]
elevation2: [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2))]
elevation4: [BoxShadow(color: Colors.black15, blurRadius: 8, offset: Offset(0, 4))]
elevation8: [BoxShadow(color: Colors.black12, blurRadius: 16, offset: Offset(0, 8))]
```

---

## Features

### Core Features

#### 1. **Authentication & Onboarding**
- [ ] Phone/Email registration with OTP verification
- [ ] Login with email or phone
- [ ] Social login (Google, Facebook)
- [ ] Password reset functionality
- [ ] Terms & Conditions agreement
- [ ] Profile setup wizard

#### 2. **Dashboard**
- [ ] Key metrics display (earnings, hosts, performance)
- [ ] Quick stats cards
- [ ] Recent activities feed
- [ ] Earnings graph (weekly/monthly/yearly)
- [ ] Performance indicators
- [ ] Quick action buttons

#### 3. **Host Management**
- [ ] View all recruited hosts
- [ ] Host performance metrics
- [ ] Host earnings tracking
- [ ] Host status (active/inactive)
- [ ] Host profile details
- [ ] Host contact information
- [ ] Host documents/verification status

#### 4. **Earnings & Payouts**
- [ ] View total earnings
- [ ] Commission breakdown by host
- [ ] Earnings history with filters
- [ ] Bank account management
- [ ] Withdraw request submission
- [ ] Payout transaction history
- [ ] Earning predictions

#### 5. **Marketing Tools**
- [ ] Generate referral links
- [ ] Copy/share referral code
- [ ] Marketing assets/templates
- [ ] Campaign performance tracking
- [ ] Social media integration
- [ ] Marketing analytics

#### 6. **Team Management**
- [ ] Team statistics
- [ ] Team member list
- [ ] Add new agents
- [ ] Agent performance ranking
- [ ] Communication with team members
- [ ] Team-wide campaigns

#### 7. **Profile & Settings**
- [ ] Edit profile information
- [ ] Change password
- [ ] Notification preferences
- [ ] Language selection (ID, EN, HI, ZH)
- [ ] Theme settings (Light/Dark)
- [ ] Privacy settings
- [ ] Account verification status

#### 8. **Notifications**
- [ ] Push notifications for earnings
- [ ] New host registration alerts
- [ ] Payment reminders
- [ ] Platform announcements
- [ ] Mission updates
- [ ] In-app notification center
- [ ] Notification management

#### 9. **Support & Help**
- [ ] In-app chat support
- [ ] FAQ section
- [ ] Knowledge base
- [ ] Report issues
- [ ] Contact support directly
- [ ] Ticket tracking

#### 10. **Analytics & Reports**
- [ ] Daily/Weekly/Monthly earnings report
- [ ] Host performance analytics
- [ ] Commission tracking
- [ ] Growth statistics
- [ ] Custom date range filters
- [ ] Export reports (PDF/CSV)

---

## API Specifications

### Base URL
```
Production: https://api.ekacita.live/v1
Development: http://localhost:3000/api/v1
```

### Authentication

#### 1. Agent Registration

**Endpoint:** `POST /api/v1/auth/register-agent`

**Request Body:**
```json
{
  "fullName": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (required, international format)",
  "password": "string (required, min 8 chars)",
  "confirmPassword": "string (required)",
  "referralCode": "string (optional)",
  "agreeToTerms": "boolean (required, true)"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Agent registered successfully. Please verify your email.",
  "data": {
    "agentId": "uuid",
    "email": "agent@example.com",
    "phone": "+62812345678",
    "fullName": "John Doe",
    "status": "pending_verification",
    "createdAt": "2025-12-01T10:00:00Z"
  }
}
```

**Errors:**
- `400`: Invalid input
- `409`: Email or phone already exists
- `422`: Validation error

---

#### 2. Email Verification

**Endpoint:** `POST /api/v1/auth/verify-email`

**Request Body:**
```json
{
  "email": "string (required)",
  "otp": "string (required, 6 digits)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "agentId": "uuid",
    "verified": true
  }
}
```

---

#### 3. Agent Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "agentId": "uuid",
    "email": "agent@example.com",
    "fullName": "John Doe",
    "accessToken": "jwt_token_here",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600
  }
}
```

---

#### 4. Refresh Token

**Endpoint:** `POST /api/v1/auth/refresh`

**Headers:**
```
Authorization: Bearer {refreshToken}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token",
    "expiresIn": 3600
  }
}
```

---

#### 5. Logout

**Endpoint:** `POST /api/v1/auth/logout`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Agent Profile

#### 6. Get Agent Profile

**Endpoint:** `GET /api/v1/agents/{agentId}`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "agentId": "uuid",
    "fullName": "John Doe",
    "email": "agent@example.com",
    "phone": "+62812345678",
    "profileImage": "url_to_image",
    "bio": "string",
    "status": "active|inactive|suspended",
    "totalHosts": 25,
    "totalEarnings": 5000.00,
    "monthlyEarnings": 1250.00,
    "commissionRate": 15.5,
    "bankAccount": {
      "accountName": "John Doe",
      "accountNumber": "1234567890",
      "bankName": "Bank XYZ"
    },
    "identityVerified": true,
    "bankVerified": true,
    "createdAt": "2025-01-01T10:00:00Z",
    "updatedAt": "2025-12-01T15:30:00Z"
  }
}
```

---

#### 7. Update Agent Profile

**Endpoint:** `PUT /api/v1/agents/{agentId}`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "string (optional)",
  "phone": "string (optional)",
  "bio": "string (optional)",
  "profileImage": "string|file (optional)",
  "bankAccount": {
    "accountName": "string",
    "accountNumber": "string",
    "bankName": "string",
    "routingNumber": "string (optional)"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... }
}
```

---

#### 8. Upload Profile Image

**Endpoint:** `POST /api/v1/agents/{agentId}/profile-image`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Form Data:**
```
file: binary (image/jpeg, image/png, max 5MB)
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "data": {
    "imageUrl": "https://storage.example.com/profile/agent-id.jpg"
  }
}
```

---

### Dashboard

#### 9. Get Dashboard Statistics

**Endpoint:** `GET /api/v1/agents/{agentId}/dashboard`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```
?period=today|week|month|year  (default: month)
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalEarnings": 5000.00,
    "monthlyEarnings": 1250.00,
    "totalHosts": 25,
    "activeHosts": 23,
    "pendingPayouts": 500.00,
    "statistics": {
      "period": "month",
      "earningsGraph": [
        { "date": "2025-12-01", "amount": 45.50 },
        { "date": "2025-12-02", "amount": 50.25 },
        ...
      ],
      "hostPerformance": [
        {
          "hostId": "uuid",
          "hostName": "Jane Host",
          "earnings": 250.00,
          "commissionEarned": 37.50
        }
      ],
      "conversionRate": 75.5,
      "averageHostEarnings": 200.00
    },
    "recentActivities": [
      {
        "id": "uuid",
        "type": "host_signup|earnings|withdrawal|commission",
        "title": "New host joined",
        "description": "Jane Host registered as your recruited host",
        "amount": 0,
        "timestamp": "2025-12-01T14:30:00Z"
      }
    ]
  }
}
```

---

### Hosts Management

#### 10. Get All Recruited Hosts

**Endpoint:** `GET /api/v1/agents/{agentId}/hosts`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```
?page=1&limit=20&status=active|inactive|all&search=query
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 25,
    "page": 1,
    "limit": 20,
    "hosts": [
      {
        "hostId": "uuid",
        "fullName": "Jane Host",
        "email": "host@example.com",
        "phone": "+62887654321",
        "profileImage": "url",
        "status": "active|inactive",
        "totalEarnings": 5000.00,
        "monthlyEarnings": 1250.00,
        "joinDate": "2025-11-01T10:00:00Z",
        "platforms": ["chamet", "poppo"],
        "verificationStatus": "verified|pending|rejected",
        "lastActiveAt": "2025-12-01T15:00:00Z",
        "performanceScore": 85
      }
    ]
  }
}
```

---

#### 11. Get Host Details

**Endpoint:** `GET /api/v1/agents/{agentId}/hosts/{hostId}`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "hostId": "uuid",
    "fullName": "Jane Host",
    "email": "host@example.com",
    "phone": "+62887654321",
    "profileImage": "url",
    "bio": "string",
    "status": "active",
    "totalEarnings": 5000.00,
    "monthlyEarnings": 1250.00,
    "joinDate": "2025-11-01T10:00:00Z",
    "platforms": [
      {
        "name": "chamet",
        "username": "jane_host_chamet",
        "status": "verified",
        "joinDate": "2025-11-01T10:00:00Z",
        "earningsOnPlatform": 3000.00
      }
    ],
    "verificationDocuments": {
      "idVerified": true,
      "bankVerified": true,
      "faceVerified": true
    },
    "earnings": {
      "totalEarnings": 5000.00,
      "thisMonth": 1250.00,
      "lastMonth": 1100.00,
      "averageDailyEarnings": 42.00
    },
    "performance": {
      "performanceScore": 85,
      "attendanceRate": 92.5,
      "missionCompletionRate": 87.3,
      "viewerRating": 4.8
    },
    "recentEarnings": [
      {
        "date": "2025-12-01",
        "earnings": 45.50,
        "source": "gifts|mission|bonus"
      }
    ]
  }
}
```

---

#### 12. Contact Host

**Endpoint:** `POST /api/v1/agents/{agentId}/hosts/{hostId}/contact`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "method": "whatsapp|email|call|message",
  "message": "string (optional for direct messages)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Contact initiated successfully"
}
```

---

### Earnings & Payouts

#### 13. Get Earnings Summary

**Endpoint:** `GET /api/v1/agents/{agentId}/earnings`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```
?period=today|week|month|year&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalEarnings": 5000.00,
    "periodEarnings": 1250.00,
    "pendingEarnings": 250.00,
    "completedEarnings": 1000.00,
    "breakdown": {
      "commissionsFromHosts": 950.00,
      "bonuses": 100.00,
      "referralBonuses": 50.00,
      "others": 150.00
    },
    "topEarningHosts": [
      {
        "hostId": "uuid",
        "hostName": "Jane Host",
        "earnings": 500.00
      }
    ],
    "dailyEarnings": [
      {
        "date": "2025-12-01",
        "amount": 45.50
      }
    ]
  }
}
```

---

#### 14. Get Earnings History

**Endpoint:** `GET /api/v1/agents/{agentId}/earnings/history`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```
?page=1&limit=20&type=commission|bonus|referral|all
&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD&hostId=uuid
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "earnings": [
      {
        "id": "uuid",
        "type": "commission",
        "amount": 37.50,
        "description": "Commission from Jane Host",
        "hostId": "uuid",
        "hostName": "Jane Host",
        "source": "streaming|mission|gift",
        "transactionDate": "2025-12-01T14:30:00Z",
        "status": "completed|pending"
      }
    ]
  }
}
```

---

#### 15. Get Bank Accounts

**Endpoint:** `GET /api/v1/agents/{agentId}/bank-accounts`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accounts": [
      {
        "id": "uuid",
        "accountName": "John Doe",
        "accountNumber": "1234567890",
        "bankName": "Bank XYZ",
        "routingNumber": "123456",
        "country": "ID",
        "isDefault": true,
        "status": "verified|unverified|failed",
        "createdAt": "2025-11-01T10:00:00Z"
      }
    ]
  }
}
```

---

#### 16. Add Bank Account

**Endpoint:** `POST /api/v1/agents/{agentId}/bank-accounts`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "accountName": "string (required)",
  "accountNumber": "string (required)",
  "bankName": "string (required)",
  "routingNumber": "string (optional)",
  "country": "string (required, ISO 3166-1 alpha-2)",
  "isDefault": "boolean (optional, default: false)"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Bank account added successfully",
  "data": {
    "id": "uuid",
    "status": "unverified"
  }
}
```

---

#### 17. Request Withdrawal

**Endpoint:** `POST /api/v1/agents/{agentId}/withdrawals`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "amount": "number (required, > 100)",
  "bankAccountId": "uuid (required)",
  "description": "string (optional)"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Withdrawal request submitted successfully",
  "data": {
    "withdrawalId": "uuid",
    "amount": 500.00,
    "status": "pending",
    "bankAccount": {
      "accountName": "John Doe",
      "accountNumber": "1234567890"
    },
    "requestedAt": "2025-12-01T15:30:00Z",
    "estimatedCompletionDate": "2025-12-03T00:00:00Z"
  }
}
```

---

#### 18. Get Withdrawal History

**Endpoint:** `GET /api/v1/agents/{agentId}/withdrawals`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```
?page=1&limit=20&status=pending|completed|failed|all
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "withdrawals": [
      {
        "id": "uuid",
        "amount": 500.00,
        "status": "completed|pending|failed",
        "bankAccount": {
          "accountName": "John Doe",
          "accountNumber": "****7890",
          "bankName": "Bank XYZ"
        },
        "requestedAt": "2025-12-01T15:30:00Z",
        "completedAt": "2025-12-03T10:00:00Z",
        "failureReason": "string (if failed)"
      }
    ]
  }
}
```

---

### Marketing Tools

#### 19. Get Referral Information

**Endpoint:** `GET /api/v1/agents/{agentId}/referral`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "referralCode": "AGENT123ABC",
    "referralLink": "https://ekacita.live/register?ref=AGENT123ABC",
    "totalReferrals": 45,
    "successfulReferrals": 42,
    "referralBonus": 2500.00,
    "bonusPerReferral": 50.00,
    "referredAgents": [
      {
        "agentId": "uuid",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "referredAt": "2025-11-15T10:00:00Z",
        "status": "active|inactive",
        "referralBonus": 50.00
      }
    ]
  }
}
```

---

#### 20. Get Marketing Assets

**Endpoint:** `GET /api/v1/agents/{agentId}/marketing-assets`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "assets": [
      {
        "id": "uuid",
        "title": "Agent Recruitment Flyer",
        "description": "Professional flyer for recruiting new agents",
        "type": "image|video|document",
        "format": "jpg|png|pdf|mp4",
        "url": "https://storage.example.com/assets/flyer.jpg",
        "downloadUrl": "https://storage.example.com/assets/flyer-download.jpg",
        "createdAt": "2025-11-01T10:00:00Z"
      }
    ]
  }
}
```

---

#### 21. Share Referral Link

**Endpoint:** `POST /api/v1/agents/{agentId}/referral/share`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "platform": "whatsapp|facebook|instagram|email|sms",
  "message": "string (optional, custom message)"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Sharing link generated successfully",
  "data": {
    "shareUrl": "https://api.example.com/share/xyz123",
    "qrCode": "https://storage.example.com/qr/agent-ref.png"
  }
}
```

---

### Notifications

#### 22. Get Notifications

**Endpoint:** `GET /api/v1/agents/{agentId}/notifications`

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
```
?page=1&limit=20&read=true|false|all
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "unreadCount": 5,
    "notifications": [
      {
        "id": "uuid",
        "type": "earnings|host_signup|payment|announcement|alert",
        "title": "New earnings received",
        "message": "You received $50 commission from Jane Host",
        "data": {
          "amount": 50,
          "hostId": "uuid"
        },
        "read": false,
        "createdAt": "2025-12-01T14:30:00Z"
      }
    ]
  }
}
```

---

#### 23. Mark Notification as Read

**Endpoint:** `PUT /api/v1/agents/{agentId}/notifications/{notificationId}`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "read": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

#### 24. Update Notification Preferences

**Endpoint:** `PUT /api/v1/agents/{agentId}/notification-preferences`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "enablePushNotifications": true,
  "enableEmailNotifications": true,
  "enableSMSNotifications": false,
  "notificationCategories": {
    "earnings": true,
    "hostSignup": true,
    "payment": true,
    "announcement": true,
    "marketing": false
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Notification preferences updated successfully"
}
```

---

### Support

#### 25. Create Support Ticket

**Endpoint:** `POST /api/v1/agents/{agentId}/support/tickets`

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Request Body:**
```
category: string (required, general|technical|payment|account|other)
subject: string (required)
description: string (required)
attachments: file[] (optional, max 5 files, 5MB each)
priority: high|normal|low (optional, default: normal)
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Support ticket created successfully",
  "data": {
    "ticketId": "uuid",
    "ticketNumber": "TK-2025-001234",
    "status": "open",
    "createdAt": "2025-12-01T15:30:00Z",
    "estimatedResponseTime": "2 hours"
  }
}
```

---

#### 26. Get FAQ

**Endpoint:** `GET /api/v1/faq?category=all|general|earnings|hosts|technical`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "faqs": [
      {
        "id": "uuid",
        "question": "How do I recruit a new host?",
        "answer": "You can recruit hosts by...",
        "category": "hosts",
        "views": 1250,
        "helpful": 945,
        "order": 1
      }
    ]
  }
}
```

---

## Project Structure

```
ekacita_agent_app/
├── lib/
│   ├── main.dart
│   ├── config/
│   │   ├── app_config.dart
│   │   ├── api_config.dart
│   │   ├── theme_config.dart
│   │   └── constants.dart
│   ├── core/
│   │   ├── network/
│   │   │   ├── api_client.dart
│   │   │   ├── dio_client.dart
│   │   │   └── interceptors.dart
│   │   ├── storage/
│   │   │   ├── local_storage.dart
│   │   │   ├── secure_storage.dart
│   │   │   └── preferences.dart
│   │   ├── services/
│   │   │   ├── notification_service.dart
│   │   │   ├── location_service.dart
│   │   │   └── analytics_service.dart
│   │   └── utils/
│   │       ├── logger.dart
│   │       ├── validators.dart
│   │       └── formatters.dart
│   ├── data/
│   │   ├── models/
│   │   │   ├── agent_model.dart
│   │   │   ├── host_model.dart
│   │   │   ├── earning_model.dart
│   │   │   └── ...
│   │   ├── datasources/
│   │   │   ├── remote_datasource.dart
│   │   │   ├── local_datasource.dart
│   │   │   └── ...
│   │   └── repositories/
│   │       ├── auth_repository.dart
│   │       ├── agent_repository.dart
│   │       ├── host_repository.dart
│   │       └── ...
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── agent_entity.dart
│   │   │   ├── host_entity.dart
│   │   │   └── ...
│   │   ├── usecases/
│   │   │   ├── auth_usecase.dart
│   │   │   ├── agent_usecase.dart
│   │   │   └── ...
│   │   └── repositories/
│   │       └── (abstract repository interfaces)
│   ├── presentation/
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── login_page.dart
│   │   │   │   ├── register_page.dart
│   │   │   │   └── verify_otp_page.dart
│   │   │   ├── dashboard/
│   │   │   │   └── dashboard_page.dart
│   │   │   ├── hosts/
│   │   │   │   ├── hosts_list_page.dart
│   │   │   │   └── host_detail_page.dart
│   │   │   ├── earnings/
│   │   │   │   ├── earnings_page.dart
│   │   │   │   └── withdraw_page.dart
│   │   │   ├── profile/
│   │   │   │   ├── profile_page.dart
│   │   │   │   └── settings_page.dart
│   │   │   └── ...
│   │   ├── widgets/
│   │   │   ├── common/
│   │   │   │   ├── app_drawer.dart
│   │   │   │   ├── app_bar_widget.dart
│   │   │   │   ├── custom_button.dart
│   │   │   │   ├── custom_card.dart
│   │   │   │   ├── loading_widget.dart
│   │   │   │   ├── error_widget.dart
│   │   │   │   └── empty_state_widget.dart
│   │   │   ├── dashboard/
│   │   │   │   ├── stats_card.dart
│   │   │   │   ├── earnings_chart.dart
│   │   │   │   └── activity_feed.dart
│   │   │   ├── forms/
│   │   │   │   ├── custom_text_field.dart
│   │   │   │   ├── phone_input_field.dart
│   │   │   │   └── date_picker_field.dart
│   │   │   └── ...
│   │   ├── providers/
│   │   │   ├── auth_provider.dart
│   │   │   ├── agent_provider.dart
│   │   │   ├── host_provider.dart
│   │   │   ├── earning_provider.dart
│   │   │   ├── notification_provider.dart
│   │   │   └── ui_provider.dart
│   │   └── theme/
│   │       ├── app_colors.dart
│   │       ├── app_text_styles.dart
│   │       ├── app_themes.dart
│   │       └── app_dimensions.dart
│   └── routes/
│       ├── app_routes.dart
│       ├── route_pages.dart
│       └── navigation_service.dart
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── ic_home.svg
│   │   └── ...
│   ├── icons/
│   │   └── ...
│   ├── animations/
│   │   └── ...
│   └── translations/
│       ├── id.json
│       ├── en.json
│       ├── hi.json
│       └── zh.json
├── test/
│   ├── unit/
│   │   ├── repositories/
│   │   ├── usecases/
│   │   └── ...
│   ├── widget/
│   │   └── ...
│   └── integration/
│       └── ...
├── pubspec.yaml
├── pubspec.lock
├── analysis_options.yaml
└── README.md
```

---

## Dependencies

### pubspec.yaml

```yaml
name: ekacita_agent
description: Ekacita Agent Flutter Mobile Application
publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.0.0
  riverpod: ^2.0.0
  get: ^4.6.0
  
  # HTTP & Networking
  dio: ^5.0.0
  http: ^1.0.0
  
  # Local Storage
  shared_preferences: ^2.0.0
  hive: ^2.0.0
  hive_flutter: ^1.0.0
  
  # Secure Storage
  flutter_secure_storage: ^9.0.0
  
  # Serialization
  json_serializable: ^6.0.0
  built_value: ^8.0.0
  
  # UI & Design
  flutter_screenutil: ^5.0.0
  google_fonts: ^4.0.0
  cupertino_icons: ^1.0.0
  
  # Navigation & Routing
  go_router: ^7.0.0
  auto_route: ^7.0.0
  
  # Localization & Translation
  easy_localization: ^3.0.0
  intl: ^0.18.0
  
  # Date & Time
  intl_datetime_picker: ^1.0.0
  table_calendar: ^3.0.0
  
  # Image Handling
  cached_network_image: ^3.0.0
  image_picker: ^0.8.0
  image_cropper: ^5.0.0
  
  # Charts & Graphs
  fl_chart: ^0.61.0
  charts_flutter: ^0.12.0
  
  # PDF & Document Handling
  pdf: ^3.0.0
  printing: ^5.0.0
  syncfusion_flutter_pdf: ^21.0.0
  
  # Notifications
  firebase_core: ^2.0.0
  firebase_messaging: ^14.0.0
  flutter_local_notifications: ^15.0.0
  
  # Analytics
  firebase_analytics: ^10.0.0
  mixpanel_flutter: ^1.0.0
  
  # Utilities
  logger: ^1.3.0
  connectivity_plus: ^4.0.0
  device_info_plus: ^9.0.0
  package_info_plus: ^4.0.0
  url_launcher: ^6.0.0
  share_plus: ^6.0.0
  
  # QR Code
  qr_flutter: ^4.0.0
  mobile_scanner: ^3.0.0
  
  # Video Player
  video_player: ^2.0.0
  chewie: ^1.0.0
  
  # Social Media Integration
  sign_in_with_google: ^2.0.0
  facebook_flutter: ^0.0.4
  
  # Animations
  lottie: ^2.0.0
  
  # Permission Handling
  permission_handler: ^11.0.0
  
  # Background Tasks
  workmanager: ^0.4.0
  
  # Environment Configuration
  flutter_dotenv: ^5.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0
  
  # Testing
  mockito: ^5.0.0
  build_runner: ^2.0.0
  json_serializable: ^6.0.0
  test: ^1.0.0
  
  # Code Generation
  freezed: ^2.0.0
  freezed_annotation: ^2.0.0
  
  # Performance
  integration_test:
    sdk: flutter

flutter:
  uses-material-design: true
  
  assets:
    - assets/images/
    - assets/icons/
    - assets/animations/
    - assets/translations/
  
  fonts:
    - family: Inter
      fonts:
        - asset: assets/fonts/Inter-Regular.ttf
        - asset: assets/fonts/Inter-Bold.ttf
          weight: 700
        - asset: assets/fonts/Inter-SemiBold.ttf
          weight: 600
```

---

## Setup Guide

### Prerequisites
- Flutter SDK 3.0.0 or higher
- Dart 3.0.0 or higher
- Android SDK (API 21+)
- Java Development Kit (JDK)
- Git

### Installation Steps

1. **Clone Repository**
```bash
git clone https://github.com/ekacita/ekacita-agent-flutter.git
cd ekacita-agent-flutter
```

2. **Install Dependencies**
```bash
flutter pub get
```

3. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Generate Code**
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

5. **Run the App**
```bash
flutter run
```

6. **Build for Production**
```bash
# Build APK
flutter build apk --release

# Build App Bundle (for Play Store)
flutter build appbundle --release
```

---

## API Response Format

All API responses follow this standard format:

```json
{
  "success": true|false,
  "message": "string",
  "data": {},
  "errors": [
    {
      "code": "string",
      "field": "string (optional)",
      "message": "string"
    }
  ],
  "timestamp": "2025-12-01T15:30:00Z",
  "requestId": "uuid"
}
```

---

## Error Codes

```
200 - OK
201 - Created
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
422 - Unprocessable Entity
429 - Too Many Requests
500 - Internal Server Error
502 - Bad Gateway
503 - Service Unavailable
```

---

## Authentication

### JWT Token Format

All authenticated requests require the following header:

```
Authorization: Bearer {accessToken}
```

Tokens expire after 1 hour. Use the refresh endpoint to get a new token.

---

## Rate Limiting

- **Limit:** 1000 requests per hour per agent
- **Headers:**
  - `X-RateLimit-Limit`: 1000
  - `X-RateLimit-Remaining`: 999
  - `X-RateLimit-Reset`: 1640000000

---

## Pagination

For list endpoints that support pagination:

```
?page=1&limit=20&sort=createdAt&order=desc
```

Response includes:
```json
{
  "total": 150,
  "page": 1,
  "limit": 20,
  "totalPages": 8,
  "hasNextPage": true,
  "hasPreviousPage": false
}
```

---

## Performance Optimization

- Images should be cached locally
- Implement pagination for large lists
- Use lazy loading for content
- Implement offline-first architecture with local database
- Batch API requests when possible
- Implement request debouncing

---

## Security Considerations

1. Store JWT tokens in secure storage
2. Implement certificate pinning
3. Use HTTPS for all communications
4. Implement biometric authentication
5. Never store sensitive data in plain text
6. Implement session timeout (15 minutes)
7. Add 2FA support (optional)
8. Validate all user inputs

---

## Testing Strategy

1. **Unit Tests:** Core logic and utilities
2. **Widget Tests:** UI components and pages
3. **Integration Tests:** Full user flows
4. **API Tests:** Endpoint responses

```bash
# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Run integration tests
flutter drive --target=test_driver/app.dart
```

---

## Deployment

### Google Play Store

1. Create signing key
2. Configure app signing in build.gradle
3. Build App Bundle
4. Upload to Play Console
5. Configure store listing
6. Submit for review

### Testing Channels
- **Internal Testing:** All team members
- **Closed Testing:** Beta testers
- **Open Testing:** Public beta
- **Production:** Full release

---

## Monitoring & Analytics

- Firebase Analytics for user behavior
- Crashlytics for crash reporting
- Performance monitoring
- Custom event tracking
- User funnel analysis

---

## Support & Documentation

- **GitHub Issues:** For bug reports
- **Email:** support@ekacita.live
- **In-App Chat:** For real-time support
- **FAQ:** Knowledge base in app

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-01 | Initial release |

---

## License

Copyright © 2025 Ekacita. All rights reserved.

