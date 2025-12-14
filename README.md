🛒 DashStack – Products Dashboard

A modern and professional Admin Dashboard built with React + TypeScript, featuring full authentication, products management (CRUD), search, pagination, dark/light mode, and a reusable component-based architecture.

🚀 Features
🔐 Authentication

Login & Register with API integration

Backend-required device_id handling

Token-based authentication (stored in localStorage)

Secure logout with confirmation modal

📦 Products Management

Fetch products from API

Create new products

Edit existing products

Delete products with confirmation modal

Upload product images (multipart/form-data)

🔍 Search

Real-time product search

Search integrated with pagination

Automatically resets to page 1 when searching

📄 Pagination (Custom & Reusable)

Client-side pagination

Implemented using:

Custom Hook usePagination

Reusable Component Pagination

Dynamic page count based on filtered data

Active page highlighting

Fully integrated with search results

🌙 UI / UX

Dark / Light mode toggle

Loading spinners for pages & actions

Toast notifications for success & errors

Clean and responsive layout (Tailwind CSS)

🧩 Tech Stack

React

TypeScript

React Router DOM

Axios

Tailwind CSS

React Toastify

React Spinners

🗂️ Project Structure
src/
│
├── Components/
│   ├── Card.tsx
│   ├── Confirmation.tsx
│   ├── Pagination.tsx
│   ├── ProductForm.tsx
│
├── Pages/
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   ├── Dashboard/
│       ├── Products.tsx
│       ├── CreateProducts.tsx
│       ├── EditProducts.tsx
│
├── contexts/
│   ├── ThemeContext.tsx
│   ├── SearchContext.tsx
│
├── hooks/
│   └── usePagination.ts
│
├── interfaces/
│   └── productInterface.ts
│
└── main.tsx

🔁 Pagination Implementation
Custom Hook – usePagination

Handles:

Current page

Total pages

Paginated data slice

Fully reusable across the app

Pagination Component

Receives:

totalPages

currentPage

onPageChange

Highlights active page

Clean and accessible UI

🧠 Architecture Highlights

Reusable components & hooks

Separation of concerns (UI / logic)

Type-safe interfaces for all API data

Scalable and maintainable structure

Ready for backend pagination or future enhancements

🛠️ Setup & Run
npm install
npm run dev

✅ Future Improvements

Backend pagination

Role-based access control

Unit tests for hooks & components

Image optimization & lazy loading

👩‍💻 Author

Built with care and clean architecture as a learning & production-ready dashboard project.