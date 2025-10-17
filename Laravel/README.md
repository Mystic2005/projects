# Laravel React Admin Panel

A **full-stack web application** with a **Laravel API backend** and **React frontend** for **user management** and **activity log visualization**.

---

## Features

### Backend (Laravel)
- API authentication using **Laravel Sanctum**  
- Role-based user management (viewer, editor, admin)  
- Protected endpoints based on roles  
- Profile image upload with Laravel storage  
- Application logging system with frontend visualization  
- CRUD API routes for all entities  

### Frontend (React)
- Responsive UI with **Bento grid design**  
- Routing with **React Router** and animations with **Framer Motion**  
- Modular components for Login, Register, Profile, Users, and Logs  
- Breadcrumb navigation for usability  
- Role-based route protection  
- Coherent design with custom font *Bitcount Prop Double*  

### Core Functionalities
- User registration and authentication  
- Logout with session invalidation  
- Profile viewing and editing with image upload  
- User management (admin only): delete users, edit roles  
- Application log viewing  
- Modular, reusable component design  

---

## Technologies Used

**Backend:**  
- Laravel 10  
- Laravel Sanctum (API authentication)  
- PHP 8.1+  

**Frontend:**  
- React 18  
- React Router DOM  
- Framer Motion (animations)  
- Axios (HTTP client)  
- Tailwind CSS  

---

## Installation & Setup

1. Clone the repository  
   ```bash
   git clone <repo_url>
```

2. Install backend dependencies

   ```bash
   composer install
   ```
3. Install frontend dependencies

   ```bash
   npm install
   ```
4. Configure `.env` with your database
5. Run migrations

   ```bash
   php artisan migrate
   ```
6. Start backend server

   ```bash
   php artisan serve
   ```
7. Start frontend development server

   ```bash
   npm run dev
   ```

---

## Conclusion

This project demonstrates a **complete admin system** with secure authentication, user management, and activity monitoring.
Its **separated backend-frontend architecture** makes it scalable and easy to extend with new features.
