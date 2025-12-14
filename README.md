# 🛒 DashStack – Products Dashboard

A modern and professional **Admin Dashboard** built with **React + TypeScript**, featuring authentication, full product management (CRUD), search, pagination, dark/light mode, and a reusable component-based architecture.

---

## 🚀 Features

### 🔐 Authentication
- Login & Register using REST API
- Backend-required `device_id` handling
- Token-based authentication stored in `localStorage`
- Secure logout with confirmation modal

---

### 📦 Products Management (CRUD)
- Fetch products from API
- Create new products
- Edit existing products
- Delete products with confirmation
- Upload product images using `multipart/form-data`

---

### 🔍 Search
- Real-time product search
- Integrated with pagination
- Automatically resets to page 1 when search input changes

---

### 📄 Pagination (Custom Implementation)
- Client-side pagination for products
- Implemented using:
  - Custom Hook: `usePagination`
  - Reusable Component: `Pagination`
- Dynamic total pages based on filtered results
- Active page highlighting
- Fully reusable and scalable

---

### 🌙 UI / UX
- Dark / Light mode toggle
- Loading indicators (spinners)
- Toast notifications for success & errors
- Responsive design with Tailwind CSS

---

## 🧩 Tech Stack

- React
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify
- React Spinners

---

## 🗂️ Project Structure

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


---

## 🔁 Pagination Details

### `usePagination` Hook
- Manages:
  - Current page
  - Total pages
  - Paginated data slice
- Accepts:
  - `data`
  - `itemsPerPage`
- Returns:
  - `currentData`
  - `currentPage`
  - `totalPages`
  - `setCurrentPage`

### `Pagination` Component
- Props:
  - `totalPages`
  - `currentPage`
  - `onPageChange`
- Highlights active page
- Fully reusable UI component

---

## 🧠 Architecture Highlights

- Clean separation of concerns
- Reusable components & hooks
- Strong TypeScript typing
- Scalable and maintainable structure
- Ready for future backend pagination

---

## 🛠️ Setup & Run

```bash
npm install
npm run dev

📌 Future Enhancements

- Server-side pagination

- Role-based authorization

- Unit testing

- Performance optimizations

👩‍💻 Author

This project was built as a professional, production-ready dashboard with clean architecture and reusable patterns.