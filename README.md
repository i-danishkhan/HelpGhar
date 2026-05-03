# HelpGhar — Home Services at Your Doorstep

HelpGhar is a web-based service platform designed to connect customers with verified home service providers. The system facilitates the end-to-end process of discovering, booking, paying for, and reviewing skilled workers across a broad range of domestic and professional categories, including maids, drivers, plumbers, electricians, and tutors.

## System Overview

It utilizes a Microservice Architecture deployed within a 3-Tier Client-Server structure to ensure modularity, scalability, and fault isolation.

### Architecture Layers

- **Presentation Layer:** Web Portal rendered on Android and Desktop clients for all user roles.
- **Application Layer:** API Gateway managing six independent backend microservices (Authentication, Booking, Payment, Tracking, Recommendation, and Administration).
- **Data Layer:** Dedicated databases per microservice ensuring isolation and independent scalability.

## Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Security** | SSL/TLS, JWT, bcrypt (password hashing) |

## Key Features

- **Dual-Role Account Management:** A single account can function as both a Customer and a Worker with a seamless toggle switch.
- **User Verification & Registration:** Multi-step onboarding with mandatory CNIC and certificate uploads for workers, followed by admin approval.
- **Service Booking & Scheduling:** Real-time availability checks and conflict-free scheduling to prevent double-bookings.
- **Payment & Transaction Management:** SSL-encrypted pipeline supporting credit/debit cards and digital wallets (Google Pay, JazzCash) via an escrow model.
- **Work Tracking & Incentive System:** Real-time job status updates (Started, In Progress, Completed) with automated performance-based rewards.
- **Worker Recommendation & Review:** Algorithmic suggestions based on location, skill, and average ratings.
- **Admin Management & Dispute Handling:** Centralized control panel for user governance, audit-ready dispute history, and platform analytics.

## System Users

1. **Customer:** Browses categories, views worker profiles, books services, and makes secure payments.
2. **Worker:** Manages service listings, updates job status, and tracks earnings and incentive points.
3. **Administrator:** Verifies workers, resolves disputes, issues refunds, and monitors system-wide analytics.

## Security & Constraints

- **Data Protection:** Enforced SSL/TLS encryption for all client-server communication to protect sensitive financial data.
- **Access Control:** Role-Based Access Control (RBAC) ensures users only access features within their authorized scope.
- **Reliability:** High-availability infrastructure with daily automated cloud backups to secure storage.
