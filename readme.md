# Codyssey

Codyssey is a dynamic E-learning platform designed to meet the diverse goals and preferences of programming learners. By using a personalized questionnaire, the platform recommends tailored roadmaps that guide users through structured stages of learning—including educational content and interactive quizzes—to ensure a focused, goal-oriented experience.

---

## Codyssey API

### Key Features

- **Multi-Role System**: Supports Students, Academies, Content Managers, and Admins
- **Roadmap-Based Learning**: Structured, progressive content and quiz stages
- **Certificate Generation**: Automatically issued upon roadmap completion (PDF)
- **Appointment Scheduling**: Book exams with registered academies
- **Personalized Recommendations**: Survey-driven roadmap suggestions
- **Analytics Dashboards**: Insights for academies and platform admins

---

## Authentication and User Management

- JWT-based authentication with email verification
- Password reset and secure session handling
- Role-based access control
- Profile and settings management

---

## Learning System

- Custom roadmaps with content and quiz stages
- Real-time progress tracking
- PDF certificate generation using Puppeteer
- Smart personalized learning paths based on survey results

---

## Academy System

- Student appointment scheduling and exam scoring
- Location-based services and filtering
- Monthly performance analytics and trends

---

## Admin System

- User role management including approval and revocation
- System-wide analytics and platform metrics
- Global notifications and content oversight

---

## Content Manager System

- Create, edit, and delete roadmaps
- Manage and update roadmap content
- Assign stages to specific roadmaps
- Review student feedback and improve material

---

## Core Controllers

### 1. `authController.js`
Handles all authentication workflows:

- `login`, `signUp`, `verifyEmail`
- `forgotPassword`, `resetPassword`, `checkAuth`
- Includes password hashing, JWT authentication, CSRF protection, and rate limiting

### 2. `userController.js`
Manages user profile data:

- `updateUser` with password verification
- `getSettings` based on user role
- `getNotification` for system alerts

### 3. `roadmapsController.js`
Implements the core roadmap system:

- Full CRUD operations for roadmaps and stages
- Stage reordering and validation logic
- Atomic operations with MongoDB transactions

### 4. `studentController.js`
Student-specific functionality:

- Roadmap enrollment and progress tracking
- Appointment booking
- Certificate generation (PDF)
- Questionnaire handling and recommendations

### 5. `academyController.js`
Academy dashboard and reporting:

- Student metrics and trends
- Geographic breakdowns
- Appointment management and exam results

### 6. `adminController.js`
Administrative control panel:

- Manage user roles and permissions
- Platform-wide statistics and analytics
- Monitor roadmap usage and engagement

### 7. `contentManagerController.js`
Tools for content managers:

- View and manage assigned roadmaps
- Enforce content-level access control

---

## Technical Patterns and Architecture

### Role-Based Design

- Permission-based controller logic
- Role-differentiated data responses
- Modular and secure access handling

### Aggregation Pipelines

- MongoDB aggregations for reporting and statistics
- Optimized queries with custom pipeline stages

### Transaction Management

- Multi-document MongoDB transactions
- Robust rollback support with sessions

### Security Practices

- Input validation and data sanitization
- Password confirmation for sensitive actions
- Centralized and consistent error handling

### File Handling

- PDF generation via Puppeteer for certificates
- Streamed file response with temporary cleanup

---

## Error Handling

- Custom `AppError` class for consistency
- Centralized Express middleware
- Clean, descriptive error messages with appropriate HTTP status codes

---

## Scalability and Maintainability

### Database Optimization

- Indexing on frequent queries
- Lean queries and selective population

### Performance

- Use of `Promise.all` for parallel execution
- Cached data for high-frequency endpoints
- Optimized aggregation pipelines

### Maintainable Design

- Modularized controllers and logic layers
- Unified response structures across endpoints
- Graceful error propagation and logging

---

## Frontend Overview

Codyssey’s frontend is built using **React.js**, with a clean and modern design powered by **Tailwind CSS** and animated using **Framer Motion**.

### Key Frontend Features

- **React Query** for data fetching and cache management
- **Reusable UI components** for roadmaps, dashboards, and quiz stages
- **Role-based navigation and views** (Student, Academy, Admin, Content Manager)
- **Real-time feedback and progress tracking**
- **Responsive design** for mobile and desktop experiences
- **State management** integrated with hooks and context providers

The frontend is directly integrated with the API, providing a seamless and fast experience with minimal page reloads and intelligent background updates via React Query.

---

Codyssey is designed for flexibility, performance, and clarity—providing learners, academies, and admins with a cohesive and powerful educational experience.


## 📄 Additional Resources

- [View Full Project Documentation](https://docs.google.com/document/d/1TST3C8EyvG7oocJ8vWQJm1UulqQXnyk0-VoXDkiChJw)

"""