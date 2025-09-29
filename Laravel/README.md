# Laravel React Admin Panel

Un proiect full-stack cu Laravel API backend si React frontend pentru managementul utilizatorilor si vizualizarea logurilor.

## Ce am facut in proiect

### Backend (Laravel)
- **Sistem de autentificare** cu Sanctum pentru API
- **Management utilizatori** cu roluri (viewer, editor, admin)
- **Endpoint-uri protejate** bazate pe roluri
- **Upload poze de profil** cu storage in Laravel
- **Sistem de log-uri** cu vizualizare in interfata
- **API routes** pentru toate operatiile CRUD

### Frontend (React)
- **Interfata responsive** cu design bento grid
- **Rutare** cu React Router si animatii Framer Motion
- **Componente pentru fiecare sectiune**: Login, Register, Profile, Users, Logs
- **Breadcrumb navigation** pentru usability
- **Protectie rute** bazata pe roluri
- **Design coerent** cu font custom Bitcount Prop Double

### Functionalitati principale
- **Inregistrare** si autentificare utilizatori
- **Logout** cu invalidare sesiune
- **Vizualizare si editare profil** cu upload imagine
- **Management utilizatori** (doar admin) - stergere, editare roluri
- **Vizualizare log-uri** aplicatie
- **Design modular** cu componente reutilizabile

## Tehnologii folosite

### Backend
- Laravel 10
- Laravel Sanctum (autentificare API)
- PHP 8.1+

### Frontend  
- React 18
- React Router DOM
- Framer Motion (animatii)
- Axios (HTTP client)
- Tailwind CSS

## Instalare si rulare

1. Cloneaza proiectul
2. `composer install`
3. `npm install`
4. Configureaza `.env` cu baza de date
5. `php artisan migrate`
6. `php artisan serve`
7. `npm run dev`

## Concluzie

Proiectul demonstreaza un sistem complet de administrare cu autentificare, management utilizatori si monitorizare activitate. Arhitectura separata backend-frontend il face scalabil si usor de extins cu functionalitati noi.
