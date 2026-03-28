# BookNova - MERN Stack Book Library system


## 📖 Project Overview
BookNova is a full-stack MERN application that provides a unified platform for managing and viewing a digital book collection. Designed with a focus on **responsive UI** and **user accessibility**, the platform allows every registered user to browse the library and access a management dashboard to perform full CRUD operations.

---

## Key Features
* **Unified Dashboard:** Every logged-in user can both view the library and manage records (Add, Edit, Delete).
* **Secure Authentication:** * User Login and Signup functionality.
    * Independent password visibility toggles (Eye Icons) for Password and Confirm Password fields to prevent accidental errors.
* **Responsive Admin Table:**
    * Custom-styled table with horizontal scrolling on mobile to prevent text collapse.
    * Centered Action buttons for professional alignment on desktop.
* **Mobile-First Navigation:** * Responsive sidebar with a dimming backdrop overlay for a polished mobile experience.
* **Dynamic Details View:** * Adaptive book information pages that adjust margins and image scaling for optimal viewing on 4K monitors down to mobile devices.

---

## Technologies Used
* **Frontend:** React.js, Tailwind CSS, React Icons, Axios.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB with Mongoose ODM.
* **Routing:** React Router DOM.

---

## Setup Instructions
* **Clone the Project**
git clone[https://github.com/keerthana-kk18/Booklibrary.git]

* **Backend Configuration**
  1.Navigate to the backend: cd backend
  2.Install dependencies: npm install
  3.Start the server: npm start
 
* **Frontend Configuration**
  1.Navigate to the frontend: cd Book
  2.Install dependencies: npm install
  3.Run the application: npm run dev

  ---

## Folder Structure
```text
BookNova/
├── backend/
│   ├── models/       # Mongoose Schemas (Book.js, User.js)
│   ├── routes/       # Express API endpoints for Auth and Books
│   └── server.js     # Entry point for the Node server
├── frontend/
│   ├── src/
│   │   ├── pages/    # All screens (Login, Signup, ManageBooks, ViewBooks, BookDetails)
│   │   ├── images/   # UI Assets (Backgrounds, Book Covers)
│   │   └── App.jsx   # Routing and Global Layout logic
│   ├── tailwind.config.js
│   └── main.jsx
└── README.md
```

---

## Live Demo
* **Frontend Application:** [https://booklibrary-dqdq.vercel.app/]
* **Backend API:** [https://booklibrary-biuu.onrender.com]
