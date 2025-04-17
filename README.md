# Role-Based Access Control (RBAC) with JWT Authentication

This project demonstrates a simple implementation of Role-Based Access Control (RBAC) in a full-stack application using **React**, **Next.js**, **Vite**, **Node.js**, **Express**, and **MongoDB**.

## Features
- **Authentication System**: 
  - Secure user registration and login functionality.
  - Token-based authentication using JWT.
  - Users can register as **admin**.

- **Role Management**:
  - Admins can create roles.
  - Admins can assign roles to users.

- **Protected Routes**:
  - Admin pages (e.g., Create Role, Assign Role) are protected using **role guards**.
  - Unauthorized users are redirected to an Unauthorized page.

## Frontend (React, Next.js, Vite)
The frontend was built using **React**, **Next.js**, and **Vite**. It uses Context API to manage authentication state.

### Pages
- **Home Page** (`/`): Login and Register links
- **Login Page** (`/login`): User login and token-based authentication
- **Register Page** (`/register`): Admin registration
- **Dashboard Page** (`/dashboard`): Protected page accessible by logged-in users
- **Admin Pages** (`/admin/create-role`, `/admin/assign-role`): Admin-only role management pages
- **Unauthorized Page** (`/unauthorized`): Redirects unauthorized users

### Context API
The **AuthContext** provides global state for authentication, so that the user can stay logged in across pages.

### Role Guards
**withRoleGuard** is a Higher-Order Component (HOC) that protects routes based on the user's role. For example:
```js
export default withRoleGuard(PageComponent, ['admin']);
