# HelpGhar — Home Services at Your Doorstep

**HelpGhar** is a web-based service platform designed to connect customers with verified home service providers[cite: 1]. The system facilitates the end-to-end process of discovering, booking, paying for, and reviewing skilled workers across a broad range of domestic and professional categories, including maids, drivers, plumbers, electricians, and tutors[cite: 1].

## 🏗 System Overview

The project is developed in adherence to **IEEE Standard 1016-2009** for Software Design Descriptions and the **IEEE 830** standard for Software Requirements Specifications[cite: 1]. It utilizes a **Microservice Architecture** deployed within a **3-Tier Client-Server structure** to ensure modularity, scalability, and fault isolation[cite: 1].

### Architecture Layers
*   **Presentation Layer**: Web Portal rendered on Android and Desktop clients for all user roles[cite: 1].
*   **Application Layer**: API Gateway managing six independent backend microservices (Authentication, Booking, Payment, Tracking, Recommendation, and Administration)[cite: 1].
*   **Data Layer**: Dedicated databases per microservice ensuring isolation and independent scalability[cite: 1].

---

## 🛠 Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, JavaScript, Bootstrap[cite: 1] |
| **Backend** | Node.js, Express.js[cite: 1] |
| **Database** | MySQL / MongoDB[cite: 1] |
| **Containerization** | Docker, Kubernetes[cite: 1] |
| **Security** | SSL/TLS, JWT, bcrypt (password hashing)[cite: 1] |
| **Cloud Hosting** | AWS EC2 / Firebase[cite: 1] |
| **Caching** | Redis[cite: 1] |

---

## ✨ Key Features

*   **Dual-Role Account Management**: A single account can function as both a Customer and a Worker with a seamless toggle switch[cite: 1].
*   **User Verification & Registration**: Multi-step onboarding with mandatory CNIC and certificate uploads for workers, followed by admin approval[cite: 1].
*   **Service Booking & Scheduling**: Real-time availability checks and conflict-free scheduling to prevent double-bookings[cite: 1].
*   **Payment & Transaction Management**: SSL-encrypted pipeline supporting credit/debit cards and digital wallets (Google Pay, JazzCash) via an escrow model[cite: 1].
*   **Work Tracking & Incentive System**: Real-time job status updates (Started, In Progress, Completed) with automated performance-based rewards[cite: 1].
*   **Worker Recommendation & Review**: Algorithmic suggestions based on location, skill, and average ratings[cite: 1].
*   **Admin Management & Dispute Handling**: Centralized control panel for user governance, audit-ready dispute history, and platform analytics[cite: 1].

---

## 👥 System Users

1.  **Customer**: Browses categories, views worker profiles, books services, and makes secure payments[cite: 1].
2.  **Worker**: Manages service listings, updates job status, and tracks earnings and incentive points[cite: 1].
3.  **Administrator**: Verifies workers, resolves disputes, issues refunds, and monitors system-wide analytics[cite: 1].

---

## 🛡 Security & Constraints

*   **Data Protection**: Enforced SSL/TLS encryption for all client-server communication to protect sensitive financial data[cite: 1].
*   **Access Control**: Role-Based Access Control (RBAC) ensures users only access features within their authorized scope[cite: 1].
*   **Reliability**: High-availability infrastructure with daily automated cloud backups to secure storage[cite: 1].

