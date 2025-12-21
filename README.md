# Skill Task Assigner

A full-stack task assignment system built with Spring Boot and React, designed with
a clear separation between public read-only access and restricted administrative operations.

## Tech Stack
- Backend: Spring Boot, JPA, MySQL
- Frontend: React, Vite, Axios
- Deployment: Railway (Backend, Database, Frontend)

## Features
- Employee management with skill mapping
- Task creation with required skill
- Automatic task assignment based on employee skills and workload
- Task status workflow: `ASSIGNED → IN_PROGRESS → COMPLETED`
- Real-time workload tracking
- Dashboard with system statistics

## Live Links
- Frontend: https://skill-task-frontend-production.up.railway.app/
- Backend Swagger: https://skill-task-backend-production.up.railway.app/swagger-ui/index.html

---

## Authorization Model (Read-Only Public Access)

This application is deployed in **read-only mode for public users** while protecting
all data-modifying operations.

## ✅ Public (No Authorization Required)
Anyone can:
- View employees
- View tasks
- View dashboard statistics

These operations use **GET APIs** and are intentionally public.

## 🔒 Admin-Only (Write Operations)
The following operations are **restricted**:
- Add employee
- Create task
- Update task status
- Delete employee

All write operations are enforced **server-side** using an admin authorization key
passed via request headers. This ensures production data cannot be modified by
unauthorized users, even if the frontend is tampered with.

## Admin Access (Demo Mode)

For demonstration , admin access can be enabled or disabled
directly from the browser.

### Enable Admin Mode
Open the browser console and run:
```js
localStorage.setItem("ADMIN_KEY", "LOCAL_ADMIN_KEY");
location.reload();
```

### Disable Admin Mode
```js
localStorage.removeItem("ADMIN_KEY");
location.reload();
```

---

## Architecture
React SPA → Spring Boot REST API → MySQL

## Future Improvements
- Authentication
- Pagination
- Caching

> ⚠️ Note  
> The admin toggle is provided for demonstration and interview purposes only.  
> In a real production system, this would be replaced with proper authentication
> and role-based access control (RBAC).
